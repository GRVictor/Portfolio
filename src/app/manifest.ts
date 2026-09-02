import type { MetadataRoute } from "next";

import { personalInfo, siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: personalInfo.brand,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#181817",
  };
}
