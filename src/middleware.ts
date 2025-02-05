// middleware.ts
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected routes require authentication
const protectedRoutes = ['/dashboard', '/settings', '/profile', '/messages', '/user']
// Auth routes are only accessible when logged out
const authRoutes = ['/login', '/signup', '/auth']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // In development, bypass auth checks
  if (process.env.NODE_ENV === 'development') {
    // Only redirect root to dashboard
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    // Redirect rules:
    // 1. Root route handling (/)
    if (pathname === '/') {
      if (session) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // 2. If user is logged in and tries to access auth pages, redirect to dashboard
    if (session && authRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // 3. If user is not logged in and tries to access protected pages, redirect to login
    if (!session && protectedRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Allow all other requests to proceed
    return NextResponse.next()
  } catch {
    // On error accessing protected routes, redirect to login
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api).*)',
  ],
}