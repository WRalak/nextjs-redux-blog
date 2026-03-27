// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const isAuthenticated = !!token
  const { pathname } = request.nextUrl
  
  // Protected routes
  const protectedRoutes = ['/dashboard']
  
  if (protectedRoutes.includes(pathname) && !isAuthenticated) {
    const url = new URL('/login', request.url)
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }
  
  // Auth routes (if already authenticated, redirect to dashboard)
  const authRoutes = ['/login', '/signup']
  if (authRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
}