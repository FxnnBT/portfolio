import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Geen sharp-optimalisatie op de Pi: die CPU heeft wel wat beters te doen.
  // Screenshots zelf op maat aanleveren (max ~1600px breed).
  images: { unoptimized: true },
  async redirects() {
    return [{ source: "/", destination: "/nl", permanent: false }]
  },
}

export default nextConfig
