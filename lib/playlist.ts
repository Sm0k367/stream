export interface SunoTrack {
  id: string;
  title: string;
  artist: string;
  genre: string;
  streamUrl: string;
  coverArt: string;
  duration: number;
}

const TRACK_DATA = [
  { id: "fbacec1b-457a-4a29-9407-5ac4e5232a63", title: "Nebula Dreams", genre: "Phonk / Drift" },
  { id: "10242707-d00a-4cae-9470-a88f7625e53f", title: "Cyber Smoke", genre: "Synthwave" }
];

export const SUNO_PLAYLIST: SunoTrack[] = TRACK_DATA.map((track) => ({
  ...track,
  artist: "DJ Smoke Stream",
  streamUrl: `https://cdn1.suno.ai/${track.id}.mp3`,
  coverArt: `https://cdn1.suno.ai/image_${track.id}.png`,
  duration: 0 // Will be populated by audio metadata
}));

export const THEMES = {
  PURPLE: { primary: '#a855f7', secondary: '#3b0764' },
  CYAN: { primary: '#06b6d4', secondary: '#083344' }
};
