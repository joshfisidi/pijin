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
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('error', 'Authentication failed')
      return NextResponse.redirect(loginUrl)
    }

    // After successful authentication, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url), {
      // 303 See Other - use this to change the request method from POST to GET
      status: 303,
    })
  } catch {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('error', 'Something went wrong')
    return NextResponse.redirect(loginUrl)
  }
}