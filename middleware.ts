// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const isAuthenticated = !!token
  const { pathname } = request.nextUrl
  
  // Protected routes - only these specific routes need protection
  if ((pathname.startsWith('/dashboard') || pathname.startsWith('/profile') || pathname.startsWith('/blog/create')) && !isAuthenticated) {
    const url = new URL('/login', request.url)
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }
  
  // Only redirect from auth routes if not coming from a redirect
  const authRoutes = ['/login', '/signup']
  if (authRoutes.includes(pathname) && isAuthenticated && !request.nextUrl.searchParams.has('redirect')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/login', '/signup', '/blog/create/:path*'],
}