import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next/types";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../lib/config";

export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { code } = req.query;
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

    req.session.token = {
      access_token: tokenResponse.data.access_token,
      id_token: tokenResponse.data.id_token,
    };
    await req.session.save();
    res.redirect(
      `http://localhost:3000/info?access_token=${tokenResponse.data.access_token}`
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong" });
  }
}
