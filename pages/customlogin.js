import { getProviders, useSession, signIn, signOut } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

const CustomLogin = () => {
  const [providers, setProviders] = useState();
  const { data: session, status } = useSession();

  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setProviders(setupProviders);
    }
    setTheProviders();
  }, []);

  if (status === "loading") {
    return <h1>LOADING...</h1>
  }
  if (session) {
    return (
      <>
        <h1>Signed in as {session.user.email} on the custom page</h1>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    )
  }

  const submitHandler = async ({ target: { email: { value: enteredEmail}, password: {value: enteredPassword}}}) => {
    const result = await signIn(providers.credentials.id, { redirect: false, email: enteredEmail, password: enteredPassword })
  }
  return (
    <>
      <h1>NOT SIGNED IN ON CUSTOM PAGE</h1>
      <button type="button" onClick={() => signIn()}>Go To SignIn</button>
      {providers.credentials && 
        <form onSubmit={submitHandler}>
          <input type="email" name="email" />
          <input type="password" name="password" />
          <button>Sign In with credentials</button>
        </form>
      }
      {providers.github &&
        <button type="button" onClick={() => signIn(providers.github.id)}>
          Github Login
        </button>
      }
    </>
  )
}

export default CustomLogin;