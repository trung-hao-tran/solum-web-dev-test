import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: isGithubPages ? 'export' : 'standalone',
  basePath: isGithubPages ? '/solum-web-dev-test' : '',
  images: {
    unoptimized: isGithubPages,
  },
};

export default nextConfig;
