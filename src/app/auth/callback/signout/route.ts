// app/auth/signout/route.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  domain: process.env.NODE_ENV === 'production' ? '.pijin.xyz' : undefined,
} as const

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const response = NextResponse.redirect(new URL('/login', request.url))

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: Partial<typeof COOKIE_OPTIONS>) {
            response.cookies.set(name, value, { ...COOKIE_OPTIONS, ...options })
          },
          remove(name: string, options: Partial<typeof COOKIE_OPTIONS>) {
            response.cookies.delete({ name, ...options })
          },
        },
      }
    )

    await supabase.auth.signOut()

    return response
  } catch (error) {
    console.error('Sign out error:', error)
    return NextResponse.redirect(new URL('/auth/error', request.url))
  }
}