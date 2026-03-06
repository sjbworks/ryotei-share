import bundleAnalyzer from '@next/bundle-analyzer'
import withPWAInit from '@ducanh2912/next-pwa'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  ...(process.env.NODE_ENV === 'production'
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains',
        },
      ]
    : []),
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  // Next.js 16 では Turbopack がデフォルトだが、webpack を使用
  experimental: {
    webpackBuildWorker: true,
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'ryotei-share.tskyn33ftprnt.workers.dev',
        '*-ryotei-share.tskyn33ftprnt.workers.dev',
      ],
    },
    nodeMiddleware: true,
  },
  // 画像最適化を有効化（LCP改善のため）
  // images: {
  //   unoptimized: true,
  // },
  trailingSlash: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.gql$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'graphql-tag/loader',
        },
      ],
    })

    return config
  },
}

export default withBundleAnalyzer(withPWA(nextConfig))
