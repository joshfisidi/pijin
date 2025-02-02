// utils/supabase/server.ts
import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle the error case when running in a read-only context
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle the error case when running in a read-only context
          }
        },
      },
    }
  )
}

export async function middleware(request: NextRequest) {
  try {
    const supabase = createClient()

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