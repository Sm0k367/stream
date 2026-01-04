"use client"
import { create } from 'zustand';
import { SUNO_PLAYLIST, SunoTrack } from '../lib/playlist';

interface AudioState {
  isPlaying: boolean;
  currentTrackIndex: number;
  currentTrack: SunoTrack;
  audio: HTMLAudioElement | null;
  play: () => Promise<void>;
  pause: () => void;
  next: () => void;
  previous: () => void;
  initAudio: () => void;
}

export const useAudioPlayer = create<AudioState>((set, get) => ({
  isPlaying: false,
  currentTrackIndex: 0,
  currentTrack: SUNO_PLAYLIST[0],
  audio: null,

  initAudio: () => {
    if (typeof window === 'undefined' || get().audio) return;
    
    const audio = new Audio();
    audio.crossOrigin = "anonymous"; // Needed for the Visualizer/Analyzer to work
    audio.src = SUNO_PLAYLIST[0].streamUrl;
    
    audio.onended = () => get().next();
    
    // Auto-retry if a Suno link glitches
    audio.onerror = () => {
      console.warn("Audio link failed, skipping to next...");
      get().next();
    };
    
    set({ audio });
  },

  play: async () => {
    const { audio, initAudio } = get();
    if (!audio) {
      initAudio();
      // Give it a millisecond to initialize
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const currentAudio = get().audio;
    if (currentAudio) {
      try {
        await currentAudio.play();
        set({ isPlaying: true });
      } catch (err) {
        console.error("Playback blocked by browser. Interaction required.", err);
      }
    }
  },

  pause: () => {
    get().audio?.pause();
    set({ isPlaying: false });
  },

  next: () => {
    const nextIndex = (get().currentTrackIndex + 1) % SUNO_PLAYLIST.length;
    const { audio } = get();
    if (audio) {
      audio.src = SUNO_PLAYLIST[nextIndex].streamUrl;
      audio.load(); // Force the browser to recognize the new source
      if (get().isPlaying) audio.play().catch(() => {});
    }
    set({ 
      currentTrackIndex: nextIndex, 
      currentTrack: SUNO_PLAYLIST[nextIndex] 
    });
  },

  previous: () => {
    const prevIndex = (get().currentTrackIndex - 1 + SUNO_PLAYLIST.length) % SUNO_PLAYLIST.length;
    const { audio } = get();
    if (audio) {
      audio.src = SUNO_PLAYLIST[prevIndex].streamUrl;
      audio.load();
      if (get().isPlaying) audio.play().catch(() => {});
    }
    set({ 
      currentTrackIndex: prevIndex, 
      currentTrack: SUNO_PLAYLIST[prevIndex] 
    });
  },
}));
