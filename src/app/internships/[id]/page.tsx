"use client";

import { useParams, useRouter } from "next/navigation";
import internshipsData from "@/data/internships.json";
import { type Internship } from "@/hooks/useSearchAndFilter";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowLeft, Calendar, Building2, CheckCircle2, AlertCircle } from "lucide-react";

export default function InternshipDetail() {
  const { id } = useParams();
  const router = useRouter();
  const internship = (internshipsData as Internship[]).find(i => i.id === id);

  if (!internship) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-milk px-6">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-primary/20 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary mb-2">Internship Not Found</h1>
          <p className="text-primary/40 mb-8">The opportunity you're looking for might have expired or been moved.</p>
          <button 
            onClick={() => router.push("/")}
            className="bg-primary text-milk px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-all"
          >
            Back to Discovery
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-primary/60 font-semibold mb-12 hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to listings
        </button>

        <div className="bg-white border border-primary/5 rounded-[48px] p-8 md:p-12 shadow-xl shadow-primary/5">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
            <div className="flex-1">
              <div className="flex gap-2 mb-6">
                <span className="px-3 py-1 bg-primary text-milk rounded-full text-[10px] font-bold tracking-wider uppercase">
                  {internship.category}
                </span>
                <span className="px-3 py-1 bg-primary/5 text-primary/60 rounded-full text-[10px] font-bold tracking-wider uppercase">
                  Verified & Curated
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 leading-tight">
                {internship.title}
              </h1>
              <div className="flex items-center gap-2 text-xl text-primary/40 font-medium">
                <Building2 className="w-6 h-6" /> {internship.organization}
              </div>
            </div>
            
            <div className="w-full md:w-auto p-6 bg-primary/5 rounded-3xl border border-primary/5 flex flex-col items-center text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-2">Deadline</span>
              <span className="text-2xl font-bold text-primary">{internship.deadline}</span>
              <p className="text-xs text-primary/40 mt-1 italic">T-minus unknown days</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-milk/50 rounded-3xl border border-primary/5">
              <MapPin className="w-5 h-5 text-primary/40 mb-3" />
              <span className="block text-[10px] font-bold uppercase text-primary/40 mb-1">Location</span>
              <span className="font-bold text-primary">{internship.location}</span>
            </div>
            <div className="p-6 bg-milk/50 rounded-3xl border border-primary/5">
              <Clock className="w-5 h-5 text-primary/40 mb-3" />
              <span className="block text-[10px] font-bold uppercase text-primary/40 mb-1">Duration</span>
              <span className="font-bold text-primary">{internship.duration}</span>
            </div>
            <div className="p-6 bg-milk/50 rounded-3xl border border-primary/5">
              <Calendar className="w-5 h-5 text-primary/40 mb-3" />
              <span className="block text-[10px] font-bold uppercase text-primary/40 mb-1">Stipend</span>
              <span className="font-bold text-primary">{internship.stipend}</span>
            </div>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-6">Opportunity Description</h2>
              <p className="text-primary/60 leading-relaxed mb-6">
                This {internship.title} at {internship.organization} is a premier opportunity for the Summer 2026 cycle. 
                Selected interns will work on high-impact projects, mentored by industry experts and academic leaders.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Hands-on experience with real-world projects", "Mentorship from senior engineers/professors", "Networking with elite student community", "Potential for Pre-Placement Offer (PPO)"].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-primary/80">
                    <CheckCircle2 className="w-5 h-5 text-success" /> {benefit}
                  </li>
                ))}
              </ul>
            </section>

            <section className="p-8 bg-primary text-milk rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">Ready to take the next step?</h3>
                <p className="opacity-70 text-sm">Applications are processed via the official {internship.organization} portal.</p>
              </div>
              <a 
                href={`https://www.google.com/search?q=${encodeURIComponent(internship.organization + " " + internship.title + " 2026 apply")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap bg-milk text-primary px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10 inline-block"
              >
                Apply Now
              </a>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
