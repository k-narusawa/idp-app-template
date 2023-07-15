import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const handleLogin = () => {
    const AUTH_SERVER = process.env.NEXT_PUBLIC_KOTLIN_IDP_BASE_URL
    const CLIENT_ID = process.env.NEXT_PUBLIC_KOTLIN_IDP_CLIENT_ID
    const REDIRECT_URI = 'http://localhost:3000/api/callback'
  
    window.location.href = `${AUTH_SERVER}/oauth2/authorize?response_type=code&scope=openid&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>My App</title>
        <meta name="description" content="My App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to My App!
        </h1>

        <p className={styles.description}>
          This is a simple Next.js app.
        </p>

        <button onClick={handleLogin}>Login</button>
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default Home