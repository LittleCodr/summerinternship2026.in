"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, X, Building2, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import internshipsData from "@/data/internships.json";
import { Internship } from "@/hooks/useSearchAndFilter";
import Link from "next/link";

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Internship[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = (internshipsData as Internship[]).filter(i => 
        i.title.toLowerCase().includes(query.toLowerCase()) ||
        i.organization.toLowerCase().includes(query.toLowerCase()) ||
        i.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 8);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  // Handle Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose(); // Toggle if already open, but here it's easier to just call the parent toggle
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/40 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden border border-primary/5"
          >
            <div className="flex items-center gap-4 p-8 border-b border-primary/5 bg-primary/[0.02]">
              <Search className="w-6 h-6 text-primary/40" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search across 640+ elite internships..."
                className="flex-1 bg-transparent border-none outline-none text-xl font-bold text-primary placeholder:text-primary/20"
              />
              <div className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg border border-primary/5 text-[10px] font-black tracking-widest text-primary/40 shadow-sm">
                <Command className="w-3 h-3" /> K
              </div>
              <button onClick={onClose} className="p-2 hover:bg-primary/5 rounded-xl transition-all">
                <X className="w-5 h-5 text-primary/20" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
              {results.length > 0 ? (
                <div className="space-y-2">
                  <div className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary/20">Top Matches</div>
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      href={`/internships/${result.id}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-4 hover:bg-primary/5 rounded-3xl transition-all group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-milk transition-all">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-primary text-lg">{result.title}</div>
                        <div className="text-sm text-primary/40 font-medium">{result.organization} • {result.location}</div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-primary/20 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </Link>
                  ))}
                </div>
              ) : query.length > 1 ? (
                <div className="py-20 text-center">
                  <div className="text-4xl mb-4">🔍</div>
                  <div className="text-xl font-bold text-primary mb-2">No signals found</div>
                  <div className="text-sm text-primary/40">Try searching for "IIT", "Marketing" or "Remote"</div>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary/20 px-4">Trending Explorations</div>
                  <div className="grid grid-cols-2 gap-2">
                    {["IIT Summer Internships", "Google STEP 2026", "Corporate Strategy", "Remote Dev Roles"].map((val) => (
                      <button 
                        key={val}
                        onClick={() => setQuery(val.split(" ")[0])}
                        className="p-4 text-left bg-primary/[0.02] hover:bg-primary/5 rounded-2xl border border-primary/5 transition-all font-bold text-primary/60 text-sm"
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-primary text-milk/40 text-[10px] font-black uppercase tracking-widest flex justify-between items-center">
              <div className="flex gap-4">
                <span>↑↓ Navigate</span>
                <span>Enter Select</span>
              </div>
              <div className="flex gap-4">
                <span>Esc Close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
