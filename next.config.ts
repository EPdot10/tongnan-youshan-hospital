import type { NextConfig } from "next";

/** 静态导出：`next build` 生成纯 HTML/CSS/JS 到 out/，由 Cloudflare 直接托管，无服务器运行时。 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
