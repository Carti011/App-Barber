import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
