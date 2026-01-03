// app/page.tsx
"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NebulaScene } from '@/components/NebulaScene';
import { PlayerHUD } from '@/components/PlayerHUD';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

export default function SunoNebulaPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const { play } = useAudioPlayer();

  const handleStart = () => {
    setHasStarted(true);
    // The Audio context is resumed via the HUD's useEffect click listener
    // but we trigger the initial play here for a seamless "Enter" experience
    setTimeout(() => play(), 100); 
  };

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black selection:bg-purple-500/30">
      {/* 1. The 3D Background Layer */}
      <NebulaScene />

      {/* 2. Interactive HUD Layer */}
      <AnimatePresence>
        {hasStarted && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-12 left-12 z-20"
            >
              <h1 className="text-4xl font-black tracking-tighter text-white/90">
                SMOKE <span className="text-purple-500">STREAM</span>
              </h1>
              <p className="text-xs tracking-[0.3em] text-white/40 uppercase">
                Generative Audio Experience v1.0
              </p>
            </motion.div>

            <PlayerHUD />
          </>
        )}
      </AnimatePresence>

      {/* 3. The Cinematic Entry Overlay */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 z-[100] flex items-center justify-center bg-black"
          >
            <div className="text-center">
              <motion.div
                animate={{ 
                  opacity: [0.4, 1, 0.4],
                  scale: [0.98, 1, 0.98] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-8"
              >
                <h2 className="text-6xl font-thin text-white tracking-[0.5em] uppercase">
                  Suno Nebula
                </h2>
              </motion.div>
              
              <button
                onClick={handleStart}
                className="group relative px-12 py-4 text-white overflow-hidden rounded-full border border-white/20 transition-all hover:border-purple-500"
              >
                <div className="absolute inset-0 bg-white/5 group-hover:bg-purple-500/20 transition-colors" />
                <span className="relative z-10 tracking-[0.2em] font-light">
                  INITIALIZE STREAM
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Ambient "Smoke" Noise Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.03] mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </main>
  );
}
