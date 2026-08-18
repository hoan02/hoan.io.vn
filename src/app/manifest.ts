import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Le Cong Hoan — Full-stack Developer Portfolio",
    short_name: "Hoan Portfolio",
    description:
      "Portfolio of Le Cong Hoan, Senior Full-stack Developer in Hanoi, Vietnam.",
    start_url: "/",
    display: "standalone",
    background_color: "#090a0f",
    theme_color: "#090a0f",
    icons: [
      {
        src: "/images/logo-dark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/images/logo-dark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
