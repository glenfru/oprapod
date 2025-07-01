/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  
  // Fix for undici module parse error - force transpilation of problematic packages
  transpilePackages: ['undici'],
  
  // Additional webpack configuration to handle modern syntax in node_modules
  webpack: (config, { isServer }) => {
    // Handle private class fields and other modern syntax
    config.module.rules.push({
      test: /\.m?js$/,
      include: /node_modules/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  },
};

module.exports = nextConfig;