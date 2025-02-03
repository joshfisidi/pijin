// app/auth/callback/route.ts
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // After successful authentication, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url), {
      // 303 See Other - use this to change the request method from POST to GET
      status: 303,
      // Add cache control headers to prevent caching
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    })
  } catch {
    // On any error, redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }
}