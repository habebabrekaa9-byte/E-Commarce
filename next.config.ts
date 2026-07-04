import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://freshcart-route.vercel.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com/Route-Academy-products",
        pathname: "/**",
      },
    ],
  },
};


export default nextConfig;
