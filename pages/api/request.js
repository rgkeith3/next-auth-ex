import { getSession  } from "next-auth/react";

const handler = async (req, res) => {
  console.log(req);
  res.send({ content: "sup"});
}

export default handler