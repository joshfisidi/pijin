// middleware.ts
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected routes require authentication
const protectedPaths = ['/dashboard', '/settings', '/profile', '/messages']
// Auth routes are only accessible when logged out
const authPaths = ['/login', '/auth']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the current path is protected or auth-related
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  const isAuthPath = authPaths.some(path => pathname.startsWith(path))

  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    // Redirect rules:
    // 1. If user is logged in and tries to access auth pages, redirect to dashboard
    if (session && isAuthPath) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // 2. If user is not logged in and tries to access protected pages, redirect to login
    if (!session && isProtectedPath) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // 3. If user is not logged in and accesses root, let the page component handle it
    if (!session && pathname === '/') {
      return NextResponse.next()
    }

    // Allow all other requests to proceed
    return NextResponse.next()
  } catch {
    // On error accessing protected routes, redirect to login
    if (isProtectedPath) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    // Match all routes except static files and api
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}