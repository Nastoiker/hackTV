
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['95.163.241.148'],
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
