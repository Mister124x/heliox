/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.helioviewer.org' },
      { protocol: 'https', hostname: 'sdo.gsfc.nasa.gov' },
      { protocol: 'https', hostname: '*.nasa.gov' },
      { protocol: 'https', hostname: 'soho.nascom.nasa.gov' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
