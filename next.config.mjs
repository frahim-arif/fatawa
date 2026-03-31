// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:year/:month/:slug",
        destination: "/questions/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;