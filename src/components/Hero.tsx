"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ArrowRight, Building2, Sparkles, Zap } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import internshipsData from "@/data/internships.json";
import { type Internship } from "@/hooks/useSearchAndFilter";
import Link from "next/link";

export default function Hero() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Internship[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = (internshipsData as Internship[]).filter(i => 
        i.title.toLowerCase().includes(query.toLowerCase()) ||
        i.organization.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative pt-44 pb-32 px-6 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-milk/30" />
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-purple/[0.05] rounded-full blur-[100px] animate-spotlight" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white border border-primary/5 mb-12 shadow-2xl shadow-primary/[0.02]"
        >
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
            640+ Verified High-Signal Listings Live
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl md:text-9xl font-black text-primary mb-10 tracking-tighter leading-[0.85] max-w-5xl"
        >
          Land Your <br />
          <span className="text-gradient">Dream Intent.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl text-primary/30 max-w-3xl mb-16 font-medium leading-tight tracking-tight"
        >
          The premier discovery engine for IIT, NIT, and elite corporate internships for the 2026 cycle.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-4xl relative"
          ref={searchRef}
        >
          <div className="relative group p-3 bg-white border border-primary/5 rounded-[40px] shadow-[0_32px_120px_-20px_rgba(56,25,50,0.08)] transition-all hover:border-primary/20">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
              <div className="flex-1 flex items-center px-6 py-4 gap-4">
                <Search className="w-6 h-6 text-primary/20" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  placeholder="Ask for an internship... (e.g. Google STEP 2026)"
                  className="w-full bg-transparent border-none outline-none text-xl font-bold text-primary placeholder:text-primary/10 py-2"
                />
              </div>
              <div className="h-10 w-px bg-primary/5 hidden md:block" />
              <div className="flex items-center px-6 py-4 gap-4 group/loc">
                <MapPin className="w-6 h-6 text-primary/20 group-hover/loc:text-primary/40 transition-colors" />
                <span className="text-primary/40 text-lg font-black tracking-tighter">India Hub</span>
              </div>
              <button className="bg-primary text-milk px-12 py-5 rounded-[32px] font-black text-sm uppercase tracking-widest hover:scale-[1.05] active:scale-[0.95] transition-all shadow-2xl flex items-center gap-3">
                Explore <Zap className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>

          {/* Live Search Results Dropdown */}
          <AnimatePresence>
            {isFocused && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                className="absolute top-full left-0 right-0 mt-6 p-6 bg-white border border-primary/5 rounded-[48px] shadow-2xl z-[100] text-left overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Sparkles className="w-12 h-12 text-primary" />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/20 px-6 mb-6">Top Discovery Signals</div>
                <div className="space-y-2">
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      href={`/internships/${result.id}`}
                      className="flex items-center gap-6 p-6 hover:bg-primary/[0.03] rounded-[32px] transition-all group border border-transparent hover:border-primary/5"
                      onClick={() => setIsFocused(false)}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-milk transition-all shadow-sm">
                        <Building2 className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xl font-black text-primary tracking-tight mb-1">{result.title}</div>
                        <div className="text-sm text-primary/40 font-bold uppercase tracking-widest">{result.organization}</div>
                      </div>
                      <ArrowRight className="w-6 h-6 text-primary/10 group-hover:text-primary transition-colors -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
