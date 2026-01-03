// lib/playlist.ts

export interface SunoTrack {
  id: string;
  title: string;
  shareUrl: string;
  streamUrl: string; // Direct CDN link for the audio engine
  coverArt: string;
  vibe: 'chill' | 'hype' | 'dark' | 'ethereal'; // Used for the 3D Shaders later
}

export const SUNO_PLAYLIST: SunoTrack[] = [
  {
    id: "budKYGOsXRPSzUXI",
    title: "Track 1",
    shareUrl: "https://suno.com/s/budKYGOsXRPSzUXI",
    streamUrl: "https://cdn1.suno.ai/budKYGOsXRPSzUXI.mp3",
    coverArt: "https://cdn1.suno.ai/image_budKYGOsXRPSzUXI.png",
    vibe: "chill"
  },
  {
    id: "WQkFJDnUp9mMumqu",
    title: "Track 2",
    shareUrl: "https://suno.com/s/WQkFJDnUp9mMumqu",
    streamUrl: "https://cdn1.suno.ai/WQkFJDnUp9mMumqu.mp3",
    coverArt: "https://cdn1.suno.ai/image_WQkFJDnUp9mMumqu.png",
    vibe: "hype"
  },
  {
    id: "LggT2EZJVY8pCTrV",
    title: "Track 3",
    shareUrl: "https://suno.com/s/LggT2EZJVY8pCTrV",
    streamUrl: "https://cdn1.suno.ai/LggT2EZJVY8pCTrV.mp3",
    coverArt: "https://cdn1.suno.ai/image_LggT2EZJVY8pCTrV.png",
    vibe: "ethereal"
  },
  {
    id: "KAToclBpU1nJQv3x",
    title: "Track 4",
    shareUrl: "https://suno.com/s/KAToclBpU1nJQv3x",
    streamUrl: "https://cdn1.suno.ai/KAToclBpU1nJQv3x.mp3",
    coverArt: "https://cdn1.suno.ai/image_KAToclBpU1nJQv3x.png",
    vibe: "dark"
  },
  {
    id: "xUaUScrhSC98gAix",
    title: "Track 5",
    shareUrl: "https://suno.com/s/xUaUScrhSC98gAix",
    streamUrl: "https://cdn1.suno.ai/xUaUScrhSC98gAix.mp3",
    coverArt: "https://cdn1.suno.ai/image_xUaUScrhSC98gAix.png",
    vibe: "chill"
  },
  {
    id: "vEOfE03Y6v5BN12V",
    title: "Track 6",
    shareUrl: "https://suno.com/s/vEOfE03Y6v5BN12V",
    streamUrl: "https://cdn1.suno.ai/vEOfE03Y6v5BN12V.mp3",
    coverArt: "https://cdn1.suno.ai/image_vEOfE03Y6v5BN12V.png",
    vibe: "hype"
  },
  {
    id: "ceeBe0NLZ4ieuvOf",
    title: "Track 7",
    shareUrl: "https://suno.com/s/ceeBe0NLZ4ieuvOf",
    streamUrl: "https://cdn1.suno.ai/ceeBe0NLZ4ieuvOf.mp3",
    coverArt: "https://cdn1.suno.ai/image_ceeBe0NLZ4ieuvOf.png",
    vibe: "ethereal"
  },
  {
    id: "I5qCYuPzkuBPaHFO",
    title: "Track 8",
    shareUrl: "https://suno.com/s/I5qCYuPzkuBPaHFO",
    streamUrl: "https://cdn1.suno.ai/I5qCYuPzkuBPaHFO.mp3",
    coverArt: "https://cdn1.suno.ai/image_I5qCYuPzkuBPaHFO.png",
    vibe: "dark"
  },
  {
    id: "xvqhktQCAUn34Iui",
    title: "Track 9",
    shareUrl: "https://suno.com/s/xvqhktQCAUn34Iui",
    streamUrl: "https://cdn1.suno.ai/xvqhktQCAUn34Iui.mp3",
    coverArt: "https://cdn1.suno.ai/image_xvqhktQCAUn34Iui.png",
    vibe: "chill"
  },
  {
    id: "9t3ThPcqmYG31rkz",
    title: "Track 10",
    shareUrl: "https://suno.com/s/9t3ThPcqmYG31rkz",
    streamUrl: "https://cdn1.suno.ai/9t3ThPcqmYG31rkz.mp3",
    coverArt: "https://cdn1.suno.ai/image_9t3ThPcqmYG31rkz.png",
    vibe: "hype"
  },
  {
    id: "k1AwT3zoHMMueeGs",
    title: "Track 11",
    shareUrl: "https://suno.com/s/k1AwT3zoHMMueeGs",
    streamUrl: "https://cdn1.suno.ai/k1AwT3zoHMMueeGs.mp3",
    coverArt: "https://cdn1.suno.ai/image_k1AwT3zoHMMueeGs.png",
    vibe: "ethereal"
  },
  {
    id: "SLHW8A9URwSdnBut",
    title: "Track 12",
    shareUrl: "https://suno.com/s/SLHW8A9URwSdnBut",
    streamUrl: "https://cdn1.suno.ai/SLHW8A9URwSdnBut.mp3",
    coverArt: "https://cdn1.suno.ai/image_SLHW8A9URwSdnBut.png",
    vibe: "dark"
  },
  {
    id: "Ib7odMSeO9aPMpQW",
    title: "Track 13",
    shareUrl: "https://suno.com/s/Ib7odMSeO9aPMpQW",
    streamUrl: "https://cdn1.suno.ai/Ib7odMSeO9aPMpQW.mp3",
    coverArt: "https://cdn1.suno.ai/image_Ib7odMSeO9aPMpQW.png",
    vibe: "chill"
  },
  {
    id: "qKPgRU7LyU5jvP71",
    title: "Track 14",
    shareUrl: "https://suno.com/s/qKPgRU7LyU5jvP71",
    streamUrl: "https://cdn1.suno.ai/qKPgRU7LyU5jvP71.mp3",
    coverArt: "https://cdn1.suno.ai/image_qKPgRU7LyU5jvP71.png",
    vibe: "hype"
  },
  {
    id: "AniMYS2hpJ3XsR8P",
    title: "Track 15",
    shareUrl: "https://suno.com/s/AniMYS2hpJ3XsR8P",
    streamUrl: "https://cdn1.suno.ai/AniMYS2hpJ3XsR8P.mp3",
    coverArt: "https://cdn1.suno.ai/image_AniMYS2hpJ3XsR8P.png",
    vibe: "ethereal"
  }
];
