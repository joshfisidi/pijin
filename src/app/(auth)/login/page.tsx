'use client'

import { useFormStatus } from 'react-dom'
import { signIn } from '@/app/auth/actions'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Checkbox } from "@/components/ui/checkbox"
import Link from 'next/link'

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
    >
      {pending ? 'Signing in...' : 'Sign in'}
    </Button>
  )
}

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setError(null)
    const result = await signIn(formData)
    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="space-y-1">
          <h2 className="text-2xl font-bold text-center text-white">GET REKT</h2>
          <p className="text-sm text-center text-gray-400">
            Please sign in to your account
          </p>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                placeholder="name@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {error && (
              <div className="text-sm text-red-500">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" name="remember-me" />
                <Label 
                  htmlFor="remember-me" 
                  className="text-sm text-gray-300"
                >
                  Remember me
                </Label>
              </div>
              <Link 
                href="/auth/forgot-password" 
                className="text-sm font-medium text-emerald-500 hover:text-emerald-400"
              >
                Forgot your password?
              </Link>
            </div>

            <SubmitButton />

            <div className="text-center text-sm">
              <span className="text-gray-400">Don&apos;t have an account?</span>{' '}
              <Link 
                href="/auth/register" 
                className="font-medium text-emerald-500 hover:text-emerald-400"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}