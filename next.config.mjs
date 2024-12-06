/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const nextConfig = {
    env: {
        BASE_DOMAIN: process.env.NEXT_PRIVATE_URL,
        SERVER: process.env.NEXT_PRIVATE_SERVER,
        SECRET_KEY: process.env.NEXT_PRIVATE_SECRET_KEY
    },
    reactStrictMode: false,
    compress: true,
    // eslint: {
    //     ignoreDuringBuilds: true
    // },
    trailingSlash: false,
    // typescript: {
    //     ignoreBuildErrors: true
    // },
    // experimental: {
        // missingSuspenseWithCSRBailout: false,
        // reactCompiler: true
    // },
    images: {
        // loader: 'custom',
        // loaderFile: './loader.js',
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'merakiui.com',
                port: ''
            }
        ]
    }
};

const withPWA = withPWAInit({
  dest: "public",
  disable: nextConfig.env.SERVER === "development",
  register: true,
  scope: "/app",
  sw: "service-worker.js",
});



export default withPWA(nextConfig);

