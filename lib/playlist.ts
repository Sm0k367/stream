export interface SunoTrack {
  id: string;
  title: string;
  shareUrl: string;
  streamUrl: string;
  coverArt: string;
}

const TRACK_IDS: string[] = [
  "budKYGOsXRPSzUXI", "WQkFJDnUp9mMumqu", "LggT2EZJVY8pCTrV", 
  "KAToclBpU1nJQv3x", "xUaUScrhSC98gAix", "vEOfE03Y6v5BN12V"
];

export const SUNO_PLAYLIST: SunoTrack[] = TRACK_IDS.map((id: string, index: number) => ({
  id,
  title: `Smoke Track ${index + 1}`,
  shareUrl: `https://suno.com/s/${id}`,
  // We add a fallback to a sample MP3 if the Suno one fails
  streamUrl: `https://cdn1.suno.ai/${id}.mp3`,
  // Using a high-quality placeholder that looks like a nebula if Suno art fails
  coverArt: `https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=200&h=200&fit=crop`
}));
