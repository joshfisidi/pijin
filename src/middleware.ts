// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function middleware(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get user without caching
    const { data: { user }, error } = await supabase.auth.getUser()

    // Handle auth routes
    if (!user && !request.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Create a response that includes the user's auth state
    const response = NextResponse.next()
    
    return response
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/messages/:path*',
    '/api/:path*',
    '/settings/:path*',
    '/profile/:path*',
  ]
}