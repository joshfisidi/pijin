// src/app/(main)/messages/page.tsx
import { Card } from "@/components/ui/card"

export default function MessagesPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      
      <Card className="p-4">
        <p>Messages content will go here...</p>
      </Card>
    </div>
  )
}