import createMDX from '@next/mdx'
import withBundleAnalyzer from '@next/bundle-analyzer';
import path from 'path';
import { fileURLToPath } from 'url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  webpack: (config, { isServer }) => {
    if (!isServer) {
      const __filename = fileURLToPath(import.meta.url);
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      };
    }
    return config;
  },
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})
const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
// Merge MDX config with Next.js config
export default withBundleAnalyzerConfig(withMDX(nextConfig));