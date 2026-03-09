import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@prisma/client",
    "@prisma/adapter-better-sqlite3",
    "better-sqlite3",
    "ali-oss",
    "jsonwebtoken",
    "@alicloud/dysmsapi20170525",
    "@alicloud/openapi-client",
    "@alicloud/tea-util",
  ],
};

export default nextConfig;
