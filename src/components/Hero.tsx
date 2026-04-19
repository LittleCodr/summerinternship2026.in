"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ArrowRight, Building2 } from "lucide-react";
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
    <div className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-[-5%] w-[300px] h-[300px] bg-accent-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="text-sm font-medium text-primary/80">
            640+ listings updated daily
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-primary mb-6 tracking-tight"
        >
          Your Bridge to <br />
          <span className="text-primary/60 italic">Summer Internships 2026</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-primary/60 max-w-2xl mb-12 leading-relaxed"
        >
          Discover elite internships at IITs, NITs, and top global companies. 
          Verified opportunities for the 2026 cycle — all in one high-signal place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-3xl relative"
          ref={searchRef}
        >
          <div className="relative group p-2 bg-white/50 backdrop-blur-xl border border-primary/10 rounded-3xl shadow-2xl shadow-primary/5 group-hover:border-primary/20 transition-all">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
              <div className="flex-1 flex items-center px-4 py-2 gap-3">
                <Search className="w-5 h-5 text-primary/40" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  placeholder="Try 'IIT BHU Internship' or 'Accenture'..."
                  className="w-full bg-transparent border-none outline-none text-primary placeholder:text-primary/30 py-2"
                />
              </div>
              <div className="h-8 w-px bg-primary/10 hidden md:block" />
              <div className="flex items-center px-4 py-2 gap-3">
                <MapPin className="w-5 h-5 text-primary/40" />
                <span className="text-primary/60 whitespace-nowrap">Pan India</span>
              </div>
              <button className="bg-primary text-milk px-8 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Search <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Live Search Results */}
          <AnimatePresence>
            {isFocused && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-4 p-4 bg-white border border-primary/10 rounded-[32px] shadow-2xl z-50 text-left"
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-primary/30 px-4 mb-3">Quick Results</div>
                <div className="space-y-1">
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      href={`/internships/${result.id}`}
                      className="flex items-center gap-4 p-4 hover:bg-primary/5 rounded-2xl transition-all group"
                      onClick={() => setIsFocused(false)}
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-milk transition-all">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-primary">{result.title}</div>
                        <div className="text-sm text-primary/40">{result.organization}</div>
                      </div>
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
