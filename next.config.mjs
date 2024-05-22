/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  logging: {
    level: "verbose",
  },
  compiler: {
    removeConsole: false,
  },
  // solution for slack fs not found error
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
};

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error);
});

export default nextConfig;
