"use client";

import { motion } from "framer-motion";
import { Info, Target, Users, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <Info className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">About Us</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Empowering the Next Generation of Talent</h1>
          <p className="text-lg text-primary/60 max-w-2xl mx-auto">
            SummerInternships.in is India's premier destination for verified, high-signal internship opportunities for the 2026 cycle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 bg-white border border-primary/5 rounded-[40px] shadow-sm">
            <Target className="w-8 h-8 text-primary mb-6" />
            <h3 className="text-xl font-bold text-primary mb-4">Our Mission</h3>
            <p className="text-primary/60 leading-relaxed">
              To bridge the gap between ambitious students and elite institutions/corporates by providing a curated, noise-free intelligence layer for internship discovery.
            </p>
          </div>
          <div className="p-8 bg-white border border-primary/5 rounded-[40px] shadow-sm">
            <ShieldCheck className="w-8 h-8 text-primary mb-6" />
            <h3 className="text-xl font-bold text-primary mb-4">Trust & Verification</h3>
            <p className="text-primary/60 leading-relaxed">
              Every listing on our platform goes through a rigorous verification process to ensure transparency in stipends, deadlines, and eligibility.
            </p>
          </div>
        </div>

        <section className="bg-primary text-milk p-12 rounded-[48px]">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
              <ul className="space-y-4">
                {[
                  "Focus on 2026 Cycle Internships",
                  "Verified IIT & NIT Opportunities",
                  "Direct Application Links Only",
                  "Clean, Ad-Free Discovery Experience"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Users className="w-5 h-5 opacity-60" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-32 h-32 bg-milk/10 rounded-full flex items-center justify-center">
              <span className="text-4xl">🇮🇳</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
