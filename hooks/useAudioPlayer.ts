"use client"
import { create } from 'zustand';
// FIXED IMPORT
import { SUNO_PLAYLIST, SunoTrack } from '../lib/playlist';

interface AudioState {
  isPlaying: boolean;
  currentTrackIndex: number;
  currentTrack: SunoTrack;
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
  audio: null,

  initAudio: () => {
    if (get().audio) return;
    const audio = new Audio(SUNO_PLAYLIST[0].streamUrl);
    
    // Auto-play next track logic
    audio.onended = () => get().next();
    
    set({ audio });
  },

  play: () => {
    const { audio, initAudio } = get();
    if (!audio) {
      initAudio();
      setTimeout(() => get().audio?.play(), 100);
    } else {
      audio.play();
    }
    set({ isPlaying: true });
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
      if (get().isPlaying) audio.play();
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
      if (get().isPlaying) audio.play();
    }
    set({ 
      currentTrackIndex: prevIndex, 
      currentTrack: SUNO_PLAYLIST[prevIndex] 
    });
  },
}));
