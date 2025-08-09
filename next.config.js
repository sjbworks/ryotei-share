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
  images: {
    unoptimized: true,
  },
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
  // Edge runtime compatibility
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.gql$/,
  //     exclude: /node_modules/,
  //     use: [
  //       {
  //         loader: 'graphql-tag/loader',
  //       },
  //     ],
  //   })

  //   // Edge runtime polyfills for Supabase
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     'process/browser': require.resolve('process/browser'),
  //   }

  //   const webpack = require('webpack')
  //   config.plugins.push(
  //     new webpack.DefinePlugin({
  //       'process.version': JSON.stringify('v18.0.0'),
  //       'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  //     })
  //   )

  //   return config
  // },
}

module.exports = nextConfig
