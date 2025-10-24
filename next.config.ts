import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  basePath: '/bo',

  images: {
    path: '/bo/_next/image',
  },
};

export default nextConfig;
