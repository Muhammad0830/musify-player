
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type FilterType = "Discover" | "Trending" | "Top Global" | "Browse by Genre" | "Top Artists" | "New Releases";

interface ExploreFiltersProps {
    activeFilter: FilterType;
    setActiveFilter: (filter: FilterType) => void;
}

const filters: FilterType[] = ["Discover", "Trending", "Top Global", "Browse by Genre", "Top Artists", "New Releases"];

export function ExploreFilters({ activeFilter, setActiveFilter }: ExploreFiltersProps) {
    return (
        <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
            <div className="flex p-1 bg-muted/20 border border-border/40 rounded-full gap-1">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={cn(
                            "relative cursor-pointer px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full",
                            activeFilter === filter ? "text-white" : "text-muted-foreground hover:text-foreground"
                        )}
                        data-state={activeFilter === filter ? "active" : "inactive"}
                        style={{
                            WebkitTapHighlightColor: "transparent",
                        }}
                    >
                        {activeFilter === filter && (
                            <motion.div
                                layoutId="activeFilter"
                                className="absolute inset-0 bg-primary rounded-full shadow-sm"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{filter}</span>
                    </button>
                ))}
            </div>
        </div >
    );
}
