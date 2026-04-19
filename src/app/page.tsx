"use client";

import Hero from "@/components/Hero";
import CategoryExplorer from "@/components/CategoryExplorer";
import FilterBar from "@/components/FilterBar";
import InternshipCard from "@/components/InternshipCard";
import { useSearchAndFilter } from "@/hooks/useSearchAndFilter";
import internshipsData from "@/data/internships.json";
import { type Internship } from "@/hooks/useSearchAndFilter";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { 
    activeFilter, 
    setActiveFilter, 
    filteredData,
    searchQuery,
    setSearchQuery 
  } = useSearchAndFilter(internshipsData as Internship[]);

  return (
    <main className="min-h-screen">
      <Hero />
      
      <CategoryExplorer />

      <section className="max-w-7xl mx-auto px-6 py-12" id="explorer">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-1">Live Opportunities</h2>
            <p className="text-primary/40">Showing {filteredData.length} curated listings for 2026</p>
          </div>
          
          <FilterBar 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredData.map((internship) => (
              <InternshipCard 
                key={internship.id} 
                internship={internship} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredData.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">No matching internships</h3>
            <p className="text-primary/40">Try adjusting your filters or search terms.</p>
            <button 
              onClick={() => { setActiveFilter("All"); setSearchQuery(""); }}
              className="mt-6 text-primary font-bold underline underline-offset-4"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </section>
    </main>
  );
}
