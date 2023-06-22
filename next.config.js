/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
    swcMinify: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vwporhpsnujzncbdxtaj.supabase.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    NEXT_SUPABASE_URL: 'https://vwporhpsnujzncbdxtaj.supabase.co',
    NEXT_SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3cG9yaHBzbnVqem5jYmR4dGFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAyMTcyOTUsImV4cCI6MTk3NTc5MzI5NX0.ZEQ583HrH3bG91azsQdUmZ9K-wuqxtbrSpgSPXiSo1E',
    NEXT_SITE: 'inkflow.tk',
    NEXT_SITE_NAME: 'inkflow',
    NEXT_URL: 'inkflow',
  },
};

module.exports = nextConfig;
