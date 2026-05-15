import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // logging: { fetches: { fullUrl: true } },
  allowedDevOrigins: ["192.168.1.*", "localhost", "127.0.0.1"],
};

export default nextConfig;
