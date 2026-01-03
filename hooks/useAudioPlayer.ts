// hooks/useAudioPlayer.ts
import { create } from 'zustand';
import { SUNO_PLAYLIST, SunoTrack } from '@/lib/playlist';

interface AudioState {
  isPlaying: boolean;
  currentTrackIndex: number;
  currentTrack: SunoTrack;
  volume: number;
  audio: HTMLAudioElement | null;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  initAudio: () => void;
}

export const useAudioPlayer = create<AudioState>((set, get) => ({
  isPlaying: false,
  currentTrackIndex: 0,
  currentTrack: SUNO_PLAYLIST[0],
  volume: 0.8,
  audio: null,

  initAudio: () => {
    if (get().audio) return;
    
    const audio = new Audio(SUNO_PLAYLIST[0].streamUrl);
    audio.crossOrigin = "anonymous"; // Essential for the 3D Visualizer to "read" the frequency
    
    // Auto-play next track logic
    audio.onended = () => {
      get().next();
    };

    set({ audio });
  },

  play: () => {
    const { audio } = get();
    if (audio) {
      audio.play();
      set({ isPlaying: true });
    }
  },

  pause: () => {
    const { audio } = get();
    if (audio) {
      audio.pause();
      set({ isPlaying: false });
    }
  },

  next: () => {
    const { currentTrackIndex, audio, isPlaying } = get();
    const nextIndex = (currentTrackIndex + 1) % SUNO_PLAYLIST.length;
    const nextTrack = SUNO_PLAYLIST[nextIndex];

    if (audio) {
      audio.src = nextTrack.streamUrl;
      audio.load();
      if (isPlaying) audio.play();
      set({ currentTrackIndex: nextIndex, currentTrack: nextTrack });
    }
  },

  previous: () => {
    const { currentTrackIndex, audio, isPlaying } = get();
    const prevIndex = (currentTrackIndex - 1 + SUNO_PLAYLIST.length) % SUNO_PLAYLIST.length;
    const prevTrack = SUNO_PLAYLIST[prevIndex];

    if (audio) {
      audio.src = prevTrack.streamUrl;
      audio.load();
      if (isPlaying) audio.play();
      set({ currentTrackIndex: prevIndex, currentTrack: prevTrack });
    }
  },
}));
