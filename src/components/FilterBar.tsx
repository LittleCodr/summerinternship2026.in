"use client";

import { motion } from "framer-motion";

const filters = ["All", "IIT", "NIT", "IIIT", "Corporate", "Govt", "Remote"];

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className="relative px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap"
        >
          {activeFilter === filter && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className={`relative z-10 ${activeFilter === filter ? "text-milk" : "text-primary/60 hover:text-primary"}`}>
            {filter}
          </span>
        </button>
      ))}
    </div>
  );
}
