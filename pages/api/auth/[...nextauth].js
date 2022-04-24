import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';

const prisma = new PrismaClient();

const handler = (req, res) => NextAuth(req, res, {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@website.com" },
        password: {  label: "Password", type: "password" }
      },
      async authorize({ email, password }, req) {
        // this is where we would actually look up a user in the db
        if (email === "grey@grey.com" && password === "password") {
          const user = {
            name: "grey",
            email
          }
          return user;
        } else {
          return null
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  jwt: {},
  pages: {},
  callbacks: {},
  events: {},
  theme: 'light',
  debug: process.env.NODE_ENV === "development"
});

export default handler;