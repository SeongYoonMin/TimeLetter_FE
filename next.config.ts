import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  assetPrefix: process.env.NODE_ENV === "production" ? "/TimeLetter_FE/" : "",
};

export default nextConfig;
