import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

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

  await supabase.auth.getSession()

  const { pathname } = request.nextUrl
  
  // Define protected routes (those under (main) group)
  const isMainRoute = pathname.startsWith('/dashboard') || 
                     pathname.startsWith('/messages')
  
  // Define auth routes (those under (auth) group)
  const isAuthRoute = pathname.startsWith('/login') || 
                     pathname.startsWith('/register') ||
                     pathname.startsWith('/forgot-password')
  
  const isApiRoute = pathname.startsWith('/api')
  const isPublicRoute = pathname === '/'

  // Handle protected routes
  if (isMainRoute) {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      const redirectUrl = new URL('/login', request.nextUrl.origin)
      redirectUrl.protocol = request.nextUrl.protocol
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Handle auth routes when user is already authenticated
  if (isAuthRoute) {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      const redirectUrl = new URL('/dashboard', request.nextUrl.origin)
      redirectUrl.protocol = request.nextUrl.protocol
      return NextResponse.redirect(redirectUrl)
    }
  }

  return response
}

export const config = {
  matcher: [
    // Match dashboard and messages routes
    '/dashboard/:path*',
    '/messages/:path*',
    // Match auth routes
    '/login',
    '/register',
    '/forgot-password',
    '/auth/callback',
    // Match API routes
    '/api/:path*',
  ],
}