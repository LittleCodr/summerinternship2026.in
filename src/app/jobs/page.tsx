import { getPublishedJobs } from "@/lib/data-fetchers";
import Link from "next/link";
import { Metadata } from "next";

export const revalidate = 3600; // Revalidate every hour to fetch newly "published" items

export const metadata: Metadata = {
  title: "Latest Job Listings | Summer Internships 2026",
  description: "Browse the newest tech job listings and internship opportunities. Updated daily.",
};

export default async function JobsPage() {
  const jobs = await getPublishedJobs();

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-primary mb-4">
          Latest Opportunities
        </h1>
        <p className="text-primary/60 max-w-2xl mx-auto">
          We post 10 new high-quality job listings and internships every single day. 
          Keep checking back to stay ahead of the competition.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <Link 
            key={job.id} 
            href={`/jobs/${job.slug}`}
            className="group block p-6 bg-white border border-primary/10 rounded-3xl hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-primary group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h2>
                <p className="text-sm font-semibold text-primary/60 mt-1">{job.company}</p>
              </div>
              <span className="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-full">
                {job.type}
              </span>
            </div>
            <p className="text-sm text-primary/70 line-clamp-2 mb-4">
              {job.description}
            </p>
            <div className="flex justify-between items-center text-xs font-medium text-primary/50">
              <span>{job.location}</span>
              <span>{new Date(job.publishDate).toLocaleDateString()}</span>
            </div>
          </Link>
        ))}

        {jobs.length === 0 && (
          <div className="col-span-full text-center py-12 text-primary/50">
            No job listings found. Check back later!
          </div>
        )}
      </div>
    </main>
  );
}
