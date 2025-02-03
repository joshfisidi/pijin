'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export function useUserProfile() {
  const [username, setUsername] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        setIsLoading(true)
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          throw new Error('No session found')
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', session.user.id)
          .single()

        if (profileError) throw profileError
        
        setUsername(profile?.username || session.user.id)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch user profile'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  return { username, isLoading, error }
} 