"use client"
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

// RELATIVE IMPORT
import { useAudioPlayer } from '../hooks/useAudioPlayer';

export const PlayerHUD = () => {
  const { isPlaying, currentTrack, play, pause, next, previous, initAudio } = useAudioPlayer();

  useEffect(() => {
    const handleInit = () => { 
      initAudio(); 
      window.removeEventListener('click', handleInit); 
    };
    window.addEventListener('click', handleInit);
    return () => window.removeEventListener('click', handleInit);
  }, [initAudio]);

  // Fallback image if Suno's CDN is acting up
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=200&h=200&fit=crop";
  };

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-6">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] shadow-2xl"
      >
        <div className="flex items-center gap-5">
          {/* Cover Art with Fallback */}
          <div className="relative h-16 w-16 flex-shrink-0">
            <img 
              src={currentTrack.coverArt} 
              onError={handleImageError}
              className="h-full w-full rounded-2xl shadow-lg border border-white/10 object-cover" 
              alt="Song Art" 
            />
            {isPlaying && (
              <div className="absolute -bottom-1 -right-1 flex gap-0.5 bg-purple-500 p-1 rounded-full px-2">
                <div className="w-1 h-2 bg-white animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-1 h-2 bg-white animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-1 h-2 bg-white animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-hidden">
            <h3 className="text-white font-medium truncate">{currentTrack.title}</h3>
            <p className="text-white/40 text-[10px] tracking-widest uppercase">SMOKE STREAM • SUNO AI</p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={previous} className="text-white/50 hover:text-white transition-colors">
              <SkipBack size={20} />
            </button>
            <button 
              onClick={() => isPlaying ? pause() : play()} 
              className="bg-white p-3 rounded-full text-black hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
            >
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
            </button>
            <button onClick={next} className="text-white/50 hover:text-white transition-colors">
              <SkipForward size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
