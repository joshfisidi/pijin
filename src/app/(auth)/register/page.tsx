"use client"

import { useSearchParams } from 'next/navigation'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import GoogleSignIn from "@/components/auth/GoogleSignIn"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { createClient } from "@/utils/supabase/client"
import * as React from "react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    username: "",
  })
  const [formError, setFormError] = useState<string | null>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setFormError(null)

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            username: formData.username,
          },
        },
      })

      if (signUpError) {
        setFormError(signUpError.message)
        return
      }

      router.push('/auth/verify-email')
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Card className="w-full max-w-sm bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl animate-fade-in hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <CardHeader className="space-y-2 border-b border-gray-100 pb-4">
        <CardTitle className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </CardTitle>
        <CardDescription className="text-center text-gray-500">
          Join our community today
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 p-6">
        <div className="animate-slide-in-from-left">
          <GoogleSignIn />
        </div>
     
        <form onSubmit={onSubmit} className="space-y-4">
          {(error || formError) && (
            <Alert variant="destructive">
              <AlertDescription>
                {error || formError}
              </AlertDescription>
            </Alert>
          )}
 
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              required
              disabled={isLoading}
              className="transition-colors duration-200"
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium text-gray-700"
            >
              I agree to the{" "}
              <Link href="/terms" className="text-brand hover:underline">
                Terms of Service
              </Link>
            </label>
          </div>
          <Button
            type="submit"
            className="w-full transition-transform duration-200 ease-in-out hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : "Sign Up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="border-t border-gray-100 p-4">
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-brand hover:underline transition-colors"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}