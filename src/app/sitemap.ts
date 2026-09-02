import type { MetadataRoute } from "next";

import { personalInfo } from "@/config/site";
import { allProjects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/proyectos", "/sobre-mi", "/contacto"];
  const projectPages = allProjects.map((project) => `/proyectos/${project.slug}`);

  return [...pages, ...projectPages].map((path) => ({
    url: `${personalInfo.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path.startsWith("/proyectos/") ? "monthly" : "weekly",
    priority: path === "" ? 1 : path.startsWith("/proyectos/") ? 0.7 : 0.8,
  }));
}
