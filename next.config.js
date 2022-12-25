const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  locales: ['en', 'th'],
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
}

module.exports = nextConfig
