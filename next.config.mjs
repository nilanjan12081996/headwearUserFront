import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // --- Redirect Logic Start ---
  async redirects() {
    return [
      {
        source: '/',                 // http://localhost:3001/
        destination: '/product-list',
        permanent: true,
      },
    ];
  },
  // --- Redirect Logic End ---

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      // arsalaanrasulshowmeropi
      {
        protocol: 'https',
        hostname: 'arsalaanrasulshowmeropi.bestworks.cloud',
        pathname: '/uploads/**',
      },

      // showmecustomheadwearapi (cloud)
      {
        protocol: 'https',
        hostname: 'showmecustomheadwearapi.bestworks.cloud',
        pathname: '/uploads/**',
      },

      // 🔥 showmecustomheadwearapi (clouduploads) – THIS FIXES YOUR ERROR
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
