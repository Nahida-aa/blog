// src/app/api/friends/route.ts
import { NextRequest,NextResponse } from 'next/server';
import { Friend } from '@/app/(blog)/md/blog/blog/types/friends'
import { fetch_friends } from './lib';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
let cachedFriends: Friend[] | null = null
let lastFetchTime: number | null = null

export async function GET(req: NextRequest) {
  const now = Date.now()
  const cacheExpiration = 5 * 60 * 1000 // 5 minutes in milliseconds

  if (cachedFriends && lastFetchTime && now - lastFetchTime < cacheExpiration) {
    return NextResponse.json(cachedFriends)
  }
  // /api/friends?stat=open
  // stat=open|closed|all
  const url = req.nextUrl
  const searchParams = Object.fromEntries(url.searchParams.entries());
  console.log('url,searchParams', JSON.stringify({ url, searchParams }, null, 2));
  const friends = await fetch_friends({ searchParams })
  // 从 ./_mock/index.json 中获取数据
  // await delay(1000*10)
  // const friends = require('./_mock/github.json')

  cachedFriends = friends
  lastFetchTime = now

  return NextResponse.json(friends)
}

export async function POST(req: Request) {
  // /api/friends
  // { "name": "
  const friend: Friend = await req.json();
  const newFriend = await fetch_friends({ method: 'POST', body: JSON.stringify(friend) });
  cachedFriends = null
  lastFetchTime = null
  return NextResponse.json(newFriend);
}