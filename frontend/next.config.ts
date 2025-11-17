import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    domains: [process.env.API_URL!],
  },
  trailingSlash: true,
  async rewrites() {
    const apiPath = process.env.API_URL || "http://localhost:8000";

    return [
      {
        source: "/api/:path",
        destination: `${apiPath}/:path`,
      },
    ];
  },
  sassOptions: {
    includePaths: [process.cwd()],
    additionalData: `
      @use "./src/app/styles/helpers/index.scss" as *;
      @use "./src/app/styles/base/variables.scss" as *;
    `,
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
