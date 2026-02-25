import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  crossOrigin: 'anonymous',
  images: {
    remotePatterns: [new URL('https://example.com/image.jpg'), new URL('https://placehold.co/600x400/png')],
  },
};

export default nextConfig;



