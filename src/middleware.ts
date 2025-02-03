// middleware.ts
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of public routes that don't require authentication
const publicRoutes = ['/login', '/auth/callback', '/auth/register', '/']

export async function middleware(request: NextRequest) {
  // Create base response to ensure headers are set correctly
  const response = NextResponse.next()

  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return response
  }

  // Check if the path is in publicRoutes
  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    // If user is signed in and trying to access auth pages, redirect to dashboard
    if (session && request.nextUrl.pathname.startsWith('/auth')) {
      const redirectResponse = NextResponse.redirect(new URL('/dashboard', request.url))
      // Copy headers to redirect response
      response.headers.forEach((value, key) => {
        redirectResponse.headers.set(key, value)
      })
      return redirectResponse
    }

    // Allow access to public routes regardless of auth status
    if (isPublicRoute) {
      return response
    }

    // If user is not signed in and trying to access protected routes, redirect to login
    if (!session) {
      const redirectResponse = NextResponse.redirect(new URL('/login', request.url))
      // Copy headers to redirect response
      response.headers.forEach((value, key) => {
        redirectResponse.headers.set(key, value)
      })
      return redirectResponse
    }

    return response
  } catch {
    // On error, only redirect to login if trying to access protected routes
    if (!isPublicRoute) {
      const redirectResponse = NextResponse.redirect(new URL('/login', request.url))
      // Copy headers to redirect response
      response.headers.forEach((value, key) => {
        redirectResponse.headers.set(key, value)
      })
      return redirectResponse
    }
    return response
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