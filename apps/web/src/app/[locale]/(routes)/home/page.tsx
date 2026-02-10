"use client";

import { useState, useMemo } from "react";
import { HomeHeader } from "../../../../components/home/HomeHeader";
import { HomeControls } from "../../../../components/home/HomeControls";
import { HomeFilters } from "../../../../components/home/HomeFilters";
import { MusicCard } from "../../../../components/home/MusicCard";
import { MusicListItem } from "../../../../components/home/MusicListItem";
import { Music } from "@/types/music";

// Mock Data
const MOCK_MUSIC: Music[] = [
  {
    id: "1",
    title: "Midnight Dream",
    author: "Luna Nova",
    albumCover: "/song_album_image.jfif",
    duration: "3:45",
    genre: "Electronic",
    playCount: 1250,
    createdAt: "2023-11-01T10:00:00Z",
    isFavorite: true,
  },
  {
    id: "2",
    title: "Ocean Waves",
    author: "Coastal Vibes",
    albumCover: "/song_album_image.jfif",
    duration: "4:20",
    genre: "Ambient",
    playCount: 890,
    createdAt: "2023-10-15T14:30:00Z",
    isFavorite: false,
  },
  {
    id: "3",
    title: "Urban Pulse",
    author: "City Lights",
    albumCover: "/song_album_image.jfif",
    duration: "2:55",
    genre: "Hip-Hop",
    playCount: 3400,
    createdAt: "2023-12-01T09:15:00Z",
    isFavorite: true,
  },
  {
    id: "4",
    title: "Neon Nights",
    author: "Synthwave Boy",
    albumCover: "/song_album_image.jfif",
    duration: "3:10",
    genre: "Electronic",
    playCount: 2100,
    createdAt: "2023-11-20T18:45:00Z",
    isFavorite: false,
  },
  {
    id: "5",
    title: "Golden Hour",
    author: "Sunset Collective",
    albumCover: "/song_album_image.jfif",
    duration: "3:50",
    genre: "Pop",
    playCount: 1500,
    createdAt: "2023-09-05T12:00:00Z",
    isFavorite: false,
  },
  {
    id: "6",
    title: "Deep Dive",
    author: "Aqua Sound",
    albumCover: "/song_album_image.jfif",
    duration: "5:12",
    genre: "Ambient",
    playCount: 600,
    createdAt: "2023-10-01T08:30:00Z",
    isFavorite: true,
  },
  {
    id: "7",
    title: "Rock Solid",
    author: "The Stones",
    albumCover: "/song_album_image.jfif",
    duration: "4:05",
    genre: "Rock",
    playCount: 5000,
    createdAt: "2023-08-20T16:20:00Z",
    isFavorite: true,
  }
];

const GENRES = ["Mixed", "Electronic", "Rock", "Pop", "Hip-Hop", "Jazz", "Classical", "Ambient", "Metal", "Dance"];

export default function HomePage() {
  const [musics, setMusics] = useState<Music[]>(MOCK_MUSIC);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "compact">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date_added" | "alphabetical" | "artist" | "duration">("date_added");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [playingMusicId, setPlayingMusicId] = useState<string | null>(null);

  const toggleFavorite = (music: Music) => {
    setMusics(prev => prev.map(m => m.id === music.id ? { ...m, isFavorite: !m.isFavorite } : m));
  };

  const handlePlay = (music: Music) => {
    if (playingMusicId === music.id) {
      setPlayingMusicId(null); // Pause
    } else {
      setPlayingMusicId(music.id); // Play
    }
  };

  const filteredAndSortedMusics = useMemo(() => {
    let result = [...musics];

    // Filter by genre
    if (selectedGenre) {
      result = result.filter((music) => music.genre === selectedGenre);
    }

    // Filter by favorites
    if (showFavorites) {
      result = result.filter((music) => music.isFavorite);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (music) =>
          music.title.toLowerCase().includes(query) ||
          music.author.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "date_added":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "artist":
          return a.author.localeCompare(b.author);
        case "duration":
          // simple parse "mm:ss" to seconds
          const getSeconds = (time: string) => {
            const [min, sec] = time.split(':').map(Number);
            return min * 60 + sec;
          };
          return getSeconds(a.duration) - getSeconds(b.duration);
        default:
          return 0;
      }
    });

    return result;
  }, [musics, selectedGenre, showFavorites, searchQuery, sortBy]);

  return (
    <div className="h-full w-full p-6 overflow-y-auto">
      <HomeHeader trackCount={musics.length} />

      <HomeControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <HomeFilters
        genres={GENRES}
        selectedGenre={selectedGenre}
        onSelectGenre={setSelectedGenre}
        showFavorites={showFavorites}
        onToggleFavorites={() => setShowFavorites(!showFavorites)}
      />

      <div className={viewMode === "grid"
        ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        : "flex flex-col gap-1"
      }>
        {filteredAndSortedMusics.map((music, index) => (
          viewMode === "grid" ? (
            <MusicCard
              key={music.id}
              music={music}
              onPlay={handlePlay}
              onToggleFavorite={toggleFavorite}
            />
          ) : (
            <MusicListItem
              key={music.id}
              music={music}
              index={index}
              variant={viewMode === "compact" ? "compact" : "default"}
              isPlaying={playingMusicId === music.id}
              onPlay={handlePlay}
              onToggleFavorite={toggleFavorite}
            />
          )
        ))}

        {filteredAndSortedMusics.length === 0 && (
          <div className="col-span-full pt-12 text-center text-muted-foreground">
            <p>No musics found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
