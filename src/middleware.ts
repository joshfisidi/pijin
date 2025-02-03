// middleware.ts
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected routes that require authentication
const protectedRoutes = ['/dashboard', '/settings', '/profile', '/messages']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only check auth for protected routes
  if (!protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/profile/:path*',
    '/messages/:path*',
  ],
}