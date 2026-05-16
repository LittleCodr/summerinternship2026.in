import { MetadataRoute } from "next";
import internshipsData from "@/data/internships.json";
import { Internship } from "@/hooks/useSearchAndFilter";

import { getPublishedBlogs, getPublishedJobs } from "@/lib/data-fetchers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://summerinternship2026.in";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/contact",
    "/jobs",
    "/blogs",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic internship routes
  const internshipRoutes = (internshipsData as Internship[]).map((internship) => ({
    url: `${baseUrl}/internships/${internship.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const jobs = await getPublishedJobs(1000);
  const blogs = await getPublishedBlogs(1000);

  const jobRoutes = jobs.map((job) => ({
    url: `${baseUrl}/jobs/${job.slug}`,
    lastModified: new Date(job.publishDate),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.publishDate),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...internshipRoutes, ...jobRoutes, ...blogRoutes];
}
