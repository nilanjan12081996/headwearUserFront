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
        hostname: 'showmecustomheadwearuserapi.bestworks.cloud',
        port: '',
        pathname: '/uploads/hats/**',
      },
 
      {
        protocol: 'https',
        hostname: 'showmecustomheadwearuserapi.bestworks.cloud',
        port: '',
        pathname: '/uploads/variant/**',
      },
       {
        protocol: 'https',
        hostname: 'showmecustomheadwearuserapi.bestworks.cloud',
        port: '',
        pathname: '/uploads/hatColors/**',
      },
         {
        protocol: 'https',
        hostname: 'showmecustomheadwearuserapi.bestworks.cloud',
        port: '',
        pathname: '/uploads/brand/**',
      },
     
    ],
  },
};
 
export default withFlowbiteReact(nextConfig);