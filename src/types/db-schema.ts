export declare interface Artist {
  id: number;
  name: string;
}

export declare interface Song {
  id: number;
  name: string;
  year: number,
  artist: Artist['name'];
  shortname: string;
  bpm: number;
  duration: number;
  genre: string;
  spotifyId: string;
  album: string;
}
