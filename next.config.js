/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'http',
        hostname: 'durbar-rajshahi.com',
      },
    ],
  },

  async redirects() {
    return [
      // Basic redirect
      {
        source: '/dashboard',
        destination: '/dashboard/home',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
