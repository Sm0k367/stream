/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow Suno's CDN to serve images (cover art) to your site
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn1.suno.ai',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Optimizes the 3D engine build
  transpilePackages: ['three'],
};

export default nextConfig;
