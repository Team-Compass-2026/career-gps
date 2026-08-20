/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Workaround for Next.js 16.3 bug #96646: `output: 'standalone'` breaks on
  // Vercel (its adapter skips writing next-server.js.nft.json, but the
  // standalone finalizer still reads it -> ENOENT in onBuildComplete).
  // Vercel injects the VERCEL env var, so disable standalone there and keep
  // it for self-hosted/Docker builds.
  output: process.env.VERCEL ? undefined : 'standalone',
}

module.exports = nextConfig