import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  crossOrigin: 'anonymous',
  images: {
    remotePatterns: [new URL('https://example.com/image.jpg')],
  },
};

export default nextConfig;



