import type { MetadataRoute } from "next";
import { site } from "@/content/pt";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#060607",
    theme_color: "#060607",
    lang: "pt-BR",
    categories: ["business", "technology", "productivity"],
    icons: [
      {
        src: "/brand/logo-mark.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
