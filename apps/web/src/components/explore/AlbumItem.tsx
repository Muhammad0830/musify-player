
import Image from "next/image";


interface Album {
    id: string;
    title: string;
    cover: string;
    artist: string;
}

interface AlbumItemProps {
    album: Album;
    onClick?: () => void;
}

export function AlbumItem({ album, onClick }: AlbumItemProps) {
    return (
        <div
            className="group flex flex-col gap-3 p-3 rounded-xl hover:bg-accent/40 transition-colors cursor-pointer"
            onClick={onClick}
        >
            <div className="relative aspect-square w-full overflow-hidden rounded-md shadow-sm group-hover:shadow-md transition-shadow">
                <Image
                    src={album.cover}
                    alt={album.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="space-y-1">
                <h3 className="font-semibold truncate text-sm" title={album.title}>{album.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{album.artist}</p>
            </div>
        </div>
    );
}
