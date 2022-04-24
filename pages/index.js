import { signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <h1>LOADING...</h1>
  }

  if (session) {
    return (
      <>
        <h1>Signed in as {session.user.email}</h1>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    )
  }

  return (
    <>
      <h1>You Are Not Signed In</h1>
      <button onClick={() => signIn()}>Sign In</button>
    </>
  )
}
