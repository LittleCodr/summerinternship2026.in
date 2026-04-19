"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, ExternalLink, Calendar } from "lucide-react";
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="group bg-white border border-primary/5 hover:border-primary/20 rounded-[32px] p-6 transition-all shadow-sm hover:shadow-xl hover:shadow-primary/5 flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 bg-primary text-milk rounded-full text-[10px] font-bold tracking-wider uppercase">
            {internship.category}
          </span>
          <span className="px-3 py-1 bg-primary/5 text-primary/60 rounded-full text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
            <Clock className="w-3 h-3" /> {internship.duration}
          </span>
        </div>
        <Link 
          href={`/internships/${internship.id}`}
          className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-milk transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
        </Link>
      </div>

      <Link href={`/internships/${internship.id}`} className="flex-1">
        <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-primary/80 transition-colors line-clamp-2">
          {internship.title}
        </h3>
        <p className="text-primary/40 font-medium mb-6">{internship.organization}</p>

        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2 text-sm text-primary/60">
            <MapPin className="w-4 h-4 text-primary/30" />
            <span>{internship.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-primary/60">
            <Calendar className="w-4 h-4 text-primary/30" />
            <span>Deadline: {internship.deadline}</span>
          </div>
        </div>
      </Link>

      <div className="pt-6 border-t border-primary/5 flex items-center justify-between">
        <div>
          <span className="block text-[10px] text-primary/40 uppercase font-bold tracking-widest mb-0.5">Stipend</span>
          <span className="text-primary font-bold">{internship.stipend}</span>
        </div>
        <Link 
          href={`/internships/${internship.id}`}
          className="px-6 py-2.5 rounded-2xl bg-primary/5 text-primary font-bold text-sm hover:bg-primary hover:text-milk transition-all"
        >
          Details
        </Link>
      </div>
    </motion.div>
  );
}
