import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployments
  output: 'standalone',

  // Transpile workspace packages
  transpilePackages: ['@app/shared-types'],

  // Disable TypeScript type-checking and ESLint during production build on this VM to save critical resources
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
