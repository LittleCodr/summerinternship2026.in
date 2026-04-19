"use client";

import { motion } from "framer-motion";
import { GraduationCap, Landmark, Building2, Beaker, Banknote, Globe } from "lucide-react";

const categories = [
  { id: "IIT", name: "IIT Internships", icon: GraduationCap, count: "120+", color: "bg-blue-50" },
  { id: "NIT", name: "NIT Internships", icon: Landmark, count: "240+", color: "bg-green-50" },
  { id: "IIIT", name: "IIIT Internships", icon: Building2, count: "80+", color: "bg-purple-50" },
  { id: "Corporate", name: "Corporate Roles", icon: Banknote, count: "150+", color: "bg-emerald-50" },
  { id: "Remote", name: "Remote", icon: Globe, count: "40+", color: "bg-rose-50" },
  { id: "Govt", name: "Govt Roles", icon: Beaker, count: "50+", color: "bg-amber-50" },
];

export default function CategoryExplorer({ 
  onCategorySelect 
}: { 
  onCategorySelect?: (category: string) => void 
}) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12" id="institutes">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-2">Explore Categories</h2>
          <p className="text-primary/60">Curated opportunities grouped by institution and type.</p>
        </div>
        <button className="text-primary font-semibold flex items-center gap-1 group">
          View all <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >→</motion.span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            onClick={() => onCategorySelect?.(category.id)}
            className={`p-6 rounded-3xl border border-primary/5 hover:border-primary/20 transition-all cursor-pointer group flex flex-col items-center text-center ${category.color}`}
          >
            <div className="p-3 rounded-2xl bg-white mb-4 shadow-sm group-hover:shadow-md transition-shadow">
              <category.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-primary mb-1">{category.name}</h3>
            <span className="text-sm text-primary/40">{category.count} listings</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
