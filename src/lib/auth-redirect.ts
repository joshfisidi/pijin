"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export function useAuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();

        // Public routes that don't require auth
        const publicRoutes = ['/', '/login', '/auth'];
        const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

        if (session) {
          // If authenticated and on a public route, redirect to dashboard
          if (isPublicRoute) {
            router.replace('/dashboard');
          }
        } else {
          // If not authenticated and not on a public route, redirect to login
          if (!isPublicRoute) {
            router.replace('/login');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.replace('/login');
      }
    };

    checkAuth();
  }, [pathname, router]);
} 