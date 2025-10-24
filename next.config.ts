import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  basePath: '/bo',

  assetPrefix: '/bo',
  // Configuration des images
  images: {
    path: '/bo/_next/image',
    unoptimized: false,
  },


  async redirects() {
    return [
      {
        source: '/login',
        destination: '/bo/login',  // ← Avec basePath
        permanent: false,
      },
    ]
  },

};

export default nextConfig;
