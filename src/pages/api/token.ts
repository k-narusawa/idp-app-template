import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
  ) {
  const { code } = req.body

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_KOTLIN_IDP_BASE_URL}/oauth2/token`, {
      client_id: `${process.env.NEXT_PUBLIC_KOTLIN_IDP_CLIENT_ID}`,
      client_secret: `${process.env.NEXT_PUBLIC_KOTLIN_IDP_CLIENT_SECRET}`,
      redirect_uri: 'http://localhost:3000/callback',
      grant_type: 'authorization_code',
      code: code
    },
    {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }
    )

    res.status(200).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while trying to get the token' })
  }
}