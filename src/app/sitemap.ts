import { MetadataRoute } from "next";
import internshipsData from "@/data/internships.json";
import { Internship } from "@/hooks/useSearchAndFilter";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://summerinternship2026.in";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/contact",
    "/accenture-winter-internships",
    "/zerodha-winter-internships",
    "/ather-energy-winter-internships",
    "/zoho-winter-internships",
    "/postman-winter-internships",
    "/skyroot-winter-internships",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic internship routes (deduplicated by ID)
  const uniqueInternships = Array.from(
    new Map((internshipsData as Internship[]).map((item) => [item.id, item])).values()
  );

  const internshipRoutes = uniqueInternships.map((internship) => ({
    url: `${baseUrl}/internships/${internship.id}`,
    lastModified: internship.updatedAt ? new Date(internship.updatedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...internshipRoutes];
}
