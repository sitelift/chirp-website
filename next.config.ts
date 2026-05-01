import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Hide the Next.js dev indicator — its little 'N' badge in the
  // bottom-left corner is visible in every screenshot and breaks the
  // dark-canvas illusion. Production deploys never had it; we kill
  // it locally too so what we screenshot is what ships.
  devIndicators: false,
};

export default nextConfig;
