"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { Logo } from "@/components/Logo";
import { useAuthRedirect } from "@/lib/auth-redirect";

export default function Loading() {
  const [progress, setProgress] = React.useState(10);
  
  // Use the auth redirect hook
  useAuthRedirect();

  React.useEffect(() => {
    const timer1 = setTimeout(() => setProgress(45), 100);
    const timer2 = setTimeout(() => setProgress(85), 500);
    const timer3 = setTimeout(() => setProgress(98), 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-12 -mt-16">
        <div className="p-8 rounded-full bg-background/50 backdrop-blur-sm">
          <Logo width={150} height={150} />
        </div>
        <Progress value={progress} className="w-80" />
      </div>
    </div>
  );
} 