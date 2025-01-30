// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './index'

export const createClient = () => {
  const cookieStore = cookies()
  
  return createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        async get(name: string) {
          const cookie = cookieStore.get(name)
          return cookie?.value
        },
        set(name: string, value: string, options) {
          cookieStore.set(name, value, options)
        },
        remove(name: string, options) {
          cookieStore.delete(name, options)
        },
      },
    }
  )
}