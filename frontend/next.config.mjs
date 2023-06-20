
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
   // domains: ['95.163.241.148:8000'],
     domains: ['localhost'],

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
