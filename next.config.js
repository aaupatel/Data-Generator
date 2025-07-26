/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
module.exports = {
  productionBrowserSourceMaps: true,
  outputFileTracing: true,
};
