/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,

  async redirects() {
    return [
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:slug",
        destination: "/questions/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;