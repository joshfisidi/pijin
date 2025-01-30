// components/auth/GoogleSignIn.tsx
'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

export default function GoogleSignIn() {
  const handleGoogleSignIn = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      console.error('Error signing in with Google:', error.message)
    }
  }

  return (
    <Button
      onClick={handleGoogleSignIn}
      className="w-full bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-4 flex items-center justify-center space-x-2"
    >
      <Image
        src="/google.svg"
        alt="Google Logo"
        width={20}
        height={20}
        className="object-contain"
      />
      <span>Continue with Google</span>
    </Button>
  )
}