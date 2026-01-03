// components/PlayerHUD.tsx
"use client"
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

export const PlayerHUD = () => {
  const { isPlaying, currentTrack, play, pause, next, previous, initAudio } = useAudioPlayer();

  // Initialize audio on first user interaction (browser requirement)
  useEffect(() => {
    const handleFirstClick = () => {
      initAudio();
      window.removeEventListener('click', handleFirstClick);
    };
    window.addEventListener('click', handleFirstClick);
    return () => window.removeEventListener('click', handleFirstClick);
  }, [initAudio]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative group overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl p-6 shadow-2xl"
      >
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10 opacity-50" />

        <div className="relative flex items-center gap-4">
          {/* Rotating Vinyl/Art Cover */}
          <motion.div 
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="h-16 w-16 rounded-full border-2 border-white/20 overflow-hidden shadow-lg"
          >
            <img src={currentTrack.coverArt} alt={currentTrack.title} className="h-full w-full object-cover" />
          </motion.div>

          <div className="flex-1 min-w-0">
            <motion.h3 
              key={currentTrack.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-white font-bold truncate text-lg"
            >
              {currentTrack.title}
            </motion.h3>
            <p className="text-white/50 text-xs uppercase tracking-widest flex items-center gap-1">
              <Music size={12} /> DJ SMOKE STREAM
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={previous} className="p-2 text-white/70 hover:text-white transition-colors">
              <SkipBack size={24} fill="currentColor" />
            </button>
            
            <button 
              onClick={isPlaying ? pause : play}
              className="p-4 bg-white rounded-full text-black hover:scale-105 active:scale-95 transition-transform"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>

            <button onClick={next} className="p-2 text-white/70 hover:text-white transition-colors">
              <SkipForward size={24} fill="currentColor" />
            </button>
          </div>
        </div>

        {/* Visualizer Bar Placeholder */}
        <div className="mt-4 flex items-end gap-[2px] h-6 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: isPlaying ? [4, 20, 8, 16, 4] : 4 }}
              transition={{ repeat: Infinity, duration: 0.5 + Math.random(), ease: "easeInOut" }}
              className="flex-1 bg-white/20 rounded-t-sm"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
