import { getSession } from "next-auth/react"

const handler = async (req, res) => {
  const session = await getSession({ req });
  
  if (session) {
    res.send({ content: "WELCOM BROTHER" });
  } else {
    res.send({ content: "GET OUT OF HERE!" });
  }
}

export default handler;