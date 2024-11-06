// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    avatar_url?: string;
    username?: string;
  }

  interface Session {
    user: {
      name?: string;
      email?: string;
      image?: string;
      username?: string;
      id: string;
      role?: string;
    };
  }

  interface JWT {
    id: string;

    role?: string;
    image?: string;

  }
}