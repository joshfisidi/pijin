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
      className="w-full"
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
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">The Minimalist Messenger</h2>
        <p className="text-sm text-center text-muted-foreground">
          Please sign in to your account
        </p>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="name@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
            />
          </div>

          {error && (
            <div className="text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember-me" name="remember-me" />
              <Label 
                htmlFor="remember-me" 
                className="text-sm"
              >
                Remember me
              </Label>
            </div>
            <Link 
              href="/auth/forgot-password" 
              className="text-sm font-medium text-primary hover:text-primary/90"
            >
              Forgot your password?
            </Link>
          </div>

          <SubmitButton />

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don&apos;t have an account?</span>{' '}
            <Link 
              href="/auth/register" 
              className="font-medium text-primary hover:text-primary/90"
            >
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}