import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["jotai-devtools"],
  experimental: {
    swcPlugins: [
      ["@swc-jotai/react-refresh", {}],
      ["@swc-jotai/debug-label", {}],
    ],
    serverActions: true,
    serverComponentsExternalPackages: ["@libsql/client"],
  },
};

export default nextConfig;
