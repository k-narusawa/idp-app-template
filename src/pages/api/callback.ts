import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next/types'
import { getSession } from '../../lib/session'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
  ) {
  const { code } = req.query
  const session = await getSession(req, res)

  try {
    const tokenResponse = await axios.post('http://localhost:3000/api/token', {
      code: code
    })
    
    console.log(tokenResponse.data.access_token)
    session.accessToken = tokenResponse.data.access_token
    await session.commit()
    console.log(session)

    res.redirect(`http://localhost:3000/info?access_token=${tokenResponse.data.access_token}`)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while trying to get the token' })
  }
}