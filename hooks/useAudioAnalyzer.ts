"use client"
import { useEffect, useRef } from 'react';
// FIXED IMPORT
import { useAudioPlayer } from './useAudioPlayer';

export const useAudioAnalyzer = () => {
  const { audio } = useAudioPlayer();
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    // Only initialize once we have an audio element and haven't set up the analyzer yet
    if (!audio || analyzerRef.current) return;

    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const context = new AudioContext();
      
      const analyzer = context.createAnalyser();
      analyzer.fftSize = 256; // Controls the "resolution" of the music data
      
      // Connect the audio element to the analyzer
      const source = context.createMediaElementSource(audio);
      source.connect(analyzer);
      analyzer.connect(context.destination);

      const bufferLength = analyzer.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      analyzerRef.current = analyzer;
      dataArrayRef.current = dataArray;
      sourceRef.current = source;
    } catch (err) {
      console.error("Audio Analyzer failed to initialize:", err);
    }
  }, [audio]);

  const getFrequencyData = () => {
    if (analyzerRef.current && dataArrayRef.current) {
      analyzerRef.current.getByteFrequencyData(dataArrayRef.current);
      // Returns a value between 0 and 255 representing the average volume
      const average = dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length;
      return average;
    }
    return 0;
  };

  return { getFrequencyData };
};
