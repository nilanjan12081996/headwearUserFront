import withFlowbiteReact from "flowbite-react/plugin/nextjs";
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arsalaanrasulshowmeropi.bestworks.cloud',
        port: '',
        pathname: '/uploads/hats/**',
      },
 
      {
        protocol: 'https',
        hostname: 'arsalaanrasulshowmeropi.bestworks.cloud',
        port: '',
        pathname: '/uploads/variant/**',
      },
       {
        protocol: 'https',
        hostname: 'arsalaanrasulshowmeropi.bestworks.cloud',
        port: '',
        pathname: '/uploads/**',
      },
         {
        protocol: 'https',
        hostname: 'showmecustomheadwearapi.bestworks.cloud',
        port: '',
        pathname: '/uploads/brand/**',
      },
       {
        protocol: 'https',
        hostname: 'showmecustomheadwearapi.bestworks.cloud',
        port: '',
        pathname: '/uploads/hats/**',
      },
 
      {
        protocol: 'https',
        hostname: 'showmecustomheadwearapi.bestworks.cloud',
        port: '',
        pathname: '/uploads/variant/**',
      },
       {
        protocol: 'https',
        hostname: 'showmecustomheadwearapi.bestworks.cloud',
        port: '',
        pathname: '/uploads/**',
      },
     
    ],
  },
};
 
export default withFlowbiteReact(nextConfig);