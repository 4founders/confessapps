import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // 🚫 Evita que el build se detenga por errores de TypeScript
    ignoreBuildErrors: true,
  },
  eslint: {
    // ❌ Evita que ESLint bloquee el build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
