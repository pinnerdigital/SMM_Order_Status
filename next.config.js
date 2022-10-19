/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'pt', 'es'],
    defaultLocale: 'pt',
  },
}

module.exports = nextConfig
