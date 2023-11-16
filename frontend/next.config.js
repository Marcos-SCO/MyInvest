/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com'
    ]
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    FRONT_END_BASE_URL: process.env.FRONT_END_BASE_URL,
  },
}

module.exports = nextConfig