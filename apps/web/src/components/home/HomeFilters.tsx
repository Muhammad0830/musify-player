import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

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
        <div className="flex flex-wrap items-center gap-2 mb-6">
            <Button
                variant={"ghost"}
                size="sm"
                onClick={() => onSelectGenre(null)}
                className={cn("rounded-md cursor-pointer hover:bg-primary!", selectedGenre === null && "bg-primary")}
            >
                All
            </Button>

            {genres.map((genre) => (
                <Button
                    key={genre}
                    variant={"ghost"}
                    size="sm"
                    onClick={() => onSelectGenre(genre)}
                    className={cn("rounded-md bg-secondary cursor-pointer hover:bg-primary!", selectedGenre === genre && "bg-primary")}
                >
                    {genre}
                </Button>
            ))}

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
