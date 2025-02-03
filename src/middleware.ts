// middleware.ts
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Skip auth check for auth-related routes
  if (request.nextUrl.pathname.startsWith('/auth/')) {
    return NextResponse.next()
  }

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user && !request.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  } catch {
    // Always redirect to login on error
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}