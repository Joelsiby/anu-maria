import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'valentingassend.com',
      },
    ],
  },
};

export default nextConfig;
