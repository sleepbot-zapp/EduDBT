import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { env } from "@/helpers/env"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }