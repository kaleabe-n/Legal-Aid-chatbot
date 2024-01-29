/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.pravatar.cc"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
