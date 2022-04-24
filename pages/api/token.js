import * as jwt from 'next-auth/jwt';

const handler = async (req, res) => {
  const token = await jwt.getToken({ req, secret: process.env.AUTH_SECRET });
  res.send(JSON.stringify(token, undefined, 2));
}

export default handler