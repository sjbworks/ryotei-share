/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
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

export default nextConfig
