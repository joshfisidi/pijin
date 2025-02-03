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

        // Immediate redirect from root page
        if (pathname === "/" || pathname === "") {
          if (session) {
            router.replace('/dashboard');
          } else {
            router.replace('/login');
          }
          return;
        }

        // Handle other routes
        if (session) {
          // Redirect from public routes if authenticated
          const publicRoutes = ['/login', '/auth'];
          const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
          if (isPublicRoute) {
            router.replace('/dashboard');
          }
        } else {
          // Redirect to login if trying to access protected routes
          const protectedRoutes = ['/dashboard', '/messages', '/profile', '/settings'];
          const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
          if (isProtectedRoute) {
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