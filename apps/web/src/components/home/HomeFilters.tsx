import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion } from "framer-motion"

interface HomeFiltersProps {
    genres: string[];
    selectedGenre: string | null;
    onSelectGenre: (genre: string | null) => void;
    showFavorites: boolean;
    onToggleFavorites: () => void;
}

export function HomeFilters({
    genres,
    selectedGenre,
    onSelectGenre,
    showFavorites,
    onToggleFavorites,
}: HomeFiltersProps) {
    return (
        <div className="flex gap-2 items-center justify-between w-full mb-4">
            <div className="flex p-0.5 bg-muted/20 border border-border/40 rounded-full gap-1">
                <button
                    key={"All"}
                    onClick={() => onSelectGenre(null)}
                    className={cn(
                        "relative cursor-pointer px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full",
                        selectedGenre === null ? "text-white" : "text-muted-foreground hover:text-foreground"
                    )}
                    data-state={selectedGenre === null ? "active" : "inactive"}
                    style={{
                        WebkitTapHighlightColor: "transparent",
                    }}
                >
                    {selectedGenre === null && (
                        <motion.div
                            layoutId="selectedGenre"
                            className="absolute inset-0 bg-primary rounded-full shadow-sm"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">All</span>
                </button>
                {genres.map((genre) => (
                    <button
                        key={genre}
                        onClick={() => onSelectGenre(genre)}
                        className={cn(
                            "relative cursor-pointer px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full",
                            selectedGenre === genre ? "text-white" : "text-muted-foreground hover:text-foreground"
                        )}
                        data-state={selectedGenre === genre ? "active" : "inactive"}
                        style={{
                            WebkitTapHighlightColor: "transparent",
                        }}
                    >
                        {selectedGenre === genre && (
                            <motion.div
                                layoutId="selectedGenre"
                                className="absolute inset-0 bg-primary rounded-full shadow-sm"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{genre}</span>
                    </button>
                ))}
            </div>

            <div className="ml-auto border-l pl-4 border-border">
                <Button
                    variant={showFavorites ? "default" : "outline"}
                    size="sm"
                    onClick={onToggleFavorites}
                    className={cn("gap-2 border cursor-pointer", showFavorites ? "border-primary text-white" : "border-input")}
                >
                    Favourites
                    <div className={cn("h-4 w-4 border rounded-sm flex items-center justify-center", showFavorites ? "border-primary-foreground bg-primary-foreground text-primary" : "border-muted-foreground")}>
                        {showFavorites && <Check className="h-3 w-3" />}
                    </div>
                </Button>
            </div>
        </div>
    );
}
