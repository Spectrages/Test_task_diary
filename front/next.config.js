// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

module.exports = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://localhost:5000/:path*",
      },
    ];
  },
};
