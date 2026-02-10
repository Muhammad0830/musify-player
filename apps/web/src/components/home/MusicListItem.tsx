import { Music } from "@/types/music";
import { Play, Heart, MoreVertical, ListPlus, Pencil, Trash2, ListMusic, Pause, AudioLines } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface MusicListItemProps {
    music: Music;
    index: number;
    variant: "default" | "compact";
    isPlaying?: boolean;
    onPlay: (music: Music) => void;
    onToggleFavorite: (music: Music) => void;
}

export function MusicListItem({ music, index, variant, isPlaying, onPlay, onToggleFavorite }: MusicListItemProps) {
    const isCompact = variant === "compact";

    return (
        <div
            className={cn(
                "group flex items-center w-full hover:bg-accent/50 transition-colors rounded-md",
                isCompact ? "p-1 gap-2" : "p-2 gap-4 border-b border-border/40 last:border-0"
            )}
        >
            {/* Index / Play Icon */}
            <div className="flex-none w-8 flex justify-center text-muted-foreground text-sm font-medium">
                <span className="group-hover:hidden block">
                    {isPlaying ? <AudioLines className="h-4 w-4 text-primary animate-pulse" /> : index + 1}
                </span>
                <Button
                    size="icon"
                    variant="ghost"
                    className="hidden group-hover:flex h-6 w-6"
                    onClick={() => onPlay(music)}
                >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
            </div>

            {/* Image */}
            <div className={cn("relative overflow-hidden rounded-md flex-none", isCompact ? "h-8 w-8" : "h-12 w-12")}>
                <Image
                    src={music.albumCover}
                    alt={music.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 grid gap-0.5">
                <h3 className={cn("font-medium truncate", isCompact ? "text-sm" : "text-base")}>
                    {music.title}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                    {music.author}
                </p>
                {!isCompact && (
                    <p className="text-xs text-muted-foreground truncate hidden sm:block">
                        {music.genre}
                    </p>
                )}
            </div>

            {/* Duration & Actions */}
            <div className="flex items-center gap-2">
                {/* Plays Count */}
                {!isCompact && (
                    <span className="text-xs text-muted-foreground mr-4 hidden sm:block w-20 text-center">
                        {music.playCount} plays
                    </span>
                )}

                {/* Duration */}
                <span className="text-xs text-muted-foreground mr-2 w-10 text-right">{music.duration}</span>

                <Button
                    size="icon"
                    variant="ghost"
                    className={cn("h-8 w-8 text-muted-foreground hover:text-primary rounded-full transition-opacity cursor-pointer", music.isFavorite && "text-red-500 hover:text-red-500")}
                    onClick={() => onToggleFavorite(music)}
                >
                    <Heart className={cn("h-4 w-4", music.isFavorite && "fill-current")} />
                </Button>


                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full transition-opacity cursor-pointer">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <ListMusic className="mr-2 h-4 w-4" /> Play next
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <ListPlus className="mr-2 h-4 w-4" /> Add to playlist
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
