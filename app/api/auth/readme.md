## OAuth
```sh
pnpm add next-auth@beta
```
  
[](/src/app/auth.ts)
```ts
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
  ],
})
```
 
[](/src/app/api/auth/[...nextauth]/route.ts)
```ts
import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers
```

[](/src/app/demo/auth/page.tsx)
```tsx
'use client'
import { useSession, signIn, signOut, SessionProvider } from 'next-auth/react'
import { Button } from '@/components/ui/button'
export function AuthButton() {
  const { data: session } = useSession()
  console.log('session', session)
  if (session) {
    return (
      <Button onClick={() => signOut()}>
        Sign out
      </Button>
    )
  }
  console.log('no session')
  return (
    <Button onClick={() => signIn('github')}>
      Sign in with GitHub
    </Button>
  )
}
export default function AuthPage() {
  return (
    <SessionProvider >
      <AuthButton />
    </SessionProvider>
  )
}
```

https://github.com/settings/applications/2691314
```sh
Homepage URL = http://localhost:3000
Authorization callback URL = http://localhost:3000/api/auth/callback/github
```