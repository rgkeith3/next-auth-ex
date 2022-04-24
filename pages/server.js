import { getSession } from 'next-auth/react';
import React from 'react';

const Server = ({ session }) => {
  if (session) {
    return (
      <>
        <h1>This page was rendered on the server</h1>
        <p>The session was retrieved in getServerSideProps()</p>
        <p>See, I know who you are {session.user.email}</p>
      </>
    )
  } else {
    return (
      <>
        <h1>This page was rendered on the server</h1>
        <p>but the session couldn't be retrieved</p>
        <p>you are not logged in</p>
      </>
    )
  }
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context)
    }
  }
}

export default Server