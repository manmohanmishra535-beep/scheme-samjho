import type { MetadataRoute } from "next";
import { getAllSchemes } from "../lib/schemes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const schemes = await getAllSchemes();

  const baseUrl = "https://schemesamjho.in";

  const schemeUrls: MetadataRoute.Sitemap = schemes.map((scheme) => ({
    url: `${baseUrl}/schemes/${scheme.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/schemes`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/eligibility`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/explainers`,
      lastModified: new Date(),
    },
    ...schemeUrls,
  ];
}