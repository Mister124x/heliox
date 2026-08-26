/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.helioviewer.org' },
      { protocol: 'https', hostname: 'sdo.gsfc.nasa.gov' },
      { protocol: 'https', hostname: '*.nasa.gov' },
      { protocol: 'https', hostname: 'soho.nascom.nasa.gov' },
      { protocol: 'https', hostname: 'services.swpc.noaa.gov' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Solo reescribir hacia backend externo si NEXT_PUBLIC_API_URL está explícitamente configurada
  async rewrites() {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      return []
    }
    return [
      {
        source: '/api/backend/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
