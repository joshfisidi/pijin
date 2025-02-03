import Image from "next/image"

interface LogoProps {
  width?: number
  height?: number
  className?: string
}

export function Logo({ width = 120, height = 120, className }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Pijin Logo"
      width={width}
      height={height}
      className={`animate-fade-in ${className || ''}`}
      priority
    />
  )
} 