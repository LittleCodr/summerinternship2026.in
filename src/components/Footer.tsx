"use client";

import { motion } from "framer-motion";
import { Mail, Globe, Camera, Briefcase, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-primary text-milk pt-32 pb-12 px-6 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-purple/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-12 h-12 bg-milk/10 rounded-2xl flex items-center justify-center group-hover:bg-milk group-hover:text-primary transition-all rotate-3 group-hover:rotate-0">
                <img src="/logo.svg" alt="Logo" className="w-8 h-8 rounded-lg" />
              </div>
              <span className="text-2xl font-black tracking-tight">SummerInterns<span className="opacity-40">.in</span></span>
            </Link>
            <p className="text-milk/60 text-lg leading-relaxed max-w-sm font-medium">
              The premier destination for high-signal internships. Bridging the gap between India's top talent and elite opportunities.
            </p>
            <div className="flex gap-4">
              {[Globe, Camera, Briefcase, Mail].map((Icon, i) => (
                <Link key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-milk hover:text-primary transition-all hover:-translate-y-1 border border-white/5 shadow-xl">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest opacity-40">Discovery</h4>
            <ul className="space-y-4 font-bold">
              <li><Link href="/#explorer" className="text-milk/60 hover:text-white transition-colors flex items-center gap-2">Explore All <ArrowRight className="w-4 h-4" /></Link></li>
              <li><Link href="/#institutes" className="text-milk/60 hover:text-white transition-colors">IIT/NIT Roles</Link></li>
              <li><Link href="/#institutes" className="text-milk/60 hover:text-white transition-colors">Corporate Tiers</Link></li>
              <li><Link href="/resources" className="text-milk/60 hover:text-white transition-colors">Prep Resources</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest opacity-40">Company</h4>
            <ul className="space-y-4 font-bold">
              <li><Link href="/about" className="text-milk/60 hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="text-milk/60 hover:text-white transition-colors">Partner With Us</Link></li>
              <li><Link href="/contact" className="text-milk/60 hover:text-white transition-colors">Support Hub</Link></li>
              <li><Link href="mailto:support@summerinternship2026.in" className="text-milk/60 hover:text-white transition-colors">Email Us</Link></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-sm font-black uppercase tracking-widest opacity-40">Stay Updated</h4>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="email@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 font-bold text-sm outline-none focus:border-white/40 transition-all placeholder:text-white/20"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-milk text-primary px-4 rounded-xl flex items-center justify-center hover:scale-[1.05] active:scale-[0.95] transition-all">
                <ArrowRight className="w-4 h-4 font-black" />
              </button>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-20 leading-relaxed">
              No spam. Just high-signal internship alerts for the 2026 cycle.
            </p>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 text-[10px] font-black uppercase tracking-widest opacity-40">
            <span>© 2026 SummerInternships.in</span>
            <span className="hidden md:block w-1.5 h-1.5 bg-milk/20 rounded-full" />
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
          
          <div className="flex items-center gap-2 px-6 py-2.5 bg-white/5 rounded-full border border-white/5 shadow-2xl">
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">Built with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-40 text-milk">in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
