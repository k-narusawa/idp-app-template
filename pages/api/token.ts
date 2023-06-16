import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
  ) {
  const { code } = req.body

  try {
    const response = await axios.post(`${process.env.AUTH0_BASE_URL}/oauth/token`, {
      client_id: `${process.env.AUTH0_CLIENT_ID}`,
      client_secret: `${process.env.AUTH0_CLIENT_SECRET}`,
      redirect_uri: 'http://localhost:3000',
      grant_type: 'authorization_code',
      code
    })

    const tokens = response.data
    console.log(tokens)
    res.status(200).json({ message: 'Token received' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while trying to get the token' })
  }
}