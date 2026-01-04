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
  ListMusic
} from 'lucide-react';

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
      <VisualizerPanel />

      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-4xl mx-auto pointer-events-auto"
      >
        <div className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-4 md:p-6 shadow-2xl">
          
          <div className="px-4 mb-4">
            <div className="flex justify-between text-[10px] text-white/40 mb-2 tabular-nums tracking-widest uppercase">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-400"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 flex items-center justify-center">
                  {currentTrack.coverArt ? (
                    <img 
                      src={currentTrack.coverArt} 
                      alt={currentTrack.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Music className="text-white/20" />
                  )}
                </div>
              </div>
              
              <div className="hidden sm:block overflow-hidden">
                <h3 className="text-white font-bold tracking-tight truncate max-w-[200px]">
                  {currentTrack.title}
                </h3>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-0.5">
                  {currentTrack.artist}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-8">
              <button onClick={previous} className="text-white/30 hover:text-white transition-colors">
                <SkipBack size={20} fill="currentColor" />
              </button>

              <button 
                onClick={() => isPlaying ? pause() : play()}
                className="h-14 w-14 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-all"
              >
                {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
              </button>

              <button onClick={next} className="text-white/30 hover:text-white transition-colors">
                <SkipForward size={20} fill="currentColor" />
              </button>
            </div>

            <div className="flex-1 flex justify-end items-center gap-4">
              <div className="hidden md:flex items-center gap-3 bg-white/5 rounded-full px-4 py-2 border border-white/5">
                <Volume2 size={16} className="text-white/40" />
                <div className="w-20 h-1 bg-white/10 rounded-full relative">
                   <div className="absolute top-0 left-0 h-full w-3/4 bg-white/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
