let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Only use export for production builds
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  // Set the basePath to match your GitHub Pages repository name
  basePath: process.env.NODE_ENV === 'production' ? '/website-mygrade' : '',
  images: {
    unoptimized: true,
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
    // This is important for GitHub Pages deployment
    path: process.env.NODE_ENV === 'production' ? '/website-mygrade/_next/image' : '/_next/image',
    loader: 'default',
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  optimizeFonts: false,
  // Remove trailingSlash to prevent redirect issues
  trailingSlash: false,
  // Make sure assetPrefix matches basePath
  assetPrefix: process.env.NODE_ENV === 'production' ? '/website-mygrade' : '',
  // Add this to ensure static assets are properly handled
  distDir: 'out',
  cleanDistDir: true,
}

// Merge configs if userConfig exists
if (typeof userConfig !== 'undefined' && userConfig.default) {
  Object.assign(nextConfig, userConfig.default);
}

export default nextConfig
