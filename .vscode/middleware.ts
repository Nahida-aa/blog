// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { Redis } from '@upstash/redis'

// Initialize Redis
// const redis = Redis.fromEnv();


// 定义需要登录的路由
export default async function middleware(
  req
) {
  const timestamp = Date.now()
  // console.log('middleware:', req)
  const { geo } = req
  const userAgent = req.headers.get('user-agent')
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
  const path = req.nextUrl.pathname;
  const language = req.headers.get('accept-language')
  console.log('userAgent:', userAgent)
  console.log('geo:', geo)
  console.log('ip:', ip)
  console.log('path:', path)
  console.log('language:', language)
  // sec-ch-ua-mobile
  const visitData = {
    ip,
    userAgent,
    path,
    timestamp,
  }
  // 仅在生产环境中 存储访问记录
  // if (process.env.NODE_ENV === 'production') {
  //   // Store the visit data in Redis
  //   await redis.lpush('visits', JSON.stringify(visitData))
  //   // Trim the list to keep only the last 1000 visits
  //   await redis.ltrim('visits', 0, 999)
  // }
  // await redis.lpush('visits', JSON.stringify(visitData))
  // await redis.ltrim('visits', 0, 999)

  // const { pathname } = req.nextUrl
  // 检查是否是受保护的路由
  // if (protectedRoutes.includes(pathname) && !req.auth) {
  //   return Response.redirect('/login')
  // }

  const response = NextResponse.next();
  response.headers.set('Accept-CH', 'Sec-CH-UA-Mobile');

  return response;
}
export const config = {
  // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  // matcher: 
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
