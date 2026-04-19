"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Command } from "lucide-react";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[150] w-[95%] max-w-5xl">
        <div className="bg-white/80 backdrop-blur-3xl border border-primary/5 px-8 py-4 rounded-[32px] shadow-2xl shadow-primary/5 flex items-center justify-between group">
          <Link href="/" className="flex items-center gap-2.5 outline-none">
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-3 group-hover:rotate-0 transition-all">
              <img src="/logo.svg" alt="Logo" className="w-7 h-7" />
            </div>
            <span className="font-black text-xl text-primary tracking-tighter">SummerInterns<span className="opacity-30">.in</span></span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-10 text-xs font-black uppercase tracking-widest text-primary/40">
            <a href="/#explorer" className="hover:text-primary transition-all hover:scale-105">Explorer</a>
            <a href="/#institutes" className="hover:text-primary transition-all hover:scale-105">Institutes</a>
            <a href="/about" className="hover:text-primary transition-all hover:scale-105">Our Story</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-2xl border border-primary/5 text-[10px] font-black uppercase tracking-widest text-primary/40 hover:bg-primary/10 transition-all border-dashed border-primary/20"
            >
              <Search className="w-4 h-4" />
              Search
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white rounded-md border border-primary/5 text-[8px] font-black opacity-60">
                <Command className="w-2.5 h-2.5" /> K
              </div>
            </button>
            <button className="bg-primary text-milk px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-xl shadow-primary/20">
              Waitlist
            </button>
          </div>
        </div>
      </nav>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
