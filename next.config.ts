/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // গুগলের প্রোফাইল ইমেজের হোস্টনেম
      },
    ],
  },
};

export default nextConfig;