/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.1.109'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  }
}

export default nextConfig
