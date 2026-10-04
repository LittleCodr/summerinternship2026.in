import type { Metadata } from "next";
import internshipsData from "@/data/internships.json";
import { type Internship } from "@/hooks/useSearchAndFilter";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Ather Energy Winter Internships 2026 | EV & CleanTech Off Campus",
  description: "Explore 18+ exclusive roles for Ather Energy Winter Internships 2026. Join India's top EV & CleanTech company. Apply online for SDE, Data, and Product roles.",
  openGraph: {
    title: "Ather Energy Winter Internships 2026 | Apply Now",
    description: "Launch your career with Ather Energy. Find out eligibility, roles, and application links for Winter 2026 in the EV & CleanTech space.",
    url: "https://summerinternship2026.in/ather-energy-winter-internships",
    type: "website",
  }
};

export default function AtherEnergyPage() {
  const companyInternships = (internshipsData as Internship[]).filter(
    (i) => i.company === "Ather Energy" && i.id.includes("winter")
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Ather Energy Winter Internships 2026",
    "description": "List of available winter internships at Ather Energy for the 2026 cohort.",
    "itemListElement": companyInternships.map((internship, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://summerinternship2026.in/internships/${internship.id}`
    }))
  };

  return (
    <main className="min-h-screen max-w-6xl mx-auto px-6 py-20 mt-16">
      <Script
        id="ather-energy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          Ather Energy Winter Internships 2026
        </h1>
        <p className="text-xl text-primary/70 max-w-3xl leading-relaxed">
          Ather Energy is actively recruiting for its highly competitive Winter 2026 cohort. 
          As a leader in <strong>EV & CleanTech</strong>, they offer <strong className="text-primary">{companyInternships.length} diverse roles</strong> across engineering, product, and data. 
          Discover open off-campus drives below.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companyInternships.map((intern) => (
          <Link href={`/internships/${intern.id}`} key={intern.id} className="group h-full">
            <div className="bg-white/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 rounded-2xl p-6 transition-all duration-300 h-full flex flex-col hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-semibold rounded-full mb-4">
                  {intern.category}
                </span>
                <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors leading-tight">
                  {intern.title}
                </h3>
              </div>
              <div className="mt-auto pt-6 space-y-3 text-sm text-primary/70 font-medium">
                <div className="flex items-center gap-2">
                  <span>📍</span> {intern.location}
                </div>
                <div className="flex items-center gap-2">
                  <span>💰</span> {intern.stipend}
                </div>
                <div className="flex items-center gap-2 text-accent">
                  <span>⏳</span> Apply by: {new Date(intern.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-16 bg-primary/5 rounded-2xl p-8 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-primary mb-4">Ready to shape the future of EV & CleanTech?</h2>
        <p className="text-primary/70 mb-6">Don't wait until the deadline. Apply through the verified off-campus portal.</p>
        <a 
          href="https://internshipshub.in/jobs/ather-energy-off-campus" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-primary text-milk font-bold rounded-xl hover:bg-primary/90 transition-colors"
        >
          View All Ather Energy Postings
        </a>
      </div>
    </main>
  );
}
