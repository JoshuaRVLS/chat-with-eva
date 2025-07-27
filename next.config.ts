import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't include canvas polyfill on client side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        "@napi-rs/canvas": false,
      };
    }

    // Exclude binary files from processing
    config.module.rules.push({
      test: /\.node$/,
      loader: "node-loader",
    });

    return config;
  },
};

export default nextConfig;
