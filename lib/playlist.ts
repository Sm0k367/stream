export interface SunoTrack {
  id: string;
  title: string;
  shareUrl: string;
  streamUrl: string;
  coverArt: string;
}

// These are the IDs extracted from your iframes
const TRACK_IDS: string[] = [
  "fbacec1b-457a-4a29-9407-5ac4e5232a63",
  "10242707-d00a-4cae-9470-a88f7625e53f"
];

export const SUNO_PLAYLIST: SunoTrack[] = TRACK_IDS.map((id: string, index: number) => ({
  id,
  title: index === 0 ? "Smoke Stream Track 1" : "Smoke Stream Track 2",
  shareUrl: `https://suno.com/song/${id}`,
  // Direct CDN links sometimes require a 'v' param or specific headers
  streamUrl: `https://cdn1.suno.ai/${id}.mp3`,
  coverArt: `https://cdn1.suno.ai/image_${id}.png`
}));
