import type { Metadata } from "next";

import { personalInfo, siteConfig } from "@/config/site";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
}

export function createPageMetadata({ title, description, path }: PageMetadataOptions): Metadata {
  const url = new URL(path, personalInfo.siteUrl).toString();
  const socialTitle = `${title} | ${personalInfo.name}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: socialTitle,
      description,
      images: [
        {
          url: siteConfig.socialImage,
          secureUrl: siteConfig.socialImage,
          width: 1200,
          height: 630,
          alt: siteConfig.socialImageAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [siteConfig.socialImage],
    },
  };
}
