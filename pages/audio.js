import { getSession } from "next-auth/react";

const Audio = ({ audio: { src, type }, session }) => {
  return (
    <>
      <audio controls>
        <source src={src} type={type} />
      </audio>
      <button>
        {session ? <a href="/api/auth/signout">Sign Out</a> : <a href="/api/auth/signin">Sign In</a>}
      </button>
    </>
  )
}

export default Audio;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const audio = {};

  // based on session we can determine which content a users sees based on their security profile
  if (session) {
    audio.src = "A.mp3"
    audio.type = "audio/mpeg"
  } else {
    audio.src = "B.mp3"
    audio.type = "audio/mpeg"
  }

  return {
    props: {
      session,
      audio
    }
  }
}