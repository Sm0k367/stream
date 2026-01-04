export interface SunoTrack {
  id: string;
  title: string;
  shareUrl: string;
  streamUrl: string;
  coverArt: string;
}

const TRACK_IDS: string[] = [
  "budKYGOsXRPSzUXI", "WQkFJDnUp9mMumqu", "LggT2EZJVY8pCTrV", 
  "KAToclBpU1nJQv3x", "xUaUScrhSC98gAix", "vEOfE03Y6v5BN12V", 
  "ceeBe0NLZ4ieuvOf", "I5qCYuPzkuBPaHFO", "xvqhktQCAUn34Iui", 
  "9t3ThPcqmYG31rkz", "k1AwT3zoHMMueeGs", "SLHW8A9URwSdnBut", 
  "Ib7odMSeO9aPMpQW", "qKPgRU7LyU5jvP71", "AniMYS2hpJ3XsR8P"
];

export const SUNO_PLAYLIST: SunoTrack[] = TRACK_IDS.map((id: string, index: number) => ({
  id,
  title: `Smoke Track ${index + 1}`,
  shareUrl: `https://suno.com/s/${id}`,
  streamUrl: `https://cdn1.suno.ai/${id}.mp3`,
  coverArt: `https://cdn1.suno.ai/image_${id}.png`
}));
