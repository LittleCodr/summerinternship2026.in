import { getJobBySlug } from "@/lib/data-fetchers";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) {
    return { title: "Job Not Found" };
  }
  return {
    title: `${job.title} at ${job.company} | Summer Internships 2026`,
    description: job.description.substring(0, 160),
    openGraph: {
      title: `${job.title} at ${job.company}`,
      description: job.description.substring(0, 160),
      type: "article",
      publishedTime: job.publishDate,
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  // Generate JobPosting JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": job.publishDate,
    "validThrough": new Date(new Date(job.publishDate).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Valid for 30 days
    "employmentType": job.type.toUpperCase().replace("-", "_"),
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company,
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location,
        "addressCountry": "IN"
      }
    }
  };

  return (
    <>
      <Script id={`job-schema-${job.id}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen pt-32 pb-20 px-4 max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-primary/10 shadow-2xl shadow-primary/5">
          <div className="mb-8 border-b border-primary/10 pb-8">
            <h1 className="text-3xl md:text-4xl font-black text-primary mb-4">{job.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm font-semibold text-primary/70">
              <span className="flex items-center gap-1">🏢 {job.company}</span>
              <span className="flex items-center gap-1">📍 {job.location}</span>
              <span className="flex items-center gap-1">💼 {job.type}</span>
              <span className="flex items-center gap-1">📅 Posted on {new Date(job.publishDate).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none text-primary/80 mb-10">
            <h3 className="text-xl font-bold text-primary mb-4">About the Role</h3>
            <p className="whitespace-pre-wrap">{job.description}</p>
            
            <h3 className="text-xl font-bold text-primary mt-8 mb-4">Requirements</h3>
            <ul className="list-disc pl-5 space-y-2">
              {job.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
          
          <div className="pt-8 border-t border-primary/10 flex justify-center">
            <a 
              href={job.applyUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
            >
              Apply Now
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
