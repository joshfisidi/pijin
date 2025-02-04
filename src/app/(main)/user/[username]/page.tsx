// src/app/(main)/user/[username]/page.tsx
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import UserProfileHeader from '@/components/user/UserProfileHeader';
import UserContent from '@/components/user/UserContent';

export const revalidate = 0; // Disable caching

async function getProfile(username: string) {
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !profile) {
    return null;
  }

  return profile;
}

interface PageProps {
  params: { username: string };
}

export default async function UserProfilePage({ params }: PageProps) {
  const { username } = params;
  const profile = await getProfile(username);

  if (!profile) {
    notFound();
  }

  return (
    <UserContent>
      <UserProfileHeader
        avatarUrl={profile.avatar_url}
        fullName={profile.full_name}
        username={profile.username}
      />
      <div className="max-w-2xl mx-auto mt-6">
        <h2 className="text-lg font-semibold mb-2">About</h2>
        <p className="text-muted-foreground">
          {profile.bio || "No bio available."}
        </p>
      </div>
    </UserContent>
  );
}
