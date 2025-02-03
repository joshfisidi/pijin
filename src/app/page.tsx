// app/page.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Welcome to Pijin</CardTitle>
          <CardDescription>
            Connect and collaborate seamlessly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" asChild>
            <Link href="/login">
              Get Started
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
