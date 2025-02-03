import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <section className="w-full">
      <div className="mx-auto max-w-4xl">
        {children}
      </div>
    </section>
  )
}
