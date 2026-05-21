/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {

  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'upload.wikimedia.org',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'images.unsplash.com',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'plus.unsplash.com',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'i.pravatar.cc',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'www.google.com',
  //     },
  //   ],
  // },
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "***",
      },
    ],
  },

  reactCompiler: true,
};

export default nextConfig;
