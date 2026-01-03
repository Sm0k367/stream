// hooks/useAudioAnalyzer.ts
import { useEffect, useRef } from 'react';
import { useAudioPlayer } from './useAudioPlayer';

export const useAudioAnalyzer = () => {
  const { audio } = useAudioPlayer();
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    if (!audio || analyzerRef.current) return;

    // 1. Create the Audio Context
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const context = new AudioContext();
    
    // 2. Create the Analyzer
    const analyzer = context.createAnalyser();
    analyzer.fftSize = 256; // High resolution for the nebula
    
    const source = context.createMediaElementSource(audio);
    source.connect(analyzer);
    analyzer.connect(context.destination);

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    analyzerRef.current = analyzer;
    dataArrayRef.current = dataArray;
  }, [audio]);

  const getFrequencyData = () => {
    if (analyzerRef.current && dataArrayRef.current) {
      analyzerRef.current.getByteFrequencyData(dataArrayRef.current);
      return dataArrayRef.current;
    }
    return null;
  };

  return { getFrequencyData };
};
