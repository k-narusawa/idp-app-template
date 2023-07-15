import nextSession from "next-session";
import { GetServerSideProps } from "next"
import { useEffect } from "react";
import { useRouter } from 'next/router'

type Props = {
  accessToken: string
}
const getSession =  nextSession();

const CallbackPage = (props: Props) => {
  useEffect(() => {
    history.pushState({}, '', '/')
  }, [props.accessToken])

  return (
    <>
      <h1>Callback</h1>
    </>
  )
    
}

export const getServerSideProps: GetServerSideProps = async ({req, res, query}) => {
  const code = query.code
  const session = await getSession(req, res)

  if (!code) {
    return {
      props: {
        accessToken: undefined
      } 
    }
  } 
  console.log(session)

  const tokenResponse = await fetch('http://localhost:3000/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ code })
  })
  const jsonData = await tokenResponse.json()

  session.accessToken = jsonData.access_token
  session.commit()
  
  return {
    props: {
      accessToken: jsonData.access_token
    }
  }
}

export default CallbackPage