import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Create a Supabase client configured to use cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )
  
  // Refresh session if expired
  await supabase.auth.getSession()
  
  // Optional: Check if user is authenticated for protected routes
  const { pathname } = request.nextUrl
  const isAuthRoute = pathname.startsWith('/auth')
  const isApiRoute = pathname.startsWith('/api')
  const isPublicRoute = pathname === '/'
  
  if (!isAuthRoute && !isApiRoute && !isPublicRoute) {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      // Create a new URL object using the request's origin
      const redirectUrl = new URL('/auth/login', request.nextUrl.origin)
      // Ensure we're using the same protocol (http/https) as the request
      redirectUrl.protocol = request.nextUrl.protocol
      return NextResponse.redirect(redirectUrl)
    }
  }
  
  // If user is signed in and trying to access auth routes, redirect to home
  if (isAuthRoute) {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      const redirectUrl = new URL('/', request.nextUrl.origin)
      redirectUrl.protocol = request.nextUrl.protocol
      return NextResponse.redirect(redirectUrl)
    }
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}