// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // Ignore build errors for eslint and typescript
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignore build errors for typescript
  typescript: {
    ignoreBuildErrors: true,
  },

  transpilePackages: ["@acme-corp/ui", "lucide-react"],
  experimental: {
    serverActions: {
      allowedOrigins: ["http://10.0.0.153:3000/", "pijin.xyz", "pijin.vercel.app"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    },
  ],
  // Handle domain access with minimal configuration
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

export default nextConfig;