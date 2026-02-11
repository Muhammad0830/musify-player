import Image from "next/image";
import { Users } from "lucide-react";

interface Artist {
    id: string;
    name: string;
    image: string;
    followers: number;
}

interface ArtistItemProps {
    artist: Artist;
    onClick?: () => void;
}

export function ArtistItem({ artist, onClick }: ArtistItemProps) {
    return (
        <div
            className="group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-accent/40 transition-colors cursor-pointer"
            onClick={onClick}
        >
            <div className="relative aspect-square w-full overflow-hidden rounded-full shadow-md group-hover:scale-105 transition-transform duration-300">
                <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="text-center space-y-1">
                <h3 className="font-semibold truncate w-full max-w-[150px]">{artist.name}</h3>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <Users className="w-3 h-3" />
                    {new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(artist.followers)} Followers
                </p>
            </div>
        </div>
    );
}
