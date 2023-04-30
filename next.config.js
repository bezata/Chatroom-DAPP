/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/Chat",
        permanent: false,
      },
      {
        source: "/Chat",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
