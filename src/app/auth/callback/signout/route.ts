// app/auth/signout/route.ts
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Sign out from Supabase
    await supabase.auth.signOut()
    
    // Create response with redirect
    const response = NextResponse.redirect(new URL('/login', request.url))
    
    // Clear auth cookies by setting them to expire
    response.cookies.set('sb-access-token', '', { maxAge: 0 })
    response.cookies.set('sb-refresh-token', '', { maxAge: 0 })
    
    return response
  } catch {
    // Always redirect to login page on error, without logging sensitive details
    return NextResponse.redirect(new URL('/login', request.url))
  }
}