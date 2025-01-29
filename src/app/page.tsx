'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Lock, Smartphone, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const handleGoogleSignIn = () => {
    // Implement Google sign-in logic here
    console.log('Google sign-in clicked');
  };

  return (
    <div className="min-h-screen w-full flex relative bg-black overflow-hidden">
      {/* Background Features Animation */}
      <div className="absolute inset-0 opacity-5">
        <div className="animate-pulse absolute top-1/4 left-1/4">
          <MessageSquare className="h-32 w-32 text-green-500" />
        </div>
        <div className="animate-pulse absolute top-2/3 right-1/4">
          <Lock className="h-32 w-32 text-green-500" />
        </div>
        <div className="animate-pulse absolute bottom-1/4 left-1/2">
          <Smartphone className="h-32 w-32 text-green-500" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative w-full flex flex-col items-center justify-center p-4">
        {/* Logo and Brand */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative w-32 h-32">
              <Image
                src="/logo.png"
                alt="Pijin Logo"
                width={128}
                height={128}
                className="object-contain"
                priority
                unoptimized
              />
            </div>
          </div>
          <p className="text-zinc-400 mt-2 text-lg">Minimalist Messenger</p>
        </div>

        {/* Login Card */}
        <Card className="w-full max-w-md p-8 shadow-lg bg-zinc-900/90 border-zinc-800">
          {/* Google Sign In Button */}

          <div className="space-y-6">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                className="bg-zinc-900 border-zinc-700 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                className="bg-zinc-900 border-zinc-700 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
              Log in
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-400">
              Don't have an account?{' '}
              <Link href="/signup" className="text-green-500 hover:text-green-400 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </Card>

        {/* Feature Pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <div className="bg-zinc-900/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-zinc-300 flex items-center border border-zinc-800">
            <MessageSquare className="h-4 w-4 mr-2 text-green-500" />
            Real-time Chat
          </div>
          <div className="bg-zinc-900/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-zinc-300 flex items-center border border-zinc-800">
            <Lock className="h-4 w-4 mr-2 text-green-500" />
            End-to-End Encrypted
          </div>
          <div className="bg-zinc-900/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-zinc-300 flex items-center border border-zinc-800">
            <Smartphone className="h-4 w-4 mr-2 text-green-500" />
            Cross-platform
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-12 text-sm text-zinc-500 space-x-4">
          <Link href="/privacy-policy" className="hover:text-zinc-300">Privacy</Link>
          <Link href="/terms" className="hover:text-zinc-300">Terms</Link>
          <Link href="/contact" className="hover:text-zinc-300">Contact</Link>
        </div>
      </div>
    </div>
  );
}