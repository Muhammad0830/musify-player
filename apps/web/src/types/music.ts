export interface Music {
  id: string;
  title: string;
  author: string;
  albumCover: string;
  duration: string; // "3:56"
  genre: string;
  playCount: number;
  createdAt: string; // ISO date string
  isFavorite: boolean;
}
