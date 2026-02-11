
"use client";

import { useState } from "react";
import { ExploreHeader } from "@/components/explore/ExploreHeader";
import { ExploreFilters, FilterType } from "@/components/explore/ExploreFilters";
import { ExploreContent } from "@/components/explore/ExploreContent";
import { AnimatePresence, motion } from "framer-motion";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "compact">("list");
  const [activeFilter, setActiveFilter] = useState<FilterType>("Discover");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const isSearching = searchQuery.length > 0;

  return (
    <div className="h-full max-w-full! overflow-hidden p-6 overflow-y-auto no-scrollbar">
      <ExploreHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <AnimatePresence mode="wait">
        {!isSearchFocused ? (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full"
          >
            <ExploreFilters
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />

            <div className="mt-6 w-full">
              <ExploreContent
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                viewMode={viewMode}
                isSearching={false}
                searchQuery=""
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="search-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-full"
          >
            {isSearching && (
              <ExploreContent
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                viewMode={viewMode}
                isSearching={true}
                searchQuery={searchQuery}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
