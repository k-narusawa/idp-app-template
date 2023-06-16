import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const AUTH_SERVER = 'https://dev-dlv7dvq105lm8tbo.us.auth0.com'
const CLIENT_ID = 'ZaeD96PA4RLIXH2jsbAwf3uejCxaT6o6'
const REDIRECT_URI = 'http://localhost:3000/callback'

const handleLogin = () => {
  window.location.href = `${AUTH_SERVER}/authorize?response_type=code&scope=openid&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
}

const Home: NextPage = () => {
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