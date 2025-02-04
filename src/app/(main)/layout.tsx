// app/(main)/layout.tsx
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

async function getSession() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  
  // If user is not authenticated, redirect to login
  if (!session) {
    redirect('/login')
  }

  // Get sidebar state from cookie
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1">
          <div className="flex items-center border-b px-4 h-16">
            <SidebarTrigger />
          </div>
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}