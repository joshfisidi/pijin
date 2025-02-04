// src/app/(main)/user/layout.tsx
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import UserSidebar from '@/components/user/UserSidebar';

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-background">
      <UserSidebar />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
