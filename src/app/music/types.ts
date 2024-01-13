export interface Artist {
  id: number;
  name: string;
  albumes: Album[];
}

export interface Album {
  id: number;
  name: string;
  image: string;
  songs: Song[];
}

export interface Song {
  id: number;
  name: string;
  track: string;
}

export interface MusicData {
  artista: Artist[];
}
