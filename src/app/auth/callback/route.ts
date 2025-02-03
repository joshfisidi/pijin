// app/auth/callback/route.ts
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface RouteParams {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function GET(request: NextRequest, { searchParams }: RouteParams) {
  try {
    const code = searchParams['code'] as string
    const next = (searchParams['next'] as string) || '/dashboard'

    if (!code) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const supabase = await createClient()

    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      // If there's an error, redirect to login with error message
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('error', 'Authentication failed')
      return NextResponse.redirect(loginUrl)
    }

    // Successful auth - redirect to dashboard with 303 to ensure GET request
    const redirectUrl = new URL(next, request.url)
    const response = NextResponse.redirect(redirectUrl, {
      status: 303,
    })

    // Set cache headers to prevent caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    response.headers.set('Pragma', 'no-cache')

    return response
  } catch {
    // On any error, redirect to login
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('error', 'Something went wrong')
    return NextResponse.redirect(loginUrl)
  }
}