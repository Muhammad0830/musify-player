import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MusicListItem } from "@/components/home/MusicListItem";
import { ArtistItem } from "./ArtistItem";
import { AlbumItem } from "./AlbumItem";
import { FilterType } from "./ExploreFilters";
import { Music } from "@/types/music";
import { Button } from "@/components/ui/button";
import { MusicCard } from "../home/MusicCard";

// Mock Data
const MOCK_TRENDING: Music[] = Array.from({ length: 5 }).map((_, i) => ({
    id: `trend-${i}`,
    title: `Trending Song ${i + 1}`,
    author: `Famous Artist ${i + 1}`,
    albumCover: "/song_album_image.jfif",
    duration: "3:45",
    isFavorite: i % 2 === 0,
    playCount: 1000000 + i * 50000,
    genre: "Pop",
    addedAt: "2 days ago",
    createdAt: new Date().toISOString()
}));

const MOCK_ARTISTS = Array.from({ length: 6 }).map((_, i) => ({
    id: `art-${i}`,
    name: `Top Artist ${i + 1}`,
    image: "/artists_image.jfif",
    followers: 5000000 + i * 100000,
}));

const MOCK_ALBUMS = Array.from({ length: 6 }).map((_, i) => ({
    id: `alb-${i}`,
    title: `New Album ${i + 1}`,
    cover: "/song_album_image.jfif",
    artist: `Artist ${i + 1}`,
}));

interface ExploreContentProps {
    activeFilter: FilterType;
    setActiveFilter: (filter: FilterType) => void;
    viewMode: "grid" | "list" | "compact";
    isSearching: boolean;
    searchQuery: string;
    selectedGenre: string | null;
    setSelectedGenre: (genre: string | null) => void;
}

export function ExploreContent({
    activeFilter,
    setActiveFilter,
    viewMode,
    isSearching,
    searchQuery,
    selectedGenre,
    setSelectedGenre
}: ExploreContentProps) {
    const [isLoading, setIsLoading] = useState(false);

    const genres = ["Pop", "Rock", "Hip Hop", "Jazz", "Electronic", "Classical"];
    const genreColors: Record<string, string> = {
        "Pop": "bg-pink-500/20 text-pink-500 border-pink-500/50 hover:bg-pink-500/30",
        "Rock": "bg-red-500/20 text-red-500 border-red-500/50 hover:bg-red-500/30",
        "Hip Hop": "bg-orange-500/20 text-orange-500 border-orange-500/50 hover:bg-orange-500/30",
        "Jazz": "bg-blue-500/20 text-blue-500 border-blue-500/50 hover:bg-blue-500/30",
        "Electronic": "bg-purple-500/20 text-purple-500 border-purple-500/50 hover:bg-purple-500/30",
        "Classical": "bg-yellow-500/20 text-yellow-500 border-yellow-500/50 hover:bg-yellow-500/30",
    };

    // Update loading state when searching
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isSearching) {
            setIsLoading(true); // eslint-disable-line
            timer = setTimeout(() => setIsLoading(false), 1000); // Mock network delay
        }
        return () => clearTimeout(timer);
    }, [searchQuery, isSearching]);

    if (isSearching) {
        return (
            <div className="space-y-6">
                <h2 className="text-xl font-semibold">Search Results for &quot;{searchQuery}&quot;</h2>
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid gap-2">
                        {MOCK_TRENDING.map((music, i) => (
                            <MusicListItem
                                key={music.id}
                                music={music}
                                index={i}
                                variant={viewMode === "compact" ? "compact" : "default"}
                                onPlay={() => { }}
                                onToggleFavorite={() => { }}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    const renderSectionHeader = (title: string, onSeeMore?: () => void) => (
        <div className="flex justify-between items-center mb-4 mt-8 first:mt-0">
            <h2 className="text-xl font-bold">{title}</h2>
            {onSeeMore && (
                <Button variant="link" className="text-primary" onClick={onSeeMore}>
                    See more
                </Button>
            )}
        </div>
    );

    return (
        <div className="space-y-8 w-full pb-20 flex flex-col">
            {/* Discover View (Mixed) */}
            {activeFilter === "Discover" && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full"
                >
                    {/* Trending */}
                    {renderSectionHeader("Trending Now", () => setActiveFilter("Trending"))}
                    <div className={viewMode === "grid"
                        ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                        : "flex flex-col gap-1"
                    }>
                        {MOCK_TRENDING.slice(0, 5).map((music, i) => (
                            <div key={i}>{
                                viewMode === "grid" ? <MusicCard
                                    key={music.id}
                                    music={music}
                                    onPlay={() => { }}
                                    onToggleFavorite={() => { }}
                                /> : <MusicListItem
                                    key={music.id}
                                    music={music}
                                    index={i}
                                    variant={viewMode === "compact" ? "compact" : "default"}
                                    onPlay={() => { }}
                                    onToggleFavorite={() => { }}
                                />
                            }</div>
                        ))}
                    </div>

                    {/* Top Global */}
                    {renderSectionHeader("Top Global", () => setActiveFilter("Top Global"))}
                    <div className={viewMode === "grid"
                        ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                        : "flex flex-col gap-1"
                    }>
                        {MOCK_TRENDING.slice(0, 5).map((music, i) => (
                            <div key={i}>{
                                viewMode === "grid" ? <MusicCard
                                    key={music.id}
                                    music={music}
                                    onPlay={() => { }}
                                    onToggleFavorite={() => { }}
                                /> : <MusicListItem
                                    key={music.id}
                                    music={music}
                                    index={i}
                                    variant={viewMode === "compact" ? "compact" : "default"}
                                    onPlay={() => { }}
                                    onToggleFavorite={() => { }}
                                />
                            }</div>
                        ))}
                    </div>

                    {/* Popular Genres */}
                    <div className="mt-8">
                        <h2 className="text-xl font-bold mb-4">Popular Genres</h2>
                        <div className="flex gap-4 pb-4">
                            {genres.slice(0, 5).map(genre => (
                                <button
                                    key={genre}
                                    onClick={() => {
                                        setActiveFilter("Browse by Genre");
                                        setSelectedGenre(genre);
                                    }}
                                    className={`min-w-[120px] h-[80px] cursor-pointer rounded-xl border flex items-center justify-center font-bold text-lg transition-all transform hover:scale-105 ${genreColors[genre] || "bg-muted text-foreground border-border"}`}
                                >
                                    {genre}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Top Artists */}
                    {renderSectionHeader("Top Artists", () => setActiveFilter("Top Artists"))}
                    <div className="flex w-full gap-4 overflow-x-auto pb-4 no-scrollbar">
                        {MOCK_ARTISTS.map((artist, i) => (
                            <div key={`artist-disc-${i}`} className="min-w-[140px] max-[1440px]:flex-1">
                                <ArtistItem artist={artist} />
                            </div>
                        ))}
                    </div>

                    {/* New Releases */}
                    {renderSectionHeader("New Releases", () => setActiveFilter("New Releases"))}
                    <div className="flex gap-4 w-full overflow-x-auto pb-4 no-scrollbar">
                        {MOCK_ALBUMS.map((album, i) => {
                            if (i > 5) return
                            return (
                                <div key={`album-disc-${i}`} className="min-w-[140px] max-[1440px]:flex-1">
                                    <AlbumItem album={album} />
                                </div>
                            )
                        })}
                    </div>
                </motion.div>
            )}

            {/* Specific Filter Views */}
            {activeFilter === "Trending" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
                    <div className={viewMode === "grid"
                        ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                        : "flex flex-col gap-1"
                    }>
                        {MOCK_TRENDING.concat(MOCK_TRENDING).map((music, i) => (
                            <div key={i}>{
                                viewMode === "grid" ? <MusicCard
                                    key={music.id}
                                    music={music}
                                    onPlay={() => { }}
                                    onToggleFavorite={() => { }}
                                /> : <MusicListItem
                                    key={music.id}
                                    music={music}
                                    index={i}
                                    variant={viewMode === "compact" ? "compact" : "default"}
                                    onPlay={() => { }}
                                    onToggleFavorite={() => { }}
                                />
                            }</div>
                        ))}
                    </div>
                </motion.div>
            )}

            {activeFilter === "Top Global" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-2xl font-bold mb-6">Top 50 - Global</h2>
                    <div className={viewMode === "grid"
                        ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                        : "flex flex-col gap-1"
                    }>
                        {MOCK_TRENDING.concat(MOCK_TRENDING).map((music, i) => (
                            <div key={i}>{
                                viewMode === "grid" ? <MusicCard
                                    key={music.id}
                                    music={music}
                                    onPlay={() => { }}
                                    onToggleFavorite={() => { }}
                                /> : <MusicListItem
                                    key={music.id}
                                    music={music}
                                    index={i}
                                    variant={viewMode === "compact" ? "compact" : "default"}
                                    onPlay={() => { }}
                                    onToggleFavorite={() => { }}
                                />
                            }</div>
                        ))}
                    </div>
                </motion.div>
            )}

            {activeFilter === "Top Artists" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {MOCK_ARTISTS.concat(MOCK_ARTISTS).map((artist, i) => (
                            <ArtistItem key={`artist-view-${i}`} artist={artist} />
                        ))}
                    </div>
                </motion.div>
            )}

            {activeFilter === "New Releases" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {MOCK_ALBUMS.concat(MOCK_ALBUMS).map((album, i) => (
                            <AlbumItem key={`album-view-${i}`} album={album} />
                        ))}
                    </div>
                </motion.div>
            )}

            {activeFilter === "Browse by Genre" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {/* Genre Tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {genres.map(genre => (
                            <Button
                                key={genre}
                                variant={selectedGenre === genre ? "default" : "outline"}
                                onClick={() => setSelectedGenre(genre)}
                                className="rounded-full cursor-pointer"
                            >
                                {genre}
                            </Button>
                        ))}
                    </div>

                    <h3 className="text-xl font-semibold mb-4">{selectedGenre || "All Genres"} - Most Played</h3>
                    <div className="grid gap-2">
                        {MOCK_TRENDING.map((music, i) => (
                            <MusicListItem
                                key={`genre-${i}`}
                                music={{ ...music, genre: selectedGenre || "Pop" }}
                                index={i}
                                variant={viewMode === "compact" ? "compact" : "default"}
                                onPlay={() => { }}
                                onToggleFavorite={() => { }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
