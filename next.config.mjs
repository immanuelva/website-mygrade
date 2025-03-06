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
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/website-mygrade' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/website-mygrade/' : '',
  distDir: 'out',
  cleanDistDir: true,
}

// Merge configs if userConfig exists
if (typeof userConfig !== 'undefined' && userConfig.default) {
  Object.assign(nextConfig, userConfig.default);
}

export default nextConfig
