import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { MessageSquare, Lock, Smartphone } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="text-sm font-medium text-gray-600 mb-4">Coming Soon</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          The Next Generation of Communication
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Join thousands waiting to experience a new way to connect, share, and collaborate.
        </p>
      </div>

      {/* Waitlist Card */}
      <Card className="w-full max-w-md p-6 mb-16">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold mb-2">Join the Waitlist</h2>
          <p className="text-gray-600">Be among the first to experience Pijin</p>
        </div>
        <form className="flex gap-2">
          <Input 
            type="email" 
            placeholder="Enter your email"
            className="flex-1"
          />
          <Button type="submit">
            Join <span className="ml-2">→</span>
          </Button>
        </form>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-16">
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <MessageSquare className="mx-auto mb-4 h-8 w-8" />
          <h3 className="font-semibold mb-2">Real-time Chat</h3>
          <p className="text-gray-600">Instant messaging with seamless synchronization</p>
        </div>

        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <Lock className="mx-auto mb-4 h-8 w-8" />
          <h3 className="font-semibold mb-2">End-to-End Encrypted</h3>
          <p className="text-gray-600">Your privacy is our top priority</p>
        </div>

        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <Smartphone className="mx-auto mb-4 h-8 w-8" />
          <h3 className="font-semibold mb-2">Cross-platform</h3>
          <p className="text-gray-600">Available everywhere you are</p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mb-8">
        <p className="text-gray-600 mb-4">Backed by world-class investors</p>
        <div className="flex gap-4 justify-center">
          <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-gray-600 hover:text-gray-900">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">
            Contact
          </Link>
        </div>
      </div>
    </div>
  )
}