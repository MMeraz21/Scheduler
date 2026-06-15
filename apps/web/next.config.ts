import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@scheduler/shared"],
  turbopack: {
    root: "../..",
  },
};

export default nextConfig;
