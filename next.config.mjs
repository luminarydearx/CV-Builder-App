/** @type {import('next').NextConfig} */
const nextConfig = {
  // Puppeteer spawns a real Chromium binary at runtime, so it must stay
  // external to the server bundle instead of being processed/traced by
  // Next's bundler (Turbopack/webpack) for Route Handlers.
  serverExternalPackages: ["puppeteer", "react-dom", "puppeteer-core"],
};

export default nextConfig;
