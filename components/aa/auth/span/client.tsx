'use client'
import { useSession, signIn, signOut, SessionProvider } from 'next-auth/react'

import { Button } from '@/components/ui/button'

export function AuthSpan() {
  const { data: session } = useSession()
  // console.log('session', session)
  if (session) {
    return (
      <span >
        Sign out
      </span>
    )
  }
  // console.log('no session')
  return (
    <span>
      Sign in with GitHub
    </span>
  )
}
