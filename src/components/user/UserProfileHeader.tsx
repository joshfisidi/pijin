// components/user/UserProfileHeader.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfileHeaderProps {
  avatarUrl: string;
  fullName: string;
  username: string;
}

export default function UserProfileHeader({
  avatarUrl,
  fullName,
  username,
}: UserProfileHeaderProps) {
  return (
    <div className="flex items-center space-x-4 p-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src={avatarUrl} alt={fullName} />
        <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-2xl font-semibold">{fullName}</h2>
        <p className="text-muted-foreground">@{username}</p>
      </div>
    </div>
  );
}
