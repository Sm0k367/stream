"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NebulaScene } from '../components/NebulaScene';
import { PlayerHUD } from '../components/PlayerHUD';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

export default function SmokeStreamV2() {
  const [active, setActive] = useState(false);
  const { play } = useAudioPlayer();

  const handleEnter = () => {
    setActive(true);
    setTimeout(() => play(), 300);
  };

  return (
    <main className="h-screen w-full bg-black text-white selection:bg-purple-500/30">
      <NebulaScene />
      
      <AnimatePresence>
        {!active ? (
          <motion.div 
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          >
            <div className="text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-7xl font-black italic tracking-tighter mb-8 bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent"
              >
                SMOKE STREAM
              </motion.h1>
              <button 
                onClick={handleEnter}
                className="px-12 py-4 rounded-full border border-white/20 hover:border-purple-500 transition-all hover:shadow-[0_0_30px_-5px_#a855f7] uppercase tracking-[0.4em] text-xs font-light"
              >
                Enter Experience
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="absolute top-10 left-10 z-50">
               <span className="text-xs font-bold tracking-[0.5em] text-purple-500">VERSION 2.0</span>
            </div>
            <PlayerHUD />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
