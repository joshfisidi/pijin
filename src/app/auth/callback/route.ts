// app/auth/callback/route.ts
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/dashboard'

  if (!code) {
    // Redirect to login if code is missing
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Auth error:', error)
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // After successful authentication, redirect to the next URL or dashboard
    return NextResponse.redirect(new URL(next, request.url), {
      // 303 See Other - use this to change the request method from POST to GET
      status: 303,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
      }
    })
  } catch (error) {
    console.error('Callback error:', error)
    // On any error, redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }
}