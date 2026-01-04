"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Music, 
  Maximize2,
  ListMusic
} from 'lucide-react';

// INTERNAL COMPONENTS & HOOKS
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { VisualizerPanel } from './VisualizerPanel';

export const PlayerHUD = () => {
  const { 
    isPlaying, 
    currentTrack, 
    play, 
    pause, 
    next, 
    previous, 
    audio 
  } = useAudioPlayer();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Sync real audio time with the progress bar
  useEffect(() => {
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [audio]);

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-6 md:p-10 pointer-events-none">
      {/* 1. Real-time Audio Spectrum behind the HUD */}
      <VisualizerPanel />

      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="max-w-4xl mx-auto pointer-events-auto"
      >
        <div className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-4 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Progress Section */}
          <div className="px-4 mb-4">
            <div className="flex justify-between text-[10px] text-white/40 mb-2 tabular-nums tracking-widest uppercase">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden group cursor-pointer">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-400 relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#fff] opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* Track Info */}
            <div className="flex items-center gap-4 flex-1">
              <div className="relative group">
                <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 flex items-center justify-center">
                  {currentTrack.coverArt ? (
                    <img 
                      src={currentTrack.coverArt} 
                      alt={currentTrack.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <Music className="text-white/20" />
                  )}
                </div>
                {isPlaying && (
                  <div className="absolute -top-1 -right-1 flex gap-0.5 bg-purple-500 p-1.5 rounded-lg shadow-lg">
                    <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-white" />
                    <motion.div animate={{ height: [10, 4, 10] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-0.5 bg-white" />
                    <motion.div animate={{ height: [6, 12, 6] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-0.5 bg-white" />
                  </div>
                )}
              </div>
              
              <div className="hidden sm:block overflow-hidden">
                <h3 className="text-white font-bold tracking-tight truncate max-w-[150px] md:max-w-[250px]">
                  {currentTrack.title}
                </h3>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-0.5 font-medium">
                  {currentTrack.artist} • {currentTrack.genre}
                </p>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-4 md:gap-8">
              <button 
                onClick={previous}
                className="text-white/30 hover:text-white transition-colors p-2"
              >
                <SkipBack size={20} fill="currentColor" />
              </button>

              <button 
                onClick={() => isPlaying ? pause() : play()}
                className="h-14 w-14 md:h-16 md:w-16 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                {isPlaying ? <Pause size={28} fill="black" /> : <Play size={28} fill="black" className="ml-1" />}
              </button>

              <button 
                onClick={next}
                className="text-white/30 hover:text-white transition-colors p-2"
              >
                <SkipForward size={20} fill="currentColor" />
              </button>
