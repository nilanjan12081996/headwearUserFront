import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // ← এটা add করো

  async redirects() {
    return [
      {
        source: '/',
        destination: '/product-list',
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arsalaanrasulshowmeropi.bestworks.cloud',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'showmecustomheadwearapi.bestworks.cloud',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'showmecustomheadwearapi.bestworks.clouduploads',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "adminapi.showmecustomapparel.com",
        pathname: "/**",
      },
    ],
  },
};

export default withFlowbiteReact(nextConfig);