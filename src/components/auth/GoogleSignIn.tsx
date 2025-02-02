// components/auth/GoogleSignIn.tsx
'use client'

import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function GoogleSignIn() {
  async function handleGoogleSignIn() {
    try {
      const response = await fetch("/auth/google/signin", {
        method: "POST",
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Error signing in with Google:", error)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleGoogleSignIn}
      className="w-full bg-white text-black hover:bg-gray-50"
    >
      <Image
        src="/google.svg"
        alt="Google Logo"
        width={20}
        height={20}
        className="mr-2"
      />
      Continue with Google
    </Button>
  )
}