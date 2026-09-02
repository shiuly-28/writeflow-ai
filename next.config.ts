/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc', // PostImage এর ছবি ব্যবহার করলে এটাও রাখতে পারেন
      },
    ],
  },
};

module.exports = nextConfig;