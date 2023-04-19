/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://server:5000/:path*",
      },
    ];
  },
};
module.exports = nextConfig;
