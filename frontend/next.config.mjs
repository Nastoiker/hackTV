/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['http://localhost:8000'],
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
    fontLoaders: [
      {
        loader: "@next/font/google",
        options: { subsets: ["latin"] },
      },
    ],
  },
}

export default nextConfig
