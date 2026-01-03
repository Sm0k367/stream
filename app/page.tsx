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
    // Short delay to ensure audio context is ready after user interaction
    setTimeout(() => play(), 200); 
  };

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      {/* 1. The 3D Reactive Layer */}
      <NebulaScene />

      {/* 2. Main UI Layer */}
      <AnimatePresence>
        {hasStarted && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-10 left-10 z-20"
            >
              <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
                SMOKE <span className="text-purple-500">STREAM</span>
              </h1>
              <div className="h-[1px] w-12 bg-purple-500 mt-1" />
            </motion.div>

            <PlayerHUD />
          </>
        )}
      </AnimatePresence>

      {/* 3. The "Never Seen Before" Entry Portal */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-8"
            >
              <h2 className="text-5xl md:text-7xl font-thin text-white tracking-[0.4em] uppercase">
                NEBULA
              </h2>
              
              <button
                onClick={handleStart}
                className="group relative px-10 py-4 border border-white/10 rounded-full overflow-hidden transition-all hover:border-purple-500"
              >
                <div className="absolute inset-0 bg-white/5 group-hover:bg-purple-500/10 transition-colors" />
                <span className="relative z-10 text-white tracking-[0.3em] text-xs font-light">
                  ENTER THE STREAM
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Film Grain Aesthetic Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </main>
  );
}
