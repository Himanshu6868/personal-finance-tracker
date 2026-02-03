import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: false,
   images: {
    remotePatterns: [new URL('https://lh3.googleusercontent.com/**')],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "*.app.github.dev",
      ],
    },
  },
};

export default nextConfig;
