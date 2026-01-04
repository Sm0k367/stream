"use client"
import React, { useRef, useEffect } from 'react';
import { useAudioAnalyzer } from '../hooks/useAudioAnalyzer';

export const VisualizerPanel = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { getFrequencyData } = useAudioAnalyzer();
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const freq = getFrequencyData(); // This gets the average frequency from our hook
      
      // Clear canvas with a slight trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / 64);
      let x = 0;

      // Draw 64 reactive bars
      for (let i = 0; i < 64; i++) {
        // We add some randomness and math to make it look "organic"
        const barHeight = (freq / 255) * canvas.height * (0.5 + Math.random() * 0.5);
        
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, 'rgba(168, 85, 247, 0)'); // Transparent purple
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0.5)'); // Solid purple

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);

        x += barWidth;
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [getFrequencyData]);

  return (
    <div className="absolute inset-0 flex items-end justify-center pointer-events-none opacity-40">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={200} 
        className="w-full max-w-2xl h-32"
      />
    </div>
  );
};
