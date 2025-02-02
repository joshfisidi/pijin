// app/page.tsx
import * as React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import GoogleSignIn from "@/components/auth/GoogleSignIn"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/server"

export default async function Home() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Welcome</CardTitle>
          <CardDescription>
            Get started by signing in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <GoogleSignIn />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/auth/login">
              Email and Password
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
