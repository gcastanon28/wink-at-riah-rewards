import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wink At Riah Rewards",
    short_name: "Wink Rewards",
    description:
      "Track Wink At Riah lash loyalty points, redeem rewards, and manage account preferences.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0d0912",
    theme_color: "#e344a7",
    orientation: "portrait",
    categories: ["lifestyle", "shopping"],
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/logo-full.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
