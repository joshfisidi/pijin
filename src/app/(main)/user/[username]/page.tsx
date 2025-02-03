// src/app/user/[username]/page.tsx
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const revalidate = 0 // Disable cache for this page

async function getProfile(username: string) {
  const supabase = await createClient()
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()
    
  if (error || !profile) {
    return null
  }
  
  return profile
}

type Props = {
  params: { username: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function UserProfilePage({ params }: Props) {
  const profile = await getProfile(params.username)
  
  if (!profile) {
    notFound()
  }

  return (
    <Card>
      <CardHeader className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
            <AvatarFallback>{profile.full_name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{profile.full_name}</CardTitle>
            <p className="text-sm text-muted-foreground">@{profile.username}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Add more profile sections here as needed */}
      </CardContent>
    </Card>
  )
}
