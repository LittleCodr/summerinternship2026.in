"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, Sparkles, MapPin, Globe, Headphones } from "lucide-react";

export default function Contact() {
  return (
    <main className="min-h-screen pt-40 pb-32 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full -z-10 bg-milk/50" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl shadow-2xl" />
      <div className="absolute bottom-0 -left-24 w-64 h-64 bg-accent-purple/[0.05] rounded-full blur-3xl shadow-2xl" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-32"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/5 border border-primary/5 mb-10 shadow-sm">
            <Headphones className="w-4 h-4 text-primary animate-bounce" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Support & Partnerships</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-primary mb-8 tracking-tighter leading-[0.9]">
            Let’s Shape the <br/><span className="text-gradient">Future Together.</span>
          </h1>
          <p className="text-2xl text-primary/40 max-w-2xl mx-auto font-medium leading-relaxed italic">
            "Direct access to the architects of India's premier internship discovery engine. We're here to help you scale."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/30">Connect Directly</h3>
              <div className="space-y-6">
                <a href="mailto:support@summerinternship2026.in" className="group flex items-center gap-6 p-6 bg-white border border-primary/5 rounded-[40px] hover:border-primary/20 transition-all shadow-2xl shadow-primary/[0.02]">
                  <div className="w-16 h-16 bg-primary/5 rounded-3xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-milk transition-colors shadow-lg">
                    <Mail className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Email Hub</div>
                    <div className="text-xl font-bold text-primary group-hover:underline">support@summerinternship2026.in</div>
                  </div>
                </a>

                <div className="group flex items-center gap-6 p-6 bg-white border border-primary/5 rounded-[40px] hover:border-primary/20 transition-all shadow-2xl shadow-primary/[0.02]">
                  <div className="w-16 h-16 bg-primary/5 rounded-3xl flex items-center justify-center text-primary transition-colors shadow-lg">
                    <Globe className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">HQ Location</div>
                    <div className="text-xl font-bold text-primary">Varanasi / Bangalore, India</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 bg-primary rounded-[56px] text-milk relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <MessageSquare className="w-12 h-12 mb-8 opacity-20" />
              <h4 className="text-2xl font-black mb-4 tracking-tight">Institutional Partnerships</h4>
              <p className="text-milk/60 font-bold leading-relaxed mb-8">
                Are you part of an IIT/NIT placement cell? We offer priority listing and talent mapping services for the 2026 cycle.
              </p>
              <button className="w-full bg-milk text-primary py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.05] active:scale-[0.95] transition-all shadow-2xl">
                Partner with us
              </button>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-white border border-primary/5 rounded-[64px] p-12 md:p-16 shadow-2xl shadow-primary/[0.02] relative">
            <h3 className="text-3xl font-black text-primary mb-12 tracking-tight">Drop a Message</h3>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 ml-4">Full Identity</label>
                  <input type="text" placeholder="e.g. Aryan Sharma" className="w-full bg-primary/[0.02] border border-primary/5 rounded-3xl px-8 py-5 outline-none focus:border-primary/20 transition-all font-bold text-primary placeholder:text-primary/10" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 ml-4">Secure Email</label>
                  <input type="email" placeholder="e.g. aryan@iit.ac.in" className="w-full bg-primary/[0.02] border border-primary/5 rounded-3xl px-8 py-5 outline-none focus:border-primary/20 transition-all font-bold text-primary placeholder:text-primary/10" />
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 ml-4">Your Intent</label>
                <select className="w-full bg-primary/[0.02] border border-primary/5 rounded-3xl px-8 py-5 outline-none focus:border-primary/20 transition-all font-bold text-primary appearance-none cursor-pointer">
                  <option>General Exploration</option>
                  <option>Listing Correction</option>
                  <option>Institutional Partnership</option>
                  <option>Career Guidance</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 ml-4">Brief Narrative</label>
                <textarea rows={5} placeholder="Tell us how we can help you scale..." className="w-full bg-primary/[0.02] border border-primary/5 rounded-3xl px-8 py-5 outline-none focus:border-primary/20 transition-all font-bold text-primary placeholder:text-primary/10 resize-none"></textarea>
              </div>

              <button className="w-full bg-primary text-milk py-6 rounded-[32px] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl group shadow-primary/20">
                Transmit Message <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
