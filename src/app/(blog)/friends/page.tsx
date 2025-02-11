import { Suspense } from 'react'
import type { Friend } from '@/app/aa/blog/types/friends'
import FriendLinkTemplate from './_components/FriendLinkTemplate'
import FriendsList from './_components/FriendsList'
import { headers as nextHeaders } from "next/headers"

export const metadata = {title: 'Friends'}

async function getFriends(): Promise<Friend[]> {
  // const headers = new Headers(await nextHeaders())
  // console.log('process.env', process.env)
  const baseUrl = process.env.NODE_ENV === 'development' ? process.env.__NEXT_PRIVATE_ORIGIN : process.env.NEXT_PUBLIC_URL
  // console.log('process.env.__NEXT_PRIVATE_ORIGIN', process.env.__NEXT_PRIVATE_ORIGIN)
  const res = await fetch(`${baseUrl}/api/friends`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch friends')
  const data = await res.json()
  if (!Array.isArray(data)) {
    throw new Error('Expected an array of friends: ' + JSON.stringify(data))
  }
  return data
}

export default async function FriendLinks() {
  const friends = await getFriends()
  // console.log('friends', friends)

  return (
    <div className=" bg-gradient-to-br w-full">
      <div className="max-w-6xl mx-auto mb-8 w-full flex-grow-0">
        <FriendLinkTemplate />
        <Suspense fallback={<div>Loading...</div>}>
          <FriendsList initialFriends={friends} />
        </Suspense>
      </div>
    </div>
  )
}