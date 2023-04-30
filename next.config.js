/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/Chat",
        permanent: true,
      },
      {
        source: "/Chat",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
