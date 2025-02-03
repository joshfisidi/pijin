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

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true)
      try {
        const supabase = createClient()
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (session) {
          router.replace("/")
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to check session")
      } finally {
        setIsLoading(false)
      }
    }
    checkSession()
  }, [router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (signInError) throw signInError
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred during sign in")
    } finally {
      setIsLoading(false)
    }
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
        {/* Google sign-in with a modern slide-in accent */}
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
        <form onSubmit={handleSubmit} className="grid gap-4">
          {error && (
            <div className="text-sm text-red-500 text-center animate-fade-in">
              {error}
            </div>
          )}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
            className="transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-brand focus:ring-offset-2"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
            className="transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-brand focus:ring-offset-2"
          />
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
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="border-t border-gray-100 p-4">
        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-brand hover:underline transition-colors"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
