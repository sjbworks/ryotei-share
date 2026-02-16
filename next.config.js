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

/** @type {import('next').NextConfig} */
const nextConfig = {
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
