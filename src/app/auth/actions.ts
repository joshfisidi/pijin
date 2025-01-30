'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    const cookieStore = await cookies()
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          async get(name: string) {
            const cookie = await cookieStore.get(name)
            return cookie?.value
          },
          async set(name: string, value: string, options: any) {
            try {
              cookieStore.set(name, value, options)
            } catch {
              // Ignore cookie errors in middleware
            }
          },
          async remove(name: string, options: any) {
            try {
              cookieStore.delete(name, options)
            } catch {
              // Ignore cookie errors in middleware
            }
          },
        },
      }
    )

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      return { error: signInError.message }
    }

    // Verify the user is actually signed in
    const { data: { user }, error: getUserError } = await supabase.auth.getUser()
    
    if (getUserError || !user) {
      return { error: 'Authentication failed' }
    }

    redirect('/dashboard')
  } catch (error) {
    console.error('Sign in error:', error)
    return { error: 'An unexpected error occurred' }
  }
}

export async function signOut() {
  try {
    const cookieStore = await cookies()
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          async get(name: string) {
            const cookie = await cookieStore.get(name)
            return cookie?.value
          },
          async set(name: string, value: string, options: any) {
            try {
              cookieStore.set(name, value, options)
            } catch {
              // Ignore cookie errors in middleware
            }
          },
          async remove(name: string, options: any) {
            try {
              cookieStore.delete(name, options)
            } catch {
              // Ignore cookie errors in middleware
            }
          },
        },
      }
    )

    const { error } = await supabase.auth.signOut()

    if (error) {
      return { error: error.message }
    }

    redirect('/login')
  } catch (error) {
    console.error('Sign out error:', error)
    return { error: 'An unexpected error occurred' }
  }
}