import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const CallbackPage = () => {
  const router = useRouter()
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const code = router.query.code

    if (!code) return

    fetch('/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code })
    })
    setLoading(false);
      
  }, [router.query])

  if(loading){
    return (<div>Loading...</div>)
  } else {
    return (<div>Logged in!</div>)
  }
}

export default CallbackPage