// components/user/UserContent.tsx
export default function UserContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {children}
      </div>
    </div>
  );
}
  