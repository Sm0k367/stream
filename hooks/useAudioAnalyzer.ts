"use client"
import { useEffect, useRef, useCallback } from 'react';
import { useAudioPlayer } from './useAudioPlayer';

export const useAudioAnalyzer = () => {
  const { audio } = useAudioPlayer();
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const contextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Only initialize if we have an audio element and haven't set up the analyzer yet
    if (!audio || analyzerRef.current) return;

    const initAnalyzer = () => {
      try {
        // Create AudioContext only on user interaction (handled by useAudioPlayer)
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const context = new AudioContextClass();
        const analyzer = context.createAnalyser();
        
        // fftSize determines the "resolution" of our frequency data
        // 256 is perfect for a smooth, high-performance visualizer
        analyzer.fftSize = 256; 

        const source = context.createMediaElementSource(audio);
        source.connect(analyzer);
        analyzer.connect(context.destination);

        const bufferLength = analyzer.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        analyzerRef.current = analyzer;
        dataArrayRef.current = dataArray;
        sourceRef.current = source;
        contextRef.current = context;
      } catch (err) {
        console.error("Audio Analyzer: Initialization failed", err);
      }
    };

    initAnalyzer();

    // Cleanup when component unmounts
    return () => {
      if (contextRef.current?.state !== 'closed') {
        // We keep the context alive for the player, 
        // but we disconnect the source to prevent ghost audio
        sourceRef.current?.disconnect();
      }
    };
  }, [audio]);

  /**
   * Returns a single value (0-255) representing the overall energy of the audio.
   * This is what makes the Nebula particles pulse and the bars move.
   */
  const getFrequencyData = useCallback(() => {
    if (analyzerRef.current && dataArrayRef.current) {
      analyzerRef.current.getByteFrequencyData(dataArrayRef.current);
      
      // Calculate the average volume across all frequency bands
      const sum = dataArrayRef.current.reduce((a, b) => a + b, 0);
      return sum / dataArrayRef.current.length;
    }
    return 0;
  }, []);

  return { getFrequencyData };
};
