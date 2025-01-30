// app/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { MessageSquare, Lock, Smartphone } from 'lucide-react'
import GoogleSignIn from '@/components/auth/GoogleSignIn'

export default async function HomePage() {
  const supabase = await createClient()

  // Use getUser instead of getSession for better security
  const { data: { user }, error } = await supabase.auth.getUser()

  if (user && !error) {
    redirect('/dashboard')
  }

    return (
      <div className="min-h-screen w-full flex relative bg-black overflow-hidden">
        {/* Background Features Animation */}
        <div className="absolute inset-0 opacity-5">
          <div className="animate-pulse absolute top-1/4 left-1/4">
            <MessageSquare className="h-32 w-32 text-green-500" />
          </div>
          <div className="animate-pulse absolute top-2/3 right-1/4">
            <Lock className="h-32 w-32 text-green-500" />
          </div>
          <div className="animate-pulse absolute bottom-1/4 left-1/2">
            <Smartphone className="h-32 w-32 text-green-500" />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative w-full flex flex-col items-center justify-center p-4">
          {/* Logo and Brand */}
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-32">
                <Image
                  src="/logo.png"
                  alt="Pijin Logo"
                  width={128}
                  height={128}
                  className="object-contain"
                  priority
                  unoptimized
                />
              </div>
            </div>
            <p className="text-zinc-400 mt-2 text-lg">Minimalist Messenger</p>
          </div>

          {/* Call to Action Card */}
          <Card className="w-full max-w-md p-8 shadow-lg bg-zinc-900/90 border-zinc-800">
            <GoogleSignIn />
            
            <div className="mt-6 text-center">
              <p className="text-sm text-zinc-400">
                Need an account?{' '}
                <Link href="/signup" className="text-green-500 hover:text-green-400 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
    )
}