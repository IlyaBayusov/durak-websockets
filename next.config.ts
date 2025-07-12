import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // временно
  },
  typescript: {
    ignoreBuildErrors: true, // временно
  },
};

export default nextConfig;
