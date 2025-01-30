// src/app/(auth)/layout.tsx
import { ThemeToggle } from "@/components/theme-toggle"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="min-h-screen grid place-items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome to Pijin
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Connect and collaborate seamlessly
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}