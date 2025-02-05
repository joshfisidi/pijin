'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import GoogleSignIn from "@/components/auth/GoogleSignIn"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { createClient } from "@/utils/supabase/client"
import * as React from "react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"

interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm({ redirectTo = '/dashboard' }: LoginFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
    const checkSession = async () => {
      try {
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          router.replace("/")
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to check session")
      }
    }
    checkSession()
  }, [router])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        return
      }

      router.push(redirectTo)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  // Only render form content after initial mount
  if (!mounted) {
    return null
  }

  return (
    <Card className="w-full max-w-sm bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl animate-fade-in hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <CardHeader className="space-y-2 border-b border-gray-100 pb-4">
        <CardTitle className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center text-gray-500">
          Sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 p-6">
        <div className="animate-slide-in-from-left">
          <GoogleSignIn />
        </div>
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gradient-to-r from-brand to-purple-400" />
          <span className="mx-4 text-xs text-gray-400 uppercase">
            Or continue with
          </span>
          <div className="flex-grow border-t border-gradient-to-r from-brand to-purple-400" />
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <div className="text-sm text-destructive text-center">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              disabled={isLoading}
              className="transition-colors duration-200"
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium text-gray-700"
            >
              Remember me
            </label>
          </div>
          <Button
            type="submit"
            className="w-full transition-transform duration-200 ease-in-out hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : "Sign In"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="border-t border-gray-100 p-4">
        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-brand hover:underline transition-colors"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
