import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
    ],
  },
  cacheLife: {
    oneMinute: {
      stale: 60,
      revalidate: 60,
      expire: 60,
    },
    fiveMinutes: {
      stale: 300,
      revalidate: 300,
      expire: 300,
    },
    tenMinutes: {
      stale: 600,
      revalidate: 600,
      expire: 600,
    },
    fifteenMinutes: {
      stale: 900,
      revalidate: 900,
      expire: 900,
    },
    twentyMinutes: {
      stale: 1200,
      revalidate: 1200,
      expire: 1200,
    },
    thirtyMinutes: {
      stale: 1800,
      revalidate: 1800,
      expire: 1800,
    },
    oneHour: {
      stale: 3600,
      revalidate: 3600,
      expire: 3600,
    },
  },
};

export default nextConfig;
