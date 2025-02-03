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
      // Use 303 to ensure the redirect is followed with a GET request
      status: 303
    })
  } catch {
    // On any error, redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }
}