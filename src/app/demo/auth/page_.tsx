// 'use client'
// import { useSession, signIn, signOut, SessionProvider } from 'next-auth/react'

// import { Button } from '@/components/ui/button'

// export function AuthButton() {
//   const { data: session } = useSession()
//   console.log('session', session)
//   if (session) {
//     return (
//       <Button onClick={() => signOut()}>
//         Sign out
//       </Button>
//     )
//   }
//   console.log('no session')
//   return (
//     <Button onClick={() => signIn('github')}>
//       Sign in with GitHub
//     </Button>
//   )
// }
// export default function AuthPage() {
//   return (
//     <SessionProvider >
//       <AuthButton />
//     </SessionProvider>
//   )
// }