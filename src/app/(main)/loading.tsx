"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { Logo } from "@/components/Logo";

export default function Loading() {
  const [progress, setProgress] = React.useState(10);

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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 space-y-8">
      <Logo width={150} height={150} />
      <Progress value={progress} className="w-full max-w-md" />
    </div>
  );
} 