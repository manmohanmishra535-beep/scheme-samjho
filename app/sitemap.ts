import type { MetadataRoute } from "next";
import { schemes } from "../data/schemes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://schemesamjho.in";

  const mainPages = [
    "",
    "/schemes",
    "/eligibility",
    "/explainers",
    "/compare",
    "/saved",
    "/about",
    "/contact",
    "/privacy",
    "/disclaimer",
  ];

  const pages: MetadataRoute.Sitemap = mainPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "weekly" : "monthly",
    priority: page === "" ? 1 : 0.7,
  }));

  const schemePages: MetadataRoute.Sitemap = schemes.map((scheme) => ({
    url: `${baseUrl}/schemes/${scheme.slug}`,
    lastModified: new Date(scheme.lastVerified),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const explainerPages: MetadataRoute.Sitemap = schemes.map((scheme) => ({
    url: `${baseUrl}/explainers/${scheme.slug}`,
    lastModified: new Date(scheme.lastVerified),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...pages,
    ...schemePages,
    ...explainerPages,
  ];
}