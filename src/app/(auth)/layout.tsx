// src/app/(auth)/layout.tsx
import { ThemeToggle } from "@/components/theme-toggle"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <main className="flex min-h-screen flex-col items-center justify-center px-4">
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
      </main>
    </div>
  );
}