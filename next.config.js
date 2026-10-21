/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable static export
  output: 'export',
  trailingSlash: true,
  // Disable image optimization for static export (or use unoptimized: true)
  images: {
    unoptimized: true,
  },
  // Enable Turbopack
  turbopack: {},
}

module.exports = nextConfig

