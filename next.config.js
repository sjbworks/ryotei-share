/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  images: {
    unoptimized: true,
  },
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

module.exports = nextConfig
