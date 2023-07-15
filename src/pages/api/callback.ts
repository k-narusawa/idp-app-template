import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next/types";
import { getSession } from "../../lib/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { code } = req.query;
  const session = await getSession(req, res);

  try {
    const tokenResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_KOTLIN_IDP_BASE_URL}/oauth2/token`,
      {
        client_id: `${process.env.NEXT_PUBLIC_KOTLIN_IDP_CLIENT_ID}`,
        client_secret: `${process.env.NEXT_PUBLIC_KOTLIN_IDP_CLIENT_SECRET}`,
        redirect_uri: "http://localhost:3000/api/callback",
        grant_type: "authorization_code",
        code: code,
      },
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }
    );

    console.log(tokenResponse.data.access_token);
    session.accessToken = tokenResponse.data.access_token;
    await session.commit();
    console.log(session);

    res.redirect(
      `http://localhost:3000/info?access_token=${tokenResponse.data.access_token}`
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while trying to get the token" });
  }
}
