// "use server"
import NextAuth from "next-auth"
import type {NextAuthConfig} from "next-auth"
import GitHub from "next-auth/providers/github"
import type { Provider } from "next-auth/providers"
import { NextResponse } from "next/server"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import { prisma } from "@/lib/db";
import  bcrypt  from "bcryptjs";

async function get_user_by_usernameOrEmail(usernameOrEmail: string) {
  return await prisma.user.findFirst({
    where: {
      OR: [
        { username: usernameOrEmail },
        { email: usernameOrEmail },
      ],
    },
  });
}
async function get_user_by_name_or_email(username: string, email: string) {
  return await prisma.user.findFirst({
    where: {
      OR: [
        { username },
        { email },
      ],
    },
  });
}
async function create_user(data: { username: string; email: string; password: string; avatar_url?: string }) {
  console.log('create_user()')
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await prisma.user.create({
    data: {
      name: data.username,
      username: data.username,
      email: data.email,
      password: hashedPassword,
      avatar_url: data.avatar_url,
    },
  });
}
export async function signUp(data: { username: string; email: string; password: string; avatar_url?: string }) {
  console.log('signUp()')
  const registerSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    avatar_url: z.string().url().optional(),
  });

  const parsedRegister = registerSchema.safeParse(data)

  if (!parsedRegister.success) {
    console.log('parsedRegister.error')
    throw new Error("Invalid registration data");
  }
  console.log('parsedRegister.success')

  const existingUser = await get_user_by_name_or_email(data.username, data.email);

  if (existingUser) {
    console.log('existingUser')
    throw new Error("Username or email already exists");
  }
  console.log('no existingUser')
  const newUser = await create_user(data);
  console.log(`db newUser: ${newUser}`)
  return {
    id: newUser.id,
    name: newUser.name,
    image: newUser.avatar_url,
    username: newUser.username,
    email: newUser.email,
    avatar_url: newUser.avatar_url,
    role: newUser.role,
  };
}

const providers: Provider[] = [
  Credentials({
    name: "credentials",
    credentials: {
      usernameOrEmail: { label: "Username or Email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    // profile(profile) {
    //   return { role: profile.role ?? "user" }
    // },
    async authorize(credentials) {
      const loginSchema = z.object({
        usernameOrEmail: z.string(),
        password: z.string().min(6).max(100),
      });

      const parsedLogin = loginSchema.safeParse(credentials);

      if (parsedLogin.success) {
        const { usernameOrEmail, password } = parsedLogin.data;

        const user = await get_user_by_usernameOrEmail(usernameOrEmail);
        if (!user) return null
        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (passwordsMatch) {
          return { id: user.id, 
            name: user.name || user.username,
            username: user.username, 
            email: user.email, 
            image: user.avatar_url,
            avatar_url: user.avatar_url, role: user.role }
        }
      }

      return null;
    },
  }),
  GitHub({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET,
    // profile(profile) {
    //   return { role: profile?.role ?? "user" }
    // },
  }),
]
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  callbacks: {

    async jwt({ token, user }) {
      if(user) {
        token.role = user.role 
        token.name = user.name || user.username
        token.image = user.image || user.avatar_url
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = token.role as string
      return session;
    },
    // async jwt({ token, user, account, profile }) {
    //   if (user) {
    //     token.id = user.id;
    //     token.avatarUrl = user.avatarUrl;
    //   }

    //   if (account && profile) {
    //     const existingUser = await prisma.user.findFirst({
    //       where: {
    //         email: profile.email,
    //       },
    //     });

    //     if (!existingUser) {
    //       await create_user({
    //         username: profile.login || profile.name || profile.email.split('@')[0],
    //         email: profile.email,
    //         password: "", // You might want to handle this differently
    //         avatarUrl: profile.avatar_url,
    //       });
    //     }
    //   }

    //   return token;
    // },
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
  pages: {
    signIn: "/login",
  },
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