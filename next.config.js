/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/course-management-app-landing',
  assetPrefix: '/course-management-app-landing/',
  trailingSlash: true,
}

module.exports = nextConfig 