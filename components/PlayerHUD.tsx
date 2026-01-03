"use client"
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

export const PlayerHUD = () => {
  const { isPlaying, currentTrack, play, pause, next, previous, initAudio } = useAudioPlayer();

  useEffect(() => {
    const handleInit = () => { initAudio(); window.removeEventListener('click', handleInit); };
    window.addEventListener('click', handleInit);
    return () => window.removeEventListener('click', handleInit);
  }, [initAudio]);

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-6">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] shadow-2xl"
      >
        <div className="flex items-center gap-5">
          <img src={currentTrack.coverArt} className="h-16 w-16 rounded-2xl shadow-lg border border-white/10" alt="Art" />
          <div className="flex-1 overflow-hidden">
            <h3 className="text-white font-medium truncate">{currentTrack.title}</h3>
            <p className="text-white/40 text-xs tracking-tighter uppercase">DJ Smoke Stream • Suno AI</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={previous} className="text-white/50 hover:text-white"><SkipBack size={20} /></button>
            <button onClick={isPlaying ? pause : play} className="bg-white p-3 rounded-full text-black hover:scale-110 transition-transform">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={next} className="text-white/50 hover:text-white"><SkipForward size={20} /></button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
