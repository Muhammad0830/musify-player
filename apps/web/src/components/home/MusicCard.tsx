import { Music } from "@/types/music";
import { Play, Heart, MoreVertical, ListPlus, Pencil, Trash2, ListMusic } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface MusicCardProps {
    music: Music;
    onPlay: (music: Music) => void;
    onToggleFavorite: (music: Music) => void;
}

export function MusicCard({ music, onPlay, onToggleFavorite }: MusicCardProps) {
    return (
        <div className="group relative w-full rounded-md bg-primary-background/70 backdrop-blur-sm border border-foreground/10 p-3 hover:bg-primary-background transition-colors">
            <div className="relative aspect-square w-full overflow-hidden rounded-md">
                <Image
                    src={music.albumCover}
                    alt={music.title}
                    fill
                    className="object-cover transition-all group-hover:scale-105 group-hover:brightness-50"
                />

                {/* Hover Overlay Buttons */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                        size="icon"
                        className="rounded-full bg-primary hover:bg-primary text-primary-foreground h-12 w-12"
                        onClick={() => onPlay(music)}
                    >
                        <Play className="h-6 w-6 fill-current" />
                    </Button>
                </div>

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:text-white hover:bg-black/40 border border-transparent hover:border-white/30 dark:hover:border-white/10 transition-colors duration-200 rounded-full cursor-pointer">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer" onClick={(e) => e.stopPropagation()}>
                                <ListMusic className="mr-2 h-4 w-4" /> Play next
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={(e) => e.stopPropagation()}>
                                <ListPlus className="mr-2 h-4 w-4" /> Add to playlist
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={(e) => e.stopPropagation()}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer" onClick={(e) => e.stopPropagation()}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                        size="icon"
                        variant="ghost"
                        className={cn("h-8 w-8 text-white hover:text-white hover:bg-black/40 border border-transparent hover:border-white/30 dark:hover:border-white/10 transition-colors duration-200 rounded-full cursor-pointer", music.isFavorite && "text-red-500 hover:text-red-500")}
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(music);
                        }}
                    >
                        <Heart className={cn("h-4 w-4", music.isFavorite && "fill-current")} />
                    </Button>
                </div>
            </div>

            <div className="mt-3 space-y-1">
                <h3 className="font-semibold leading-none truncate">{music.title}</h3>
                <p className="text-sm text-muted-foreground 1runcate">{music.author}</p>
            </div>
        </div>
    );
}
