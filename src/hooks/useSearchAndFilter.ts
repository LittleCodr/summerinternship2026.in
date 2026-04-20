"use client";

import { useState, useMemo } from "react";

export type ContentBlock = {
  title: string;
  content: string;
  list?: string[];
};

export type Internship = {
  id: string;
  title: string;
  organization: string;
  category: string;
  location: string;
  duration: string;
  stipend: string;
  deadline: string;
  workMode: "Remote" | "Onsite" | "Hybrid";
  tags: string[];
  hubSlug?: string;
  contentBlocks?: ContentBlock[];
};

export function useSearchAndFilter(data: Internship[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFilter = activeFilter === "All" || item.category === activeFilter || (activeFilter === "Remote" && item.workMode === "Remote");

      return matchesSearch && matchesFilter;
    });
  }, [data, searchQuery, activeFilter]);

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filteredData,
  };
}
