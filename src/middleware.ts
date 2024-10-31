// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// import { auth as middleware } from "@/auth"
import { auth } from "@/auth"


export default  auth(middleware)

// 定义需要登录的路由
const protectedRoutes = ['/logout', '/protected-page']
function middleware(
  req
) {
  const { pathname } = req.nextUrl
    // 检查是否是受保护的路由
  if (protectedRoutes.includes(pathname) && !req.auth) {
    return Response.redirect('/login')
  }
  // if (!req.auth && req.nextUrl.pathname !== "/login") {
  //   const newUrl = new URL("/login", req.nextUrl.origin)
  //   return Response.redirect(newUrl)
  // }

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
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
