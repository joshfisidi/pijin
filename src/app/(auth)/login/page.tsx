import { LoginForm } from '@/components/auth/LoginForm'
import { Logo } from '@/components/Logo'

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-sm mx-auto flex flex-col items-center space-y-8">
        <Logo width={150} height={150} />
        <LoginForm />
      </div>
    </div>
  )
}