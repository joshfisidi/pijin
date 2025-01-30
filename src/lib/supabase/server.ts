// lib/supabase.ts
import { createServerClient } from '@supabase/ssr'
import type { CookieStore } from 'next/headers'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  domain: process.env.NODE_ENV === 'production' ? '.pijin.xyz' : undefined,
} as const

export function getSupabaseServer(cookieStore: CookieStore, response?: Response) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: Partial<typeof COOKIE_OPTIONS>) {
          if (response) {
            response.headers.append('Set-Cookie', `${name}=${value}`)
          }
        },
        remove(name: string, options: Partial<typeof COOKIE_OPTIONS>) {
          if (response) {
            response.headers.append('Set-Cookie', `${name}=; Max-Age=0`)
          }
        },
      },
    }
  )
}