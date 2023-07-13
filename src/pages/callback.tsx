import { GetServerSideProps } from "next"

type Props = {
  accessToken: string
}

const CallbackPage = (props: Props) => {
  return (
    <>
      <h1>Callback</h1>
      <p>{props.accessToken}</p>
    </>
  )
    
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const code = context.query.code

  if (!code) return { props: {} }

  const res = await fetch('http://localhost:3000/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ code })
  })
  const jsonData = await res.json()

  return {
    props: {
      accessToken: jsonData.access_token
    }
  }
}

export default CallbackPage