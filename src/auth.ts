import NextAuth from "next-auth"
import type {NextAuthConfig} from "next-auth"
import GitHub from "next-auth/providers/github"
import type { Provider } from "next-auth/providers"
import { NextResponse } from "next/server"
import Credentials from "next-auth/providers/credentials"

const providers: Provider[] = [
  Credentials({
    credentials: { password: { label: "Password", type: "password" } },
    authorize(c) {
      if (c.password !== "password") return null
      return {
        id: "test",
        name: "Test User",
        email: "test@example.com",
      }
    },
  }),
  GitHub({    
    
  }),
]
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // 授权
    // async authorized({ request, auth }) {
    //   const url = request.nextUrl
    
    //   if(request.method === "POST") {
    //     const { authToken } = (await request.json()) ?? {}
    //     // If the request has a valid auth token, it is authorized
    //     const valid = await validateAuthToken(authToken)
    //     if(valid) return true
    //     return NextResponse.json("Invalid auth token", { status: 401 })
    //   }
    
    //   // Logged in users are authenticated, otherwise redirect to login page
    //   return !!auth.user
    // }
  },
  
  providers,
  
})

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")