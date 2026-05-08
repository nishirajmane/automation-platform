import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployments
  output: 'standalone',

  // Transpile workspace packages
  transpilePackages: ['@app/shared-types'],
};

export default nextConfig;
