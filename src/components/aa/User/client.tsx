"use client"

import React, { Suspense } from 'react'
import { useSession, SessionProvider } from 'next-auth/react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { User2 } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"

interface AvatarAndNameProps {
  className?: string
}

function AvatarAndName({ className }: AvatarAndNameProps) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <Skeleton className={`${className} rounded-full`} />
  }

  if (session) {
    return (
      <>
        <Avatar className={className}>
          <AvatarImage src={session.user?.image ?? undefined} alt={session.user?.name ?? "User avatar"} />
          <AvatarFallback>{session.user?.name?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
        </Avatar>
        <span className="truncate max-w-[100px]">{session.user?.name}</span>
      </>
    )
  }

  return (
    <>
      <Avatar className={className}>
        <AvatarFallback><User2 className="h-4 w-4" /></AvatarFallback>
      </Avatar>
      <span className="truncate max-w-[100px]">Guest</span>
    </>
  )
}

export default function ClientUser({ className }: AvatarAndNameProps) {
  return (
      <Suspense fallback={<Skeleton className={`${className} rounded-full`} />}>
        <AvatarAndName className={className} />
      </Suspense>
  )
}