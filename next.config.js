/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Only apply these settings when building for production
  ...(process.env.NODE_ENV === 'production' ? {
    output: 'export',
    images: {
      unoptimized: true,
    },
    basePath: '/course-management-app-landing',
    assetPrefix: '/course-management-app-landing/',
    trailingSlash: true,
  } : {
    // Development settings
    images: {
      unoptimized: true,
    }
  })
}

module.exports = nextConfig 