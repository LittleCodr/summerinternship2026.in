"use client";

import { useRouter } from "next/navigation";
import { type Internship } from "@/hooks/useSearchAndFilter";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowLeft, Calendar, Building2, CheckCircle2, Share2, Bookmark, Download } from "lucide-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface InternshipDetailContentProps {
  internship: Internship;
}

export default function InternshipDetailContent({ internship }: InternshipDetailContentProps) {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleApply = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#381932", "#9D7EB0", "#FFF3E6", "#4ADE80"]
    });
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 md:px-6 relative selection:bg-primary selection:text-milk">
      {/* Floating Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-primary/5 z-[100]">
        <motion.div 
          className="h-full bg-primary shadow-[0_0_10px_rgba(56,25,50,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-primary/60 font-bold hover:text-primary transition-all group px-4 py-2 bg-white rounded-full border border-primary/5 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
          </button>
          
          <div className="flex gap-3">
            <button className="p-3 bg-white border border-primary/5 rounded-2xl text-primary/60 hover:text-primary hover:border-primary/20 transition-all shadow-sm">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-3 bg-white border border-primary/5 rounded-2xl text-primary/60 hover:text-primary hover:border-primary/20 transition-all shadow-sm">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-2 border-primary/5 rounded-[48px] p-8 md:p-12 shadow-2xl shadow-primary/5"
            >
              <div className="flex gap-2 mb-8">
                <span className="px-4 py-1.5 bg-primary text-milk rounded-full text-[10px] font-black tracking-widest uppercase">
                  {internship.category}
                </span>
                <span className="px-4 py-1.5 bg-success/10 text-success rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                  </span>
                  HIRING NOW
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-primary mb-6 leading-[1.1] tracking-tight">
                {internship.title}
              </h1>
              
              <div className="flex items-center gap-4 text-2xl text-primary/40 font-bold mb-12">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                {internship.organization}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
                <div className="p-6 bg-primary/[0.02] border border-primary/5 rounded-[32px] group hover:bg-primary transition-all cursor-default">
                  <MapPin className="w-5 h-5 text-primary/40 mb-3 group-hover:text-milk/60" />
                  <span className="block text-[10px] font-black uppercase text-primary/30 mb-1 group-hover:text-milk/40 tracking-wider">Location</span>
                  <span className="font-bold text-primary group-hover:text-milk">{internship.location}</span>
                </div>
                <div className="p-6 bg-primary/[0.02] border border-primary/5 rounded-[32px] group hover:bg-primary transition-all cursor-default">
                  <Clock className="w-5 h-5 text-primary/40 mb-3 group-hover:text-milk/60" />
                  <span className="block text-[10px] font-black uppercase text-primary/30 mb-1 group-hover:text-milk/40 tracking-wider">Duration</span>
                  <span className="font-bold text-primary group-hover:text-milk">{internship.duration}</span>
                </div>
                <div className="p-6 bg-primary/[0.02] border border-primary/5 rounded-[32px] group hover:bg-primary transition-all cursor-default">
                  <Calendar className="w-5 h-5 text-primary/40 mb-3 group-hover:text-milk/60" />
                  <span className="block text-[10px] font-black uppercase text-primary/30 mb-1 group-hover:text-milk/40 tracking-wider">Stipend</span>
                  <span className="font-bold text-primary group-hover:text-milk">{internship.stipend}</span>
                </div>
              </div>

              <div className="prose prose-primary max-w-none">
                <h2 className="text-3xl font-black text-primary mb-8 border-b-4 border-primary/5 pb-4">Ultimate Internship Guide 2026</h2>
                <div className="space-y-12 text-primary/70 text-lg leading-relaxed">
                  {internship.contentBlocks ? internship.contentBlocks.map((block, i) => (
                    <div key={i} className="space-y-6">
                      <h3 className="text-2xl font-bold text-primary flex items-center gap-3">
                        <div className="w-2 h-8 bg-primary rounded-full" />
                        {block.title}
                      </h3>
                      <div className="whitespace-pre-wrap">{block.content}</div>
                      {block.list && (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                          {block.list.map((item, j) => (
                            <li key={j} className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/5">
                              <CheckCircle2 className="w-5 h-5 text-success" />
                              <span className="font-bold text-sm text-primary/80 uppercase tracking-wide">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )) : (
                    <p>Loading the ultimate guide for {internship.title}...</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* God Level Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-32 space-y-6"
            >
              {/* Application Card */}
              <div className="bg-primary text-milk p-8 rounded-[40px] shadow-2xl shadow-primary/20">
                <div className="mb-8">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 block text-center">Deadline Countdown</span>
                  <div className="flex justify-center gap-4">
                    {["12d", "08h", "45m"].map((time, i) => (
                      <div key={i} className="text-center">
                        <div className="text-3xl font-black">{time.slice(0, 2)}</div>
                        <div className="text-[10px] opacity-40 uppercase font-bold">{time.slice(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <a 
                  href={`https://internshipshub.in/internships/${internship.hubSlug || ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Apply for ${internship.title} at ${internship.organization} on InternshipHub`}
                  onClick={handleApply}
                  className="w-full bg-milk text-primary py-5 rounded-3xl font-black text-center block text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10 group mb-4"
                >
                  Apply Now <Download className="w-4 h-4 inline-block ml-2 group-hover:translate-y-0.5 transition-transform" />
                </a>
                <p className="text-[10px] text-center opacity-40 font-medium">Verify through the official portal before applying.</p>
              </div>

              {/* AI Prep Assistant Placeholder */}
              <div className="bg-white border-2 border-primary/5 p-8 rounded-[40px] shadow-lg shadow-primary/5">
                <h4 className="text-xl font-black text-primary mb-6 flex items-center gap-3">
                  <span className="text-2xl">✨</span> AI Prep Hub
                </h4>
                <div className="space-y-4">
                  {[
                    "Focus on DSA: Trees & Graphs",
                    "Understand Core Values",
                    "Behavioral Interview Prep",
                    "Past Interview Experiences (64)"
                  ].map((tip, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-primary/5 text-primary/60 text-sm font-bold border border-primary/5">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {tip}
                    </div>
                  ))}
                  <button className="w-full mt-4 py-3 rounded-2xl border-2 border-primary text-primary font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-milk transition-all">
                    Unlock Full Prep Guide
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
