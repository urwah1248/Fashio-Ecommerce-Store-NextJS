import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const {email, password} = credentials;

        if(email!==process.env.NEXT_PUBLIC_ADMIN_EMAIL || password!==process.env.NEXT_PUBLIC_ADMIN_PASSWORD){
          throw new Error("Invalid Credentials");
        }

        return {
          image: '/logo.png',
          name: "Admin",
          email: "admin@gmail.com"
        }
      }
    })
  ],
  pages: {
    signIn: '/admin/dashboard',
    error: '/404',
    signOut: '/admin/login'
  }
}
export default NextAuth(authOptions)
