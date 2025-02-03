// middleware.ts
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of public routes that don't require authentication
const publicRoutes = ['/login', '/auth/callback', '/auth/register', '/']

export async function middleware(request: NextRequest) {
  // Check if the path is in publicRoutes
  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    // If user is signed in and trying to access auth pages, redirect to dashboard
    if (session && request.nextUrl.pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Allow access to public routes regardless of auth status
    if (isPublicRoute) {
      return NextResponse.next()
    }

    // If user is not signed in and trying to access protected routes, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    // On error, only redirect to login if trying to access protected routes
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}