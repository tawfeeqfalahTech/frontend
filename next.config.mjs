/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard/investor/projects",
        destination: "/explore",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
