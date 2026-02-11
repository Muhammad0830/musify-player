import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Heart, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

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
    const [maxVisible, setMaxVisible] = useState(5);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 500) setMaxVisible(3);
            else if (width < 640) setMaxVisible(4);
            else if (width < 768) setMaxVisible(5);
            else if (width < 1024) setMaxVisible(4);
            else setMaxVisible(8)
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const allItem = { id: "All", label: "All", value: null as string | null };

    const genreItems: { id: string; label: string; value: string | null }[] = genres.map(g => ({ id: g, label: g, value: g }));

    let visibleItems: typeof genreItems = [];
    let overflowItems: typeof genreItems = [];
    visibleItems.push(allItem);

    const allItems = [allItem, ...genreItems];

    if (allItems.length <= maxVisible) {
        visibleItems = allItems;
    } else {
        visibleItems = allItems.slice(0, maxVisible - 1);
        overflowItems = allItems.slice(maxVisible - 1);
    }

    const isOverflowSelected = overflowItems.some(
        (item) => item.value === selectedGenre
    ) && selectedGenre !== null;

    return (
        <div className="flex gap-2 items-center justify-between w-full mb-4">
            <div className="flex p-0.5 bg-muted/20 border border-border/40 rounded-full gap-1">
                {visibleItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onSelectGenre(item.value)}
                        className={cn(
                            "relative cursor-pointer px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full whitespace-nowrap",
                            selectedGenre === item.value ? "text-white" : "text-muted-foreground hover:text-foreground"
                        )}
                        data-state={selectedGenre === item.value ? "active" : "inactive"}
                        style={{
                            WebkitTapHighlightColor: "transparent",
                        }}
                    >
                        {selectedGenre === item.value && (
                            <motion.div
                                layoutId="selectedGenre"
                                className="absolute inset-0 bg-primary rounded-full shadow-sm"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{item.label}</span>
                    </button>
                ))}

                {overflowItems.length > 0 && (
                    <div className="relative">
                        {isOverflowSelected && (
                            <motion.div
                                layoutId="selectedGenre"
                                className="absolute inset-0 bg-primary rounded-full shadow-sm"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    style={{
                                        WebkitTapHighlightColor: "transparent",
                                    }}
                                    className={cn(
                                        "relative cursor-pointer px-2 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full flex items-center justify-center w-[40px]",
                                        isOverflowSelected
                                            ? "text-primary bg-primary/10"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <MoreHorizontal className={cn("size-5", isOverflowSelected ? "text-white" : "text-muted-foreground")} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="max-h-[300px] overflow-y-auto">
                                {overflowItems.map((item) => (
                                    <DropdownMenuItem
                                        key={item.id}
                                        onClick={() => onSelectGenre(item.value)}
                                    >
                                        {item.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
            </div>

            <div className="ml-auto border-l pl-4 border-border hidden sm:block">
                <Button
                    variant={showFavorites ? "default" : "outline"}
                    size="sm"
                    onClick={onToggleFavorites}
                    className={cn("gap-2 border border-border/40! cursor-pointer", showFavorites ? "border-primary text-white" : "border-input")}
                >
                    Favourites
                    <div className={cn("h-4 w-4 border rounded-sm flex items-center justify-center", showFavorites ? "border-primary-foreground bg-primary-foreground text-primary" : "border-muted-foreground")}>
                        {showFavorites && <Check className="h-3 w-3" />}
                    </div>
                </Button>
            </div>
            <div className="sm:hidden">
                <Button
                    variant={showFavorites ? "default" : "outline"}
                    size="icon"
                    className={cn("rounded-full border  border-border/40! h-9 w-9 bg-secondary text-foreground", showFavorites && "text-white bg-primary")}
                    onClick={onToggleFavorites}
                >
                    <Heart className="size-4.5" />
                </Button>
            </div>
        </div>
    );
}
