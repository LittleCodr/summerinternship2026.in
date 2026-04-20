import { Metadata } from "next";
import internshipsData from "@/data/internships.json";
import { type Internship } from "@/hooks/useSearchAndFilter";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import InternshipDetailContent from "@/components/InternshipDetailContent";

// Cloudflare Edge Runtime Fix
export const runtime = 'edge';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const internship = (internshipsData as Internship[]).find(i => i.id === id);

  if (!internship) {
    return {
      title: "Internship Not Found | Summer Internships 2026",
    };
  }

  const title = `${internship.title} Internship at ${internship.organization} - Summer Internships 2026`;
  const description = `Apply for the ${internship.title} program at ${internship.organization} in ${internship.location}. Duration: ${internship.duration}, Stipend: ${internship.stipend}. Deadline: ${internship.deadline}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://summerinternship2026.in/internships/${id}`,
      siteName: "Summer Internships 2026",
      images: [
        {
          url: "/logo.svg", // Fallback to logo
          width: 800,
          height: 600,
          alt: `${internship.organization} Logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function InternshipDetailPage({ params }: Props) {
  const { id } = await params;
  const internship = (internshipsData as Internship[]).find(i => i.id === id);

  if (!internship) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-milk px-6">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-primary/20 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary mb-2">Internship Not Found</h1>
          <p className="text-primary/40 mb-8">The opportunity you're looking for might have expired or been moved.</p>
          <Link 
            href="/"
            className="bg-primary text-milk px-8 py-3 rounded-2xl font-bold inline-block hover:scale-105 transition-all text-sm uppercase tracking-widest"
          >
            Back to Discovery
          </Link>
        </div>
      </div>
    );
  }

  // Google Job Posting Schema (for SEO indexing)
  const schema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": internship.title,
    "description": internship.title + " opportunity at " + internship.organization,
    "datePosted": new Date().toISOString().split('T')[0],
    "validThrough": internship.deadline,
    "hiringOrganization": {
      "@type": "Organization",
      "name": internship.organization,
      "logo": "https://summerinternship2026.in/logo.svg"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": internship.location,
        "addressCountry": "IN"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": {
        "@type": "QuantitativeValue",
        "unitText": "MONTH"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <InternshipDetailContent internship={internship} />
    </>
  );
}
