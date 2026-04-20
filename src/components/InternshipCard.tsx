"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, ExternalLink, Calendar, Building2, Star } from "lucide-react";
import Link from "next/link";

interface InternshipCardProps {
  internship: {
    id: string;
    title: string;
    organization: string;
    category: string;
    location: string;
    duration: string;
    stipend: string;
    deadline: string;
    tags: string[];
  };
}

export default function InternshipCard({ internship }: InternshipCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -12 }}
      className="group relative bg-white border border-primary/5 rounded-[40px] p-8 transition-all hover:border-primary/20 hover:shadow-[0_22px_70px_4px_rgba(56,25,50,0.08)] flex flex-col h-full overflow-hidden"
    >
      {/* Premium Badge */}
      <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
        <Star className="w-6 h-6 text-primary/10 fill-primary/10" />
      </div>

      <div className="flex items-start justify-between mb-10">
        <div className="flex gap-2 flex-wrap">
          <span className="px-4 py-1.5 bg-primary text-milk rounded-full text-[10px] font-black tracking-widest uppercase">
            {internship.category}
          </span>
          <span className="px-4 py-1.5 bg-primary/5 text-primary/40 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-2">
            <Clock className="w-3 h-3" /> {internship.duration}
          </span>
        </div>
        <Link 
          href={`/internships/${internship.id}`}
          className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-milk transition-all rotate-3 group-hover:rotate-0 shadow-lg shadow-black/5"
        >
          <ExternalLink className="w-5 h-5 transition-transform group-hover:scale-110" />
        </Link>
      </div>

      <Link href={`/internships/${internship.id}`} className="flex-1 space-y-4">
        <div className="flex items-center gap-3 text-primary/30 font-black text-[10px] uppercase tracking-[0.2em]">
          <Building2 className="w-4 h-4" />
          {internship.organization}
        </div>
        <h3 className="text-2xl font-black text-primary mb-2 group-hover:text-primary leading-tight tracking-tight">
          {internship.title}
        </h3>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="flex items-center gap-2 text-xs font-bold text-primary/50">
            <div className="w-1.5 h-1.5 bg-primary/20 rounded-full" />
            {internship.location}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary/50">
            <div className="w-1.5 h-1.5 bg-primary/20 rounded-full" />
            Until {internship.deadline}
          </div>
        </div>
      </Link>

      <div className="mt-10 pt-8 border-t border-primary/5 flex items-center justify-between">
        <div>
          <span className="block text-[10px] text-primary/20 uppercase font-black tracking-[0.2em] mb-1">Monthly Yield</span>
          <span className="text-xl font-black text-primary tracking-tight">{internship.stipend}</span>
        </div>
        <Link 
          href={`/internships/${internship.id}`}
          title={`View full details and application steps for ${internship.title} at ${internship.organization}`}
          className="px-8 py-3.5 rounded-2xl bg-primary/5 text-primary font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-milk transition-all shadow-xl shadow-black/5"
        >
          Apply Now
        </Link>
      </div>
    </motion.div>
  );
}
