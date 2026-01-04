// hooks/useAudioAnalyzer.ts
import { useEffect, useRef } from 'react';
import { useAudioPlayer } from './useAudioPlayer';

export const useAudioAnalyzer = () => {
  const { audio } = useAudioPlayer();
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    if (!audio || analyzerRef.current) return;

    // Use the existing audio element from our store
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const context = new AudioContext();
    
    const analyzer = context.createAnalyser();
    analyzer.fftSize = 256; // Balance between detail and performance
    
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
      // Return the average volume/frequency
      return dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length;
    }
    return 0;
  };

  return { getFrequencyData };
};
