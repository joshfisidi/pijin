// app/auth/callback/route.ts
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // Create base response with proper headers
  const baseResponse = NextResponse.next()
  baseResponse.headers.set('Access-Control-Allow-Origin', '*')
  baseResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  baseResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (!code) {
    const redirectResponse = NextResponse.redirect(new URL('/login', request.url))
    // Copy headers to redirect response
    baseResponse.headers.forEach((value, key) => {
      redirectResponse.headers.set(key, value)
    })
    return redirectResponse
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('error', 'Authentication failed')
      const redirectResponse = NextResponse.redirect(loginUrl)
      // Copy headers to redirect response
      baseResponse.headers.forEach((value, key) => {
        redirectResponse.headers.set(key, value)
      })
      return redirectResponse
    }

    // After successful authentication, redirect to dashboard
    const response = NextResponse.redirect(new URL('/dashboard', request.url), {
      status: 303,
    })

    // Copy base headers
    baseResponse.headers.forEach((value, key) => {
      response.headers.set(key, value)
    })

    // Add additional cache control headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    response.headers.set('Surrogate-Control', 'no-store')
    response.headers.set('Vary', '*')

    return response
  } catch {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('error', 'Something went wrong')
    const redirectResponse = NextResponse.redirect(loginUrl)
    // Copy headers to redirect response
    baseResponse.headers.forEach((value, key) => {
      redirectResponse.headers.set(key, value)
    })
    return redirectResponse
  }
}