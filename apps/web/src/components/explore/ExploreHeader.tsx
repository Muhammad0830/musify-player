import { Button } from "@/components/ui/button";
import { Search, LayoutGrid, List, ListMusic } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface ExploreHeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    isSearchFocused: boolean;
    setIsSearchFocused: (focused: boolean) => void;
    viewMode: "grid" | "list" | "compact";
    setViewMode: (mode: "grid" | "list" | "compact") => void;
}

export function ExploreHeader({
    searchQuery,
    setSearchQuery,
    isSearchFocused,
    setIsSearchFocused,
    viewMode,
    setViewMode,
}: ExploreHeaderProps) {
    return (
        <div className="flex flex-col gap-6 mb-8 relative z-50">
            <AnimatePresence>
                {!isSearchFocused && <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.15 }}
                    layout
                    key={"header-title"}
                    className={cn("transition-all duration-300", isSearchFocused ? "opacity-50 blur-[1px]" : "opacity-100")}>
                    <h1 className="text-3xl font-bold tracking-tight">Explore</h1>
                    <p className="text-muted-foreground mt-1">Discover new music around the world</p>
                </motion.div>}

                <motion.div layout key={"search-input"} className="flex flex-col sm:flex-row gap-2 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className={cn("absolute z-1 left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors", isSearchFocused ? "text-primary" : "text-muted-foreground")} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => {
                                // Only lose focus state if empty, or perhaps specific logic?
                                // User requirement: "unfocused again the all component should fade in from bottom"
                                if (!searchQuery) {
                                    setIsSearchFocused(false);
                                }
                            }}
                            placeholder="What do you want to listen to?"
                            className={cn(
                                "flex h-12 w-full rounded-lg border bg-background px-3 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm",
                                isSearchFocused ? "border-primary shadow-md w-full scale-[1.00]" : "border-input scale-100"
                            )}
                        />
                    </div>

                    {/* View Toggle - fade out when searching */}
                    <motion.div
                        className="flex items-center border rounded-md p-2 gap-1 bg-muted/50 h-12"
                        // animate={{ opacity: isSearchFocused ? 0 : 1, pointerEvents: isSearchFocused ? "none" : "auto" }}
                        transition={{ duration: 0.2 }}
                    >
                        <Button
                            variant={"ghost"}
                            size="icon"
                            className={cn("h-8 w-8", viewMode === "grid" && "bg-background shadow-sm")}
                            onClick={() => setViewMode("grid")}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={"ghost"}
                            size="icon"
                            className={cn("h-8 w-8", viewMode === "list" && "bg-background shadow-sm")}
                            onClick={() => setViewMode("list")}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={"ghost"}
                            size="icon"
                            className={cn("h-8 w-8", viewMode === "compact" && "bg-background shadow-sm")}
                            onClick={() => setViewMode("compact")}
                        >
                            <ListMusic className="h-4 w-4" />
                        </Button>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
