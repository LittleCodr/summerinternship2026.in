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
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic internship routes
  const internshipRoutes = (internshipsData as Internship[]).map((internship) => ({
    url: `${baseUrl}/internships/${internship.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...internshipRoutes];
}
