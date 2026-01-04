"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

export const PlayerHUD = () => {
  const { isPlaying, currentTrack, play, pause, next, previous } = useAudioPlayer();
  const [progress, setProgress] = useState(0);

  // Simulated progress for the v2.0 UI look
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => setProgress(p => (p + 0.1) % 100), 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50">
      <motion.div 
        className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-4 flex flex-col gap-4 shadow-[0_0_50px_-12px_rgba(168,85,247,0.4)]"
      >
        {/* Progress Bar */}
        <div className="px-6 w-full">
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-purple-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl overflow-hidden border border-white/20 bg-purple-900/20 flex items-center justify-center">
              {currentTrack.coverArt ? (
                <img src={currentTrack.coverArt} className="object-cover h-full w-full" />
              ) : <Music className="text-purple-400" />}
            </div>
            <div>
              <h4 className="text-white font-bold text-sm truncate w-32 md:w-48">{currentTrack.title}</h4>
              <p className="text-white/40 text-[10px] uppercase tracking-tighter">{currentTrack.genre}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={previous} className="text-white/40 hover:text-white transition-colors"><SkipBack size={22} /></button>
            <button 
              onClick={() => isPlaying ? pause() : play()} 
              className="h-14 w-14 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause fill="black" /> : <Play fill="black" className="ml-1" />}
            </button>
            <button onClick={next} className="text-white/40 hover:text-white transition-colors"><SkipForward size={22} /></button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-white/40">
            <Volume2 size={18} />
            <div className="w-20 h-1 bg-white/10 rounded-full">
              <div className="w-2/3 h-full bg-white/40 rounded-full" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
