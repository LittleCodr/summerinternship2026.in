"use client";

import { motion } from "framer-motion";
import { Info, Target, Users, ShieldCheck, Sparkles, Globe, Heart, Zap } from "lucide-react";

export default function About() {
  return (
    <main className="min-h-screen pt-40 pb-32 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-milk/50" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-24 w-64 h-64 bg-accent-purple/[0.05] rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/5 border border-primary/5 mb-10 shadow-sm">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Our Genesis</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-primary mb-8 tracking-tighter leading-[0.9]">
            The Standard for <span className="text-gradient">Elite Talent.</span>
          </h1>
          <p className="text-2xl text-primary/40 max-w-3xl mx-auto font-medium leading-relaxed italic">
            "Bridging the chasm between India's brightest minds and the world's most prestigious opportunities. Curated, verified, and uncompromising."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {[
            {
              icon: Target,
              title: "High-Signal Curation",
              desc: "We don't do 'bulk'. Every internship is hand-vetted for quality, stipend legitimacy, and career prestige.",
            },
            {
              icon: ShieldCheck,
              title: "Transparency First",
              desc: "No redirects to 404 pages. No outdated links. We track the 2026 cycle with surgical precision.",
            },
            {
              icon: Globe,
              title: "Gateway to the World",
              desc: "From the labs of IIT Bombay to the boardrooms of McKinsey in London, we connect you to global excellence.",
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-white border border-primary/5 rounded-[48px] shadow-2xl shadow-primary/[0.02] hover:-translate-y-2 transition-all group"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-milk transition-colors">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-primary mb-4 tracking-tight">{item.title}</h3>
              <p className="text-primary/40 font-bold leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <section className="relative overflow-hidden bg-primary p-12 md:p-24 rounded-[64px] text-milk">
          <div className="absolute top-0 right-0 w-full h-full bg-white/[0.02] -z-10" />
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-10">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
                Why we built <br/>SummerInternships.in
              </h2>
              <div className="space-y-6 text-xl text-milk/60 font-medium leading-relaxed">
                <p>
                  The internship landscape in 2026 is louder than ever, yet harder to navigate. Traditional portals are filled with noise, predatory ads, and ghost listings.
                </p>
                <p>
                  We built this platform to serve as a <strong>God Level Intelligence Layer</strong> for students who are serious about their careers. We value your time as much as you do.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="space-y-2">
                  <div className="text-4xl font-black text-white tracking-widest">640+</div>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Verified Ops</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-black text-white tracking-widest">50k+</div>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Active Explorers</div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/3 aspect-square bg-white/[0.05] rounded-[48px] border border-white/10 flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-milk/5 rounded-[48px] blur-2xl group-hover:blur-3xl transition-all" />
              <div className="flex flex-col items-center gap-6 z-10">
                <div className="w-24 h-24 bg-milk rounded-3xl flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-0 transition-transform">
                  <img src="/logo.svg" alt="Logo" className="w-16 h-16" />
                </div>
                <span className="text-sm font-black uppercase tracking-[0.3em] opacity-40">Precision Built</span>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-32 text-center">
          <p className="text-primary/20 font-black uppercase tracking-[0.3em] text-xs mb-8">Part of the LittleCodr Ecosystem</p>
          <div className="flex justify-center items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
            <div className="text-xl font-bold italic">LittleCodr AI</div>
            <div className="w-1.5 h-1.5 bg-primary/20 rounded-full" />
            <div className="text-xl font-bold italic">Nexus Labs</div>
            <div className="w-1.5 h-1.5 bg-primary/20 rounded-full" />
            <div className="text-xl font-bold italic">Internhub</div>
          </div>
        </div>
      </div>
    </main>
  );
}
