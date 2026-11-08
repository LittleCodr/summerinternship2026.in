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
      title: "Internship Not Found | Winter Internships 2026",
    };
  }

  const title = `${internship.title} Internship at ${internship.organization} - Winter Internships 2026`;
  const description = `Apply for the ${internship.title} program at ${internship.organization} in ${internship.location}. Duration: ${internship.duration}, Stipend: ${internship.stipend}. Deadline: ${internship.deadline}.`;

  const isValidDate = (d?: string) => Boolean(d && !isNaN(Date.parse(d)));

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: isValidDate(internship.datePosted) ? new Date(internship.datePosted!).toISOString() : undefined,
      modifiedTime: isValidDate(internship.updatedAt) ? new Date(internship.updatedAt!).toISOString() : undefined,
      url: `https://summerinternship2026.in/internships/${id}`,
      siteName: "Winter Internships 2026",
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

  const fullDescription = internship.contentBlocks
    ?.map((block) => `<p>${block.content}</p>${block.list ? `<ul>${block.list.map(l => `<li>${l}</li>`).join('')}</ul>` : ''}`)
    .join('') || `${internship.title} opportunity at ${internship.organization}`;

  // Validate dates for Schema.org
  const isValidDate = (d?: string) => Boolean(d && !isNaN(Date.parse(d)));

  const validThrough = isValidDate(internship.deadline)
    ? new Date(internship.deadline.includes("T") ? internship.deadline : `${internship.deadline}T23:59:59Z`).toISOString()
    : undefined;

  const datePosted = isValidDate(internship.datePosted)
    ? new Date(internship.datePosted!).toISOString()
    : new Date().toISOString();

  // Extract numeric stipend if available for schema
  const stipendMatch = internship.stipend?.match(/(\d[\d,]*)/);
  const numericSalary = stipendMatch ? parseInt(stipendMatch[1].replace(/,/g, ''), 10) : undefined;

  // Google Job Posting Schema (for SEO indexing)
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": internship.title,
    "description": fullDescription,
    "datePosted": datePosted,
    "employmentType": "INTERN",
    "hiringOrganization": {
      "@type": "Organization",
      "name": internship.organization,
      "sameAs": internship.applyUrl && internship.applyUrl !== "WAITING_FOR_URL" ? internship.applyUrl : "https://summerinternship2026.in",
      "logo": "https://summerinternship2026.in/logo.svg"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": internship.location,
        "addressCountry": "IN"
      }
    }
  };

  if (validThrough) {
    schema["validThrough"] = validThrough;
  }

  if (internship.workMode === "Remote") {
    schema["jobLocationType"] = "TELECOMMUTE";
    schema["applicantLocationRequirements"] = {
      "@type": "Country",
      "name": "India"
    };
  }

  if (numericSalary && internship.stipend !== "Unpaid") {
    schema["baseSalary"] = {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": {
        "@type": "QuantitativeValue",
        "value": numericSalary,
        "unitText": "MONTH"
      }
    };
  }

  if (internship.applyUrl && internship.applyUrl !== "WAITING_FOR_URL") {
    schema["directApply"] = true;
  }

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
