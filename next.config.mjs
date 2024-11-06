/** @type {import('next').NextConfig} */

const getConfig = async () => {
  const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({
    // enabled: process.env.NODE_ENV === "development",
    enabled: false,
  });

  const nextConfig = {
    eslint: { ignoreDuringBuilds: true },
    typescript: {
      ignoreBuildErrors: true,
    },
    reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "localhost",
        },
      ],
    },
  };

  return withBundleAnalyzer(nextConfig);
};

export default getConfig();
