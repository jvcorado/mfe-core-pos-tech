/** @type {import('next').NextConfig} */
const nextConfig = {

  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${process.env.NEXT_PUBLIC_MF_URL_LP || ''}/:path*`,
      },
      {
        source: '/login/:path*',
        destination: `${process.env.NEXT_PUBLIC_MF_URL_LOGIN || ''}/:path*`,
      },
      {
        source: '/register/:path*',
        destination: `${process.env.NEXT_PUBLIC_MF_URL_REGISTER || ''}/:path*`,
      },
      {
        source: '/dashboard/:path*',
        destination: `${process.env.NEXT_PUBLIC_MF_URL_DASHBOARD || ''}/:path*`,
      },
    ];
  },

};

export default nextConfig;