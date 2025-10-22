// import withBundleAnalyzer from '@next/bundle-analyzer';
// import { fileURLToPath } from 'url';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
      {
        hostname: 'avatars.githubusercontent.com',
      },
      {
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
  // Optionally, add any other Next.js config below
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     const __filename = fileURLToPath(import.meta.url);
  //     config.cache = {
  //       type: 'filesystem',
  //       buildDependencies: {
  //         config: [__filename],
  //       },
  //     };
  //   }
  //   return config;
  // },
}


// const withBundleAnalyzerConfig = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
// });
export default nextConfig
// export default withBundleAnalyzerConfig(nextConfig)