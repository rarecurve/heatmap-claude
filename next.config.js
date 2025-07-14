// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  env: {
    SERPAPI_KEY: process.env.SERPAPI_KEY,
  }
}

module.exports = nextConfig

// ---

// .env.local (template)
SERPAPI_KEY=bed0e3114b4b1a543aacd2c76a06bb36b270449621b4d229c7525687a43c8746
DATABASE_URL="postgresql://username:password@localhost:5432/rarecurve?schema=public"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

// ---
