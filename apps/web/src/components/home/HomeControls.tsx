import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutGrid, List, ListMusic, Search, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list" | "compact";
type SortOption = "date_added" | "alphabetical" | "artist" | "duration";

interface HomeControlsProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    sortBy: SortOption;
    setSortBy: (sort: SortOption) => void;
}

// Inline Input component since it was missing
function SearchInput({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Type to search musics"
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9"
            />
        </div>
    )
}

export function HomeControls({
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
}: HomeControlsProps) {
    const sortLabels: Record<SortOption, string> = {
        date_added: "Latest added",
        alphabetical: "Alphabetical",
        artist: "Artist",
        duration: "Duration",
    };

    return (
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
            <div className="flex-1 items-stretch">
                <SearchInput value={searchQuery} onChange={setSearchQuery} />
            </div>

            <div className="flex gap-2">
                {/* Sort Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="sm:w-[180px] w-[150px] sm:text-sm text-xs h-10 justify-between">
                            {sortLabels[sortBy]}
                            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="sm:w-[180px] w-[150px]">
                        {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                            <DropdownMenuItem key={option} onClick={() => setSortBy(option)}>
                                <span className={cn("flex-1  sm:text-sm text-xs", sortBy === option && "font-medium")}>{sortLabels[option]}</span>
                                {sortBy === option && <Check className="ml-2 h-4 w-4" />}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* View Toggle */}
                <div className="flex items-center border rounded-md p-1 gap-1 bg-muted/50">
                    <Button
                        variant={"default"}
                        size="icon"
                        className={cn("h-8 w-8 bg-transparent cursor-pointer text-foreground hover:bg-foreground/10", viewMode === "grid" && "bg-foreground/10")}
                        onClick={() => setViewMode("grid")}
                    >
                        <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={"default"}
                        size="icon"
                        className={cn("h-8 w-8 bg-transparent cursor-pointer text-foreground hover:bg-foreground/10", viewMode === "list" && "bg-foreground/10")}
                        onClick={() => setViewMode("list")}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={"default"}
                        size="icon"
                        className={cn("h-8 w-8 bg-transparent cursor-pointer text-foreground hover:bg-foreground/10", viewMode === "compact" && "bg-foreground/10")}
                        onClick={() => setViewMode("compact")}
                    >
                        <ListMusic className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
