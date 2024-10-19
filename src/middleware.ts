// src/middleware.ts
import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
export default async function middleware(
  // req: NextRequest
) {
  // console.log('middleware:', req)
  // const { geo } = req
  // const userAgent = req.headers.get('user-agent')
  // const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown'
  // const language = req.headers.get('accept-language')
  // console.log('userAgent:', userAgent)
  // console.log('geo:', geo)
  // console.log('ip:', ip)
  // console.log('language:', language)
  // sec-ch-ua-mobile
  const response = NextResponse.next();
  response.headers.set('Accept-CH', 'Sec-CH-UA-Mobile');

  return response;
}
export const config = {
  matcher: '/:path*', // 适用于所有路径
};