// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@acme-corp/ui", "lucide-react"],
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "10.0.0.153:3000"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        // Updated Permissions-Policy for mobile features
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), accelerometer=(), gyroscope=()' },
        // Cross-browser compatible CSP
        {
          key: 'Content-Security-Policy',
          value: `
            default-src 'self';
            script-src 'self' 'unsafe-eval' 'unsafe-inline' blob:;
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.gstatic.com;
            img-src 'self' blob: data: https: http: *.googleapis.com *.gstatic.com;
            font-src 'self' data: https://fonts.gstatic.com https://*.gstatic.com;
            connect-src 'self' 
              https://fonts.googleapis.com 
              https://fonts.gstatic.com 
              http://10.0.0.153:* 
              https://10.0.0.153:*
              ws://10.0.0.153:* 
              wss://10.0.0.153:*
              http://localhost:* 
              https://localhost:*
              ws://localhost:* 
              wss://localhost:*;
            object-src 'none';
            base-uri 'self';
            form-action 'self';
            frame-ancestors 'none';
            media-src 'self' blob: data: https: http:;
            worker-src 'self' blob:;
            manifest-src 'self';
          `.replace(/\s{2,}/g, ' ').trim()
        },
        // Cross-browser compatibility headers
        { key: 'X-Compatible', value: 'IE=edge,chrome=1' },
        { key: 'Cache-Control', value: 'public, max-age=3600' },
        // Mobile-specific headers
        { key: 'viewport-fit', value: 'cover' },
      ],
    },
  ],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

export default nextConfig;