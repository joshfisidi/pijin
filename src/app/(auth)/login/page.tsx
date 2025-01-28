'use client'

import { useFormStatus } from 'react-dom'
import { signIn } from '@/app/auth/actions'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link' // Add this import

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button type="submit" disabled={pending} className="w-full">
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
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Welcome Back!</h2>
        <p className="mt-2 text-sm text-center text-gray-600">Please sign in to your account</p>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          {/* ... rest of your form fields ... */}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </Label>
            </div>
            <div className="text-sm">
              <Link href="/auth/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <SubmitButton />

          <div className="text-center text-sm">
            <span className="text-gray-500">Don&apos;t have an account?</span>{' '}
            <Link href="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}