// Update the SmokeParticles component inside NebulaScene.tsx
import { useAudioAnalyzer } from '@/hooks/useAudioAnalyzer';

function SmokeParticles() {
  const ref = useRef<THREE.Points>(null!);
  const { isPlaying } = useAudioPlayer();
  const { getFrequencyData } = useAudioAnalyzer();
  
  // ... (keep the existing useMemo code for sphere)

  useFrame((state, delta) => {
    const volume = getFrequencyData(); // Get current audio intensity (0-255)
    const boost = volume / 100; // Normalize it
    
    // Rotation speeds up based on the music intensity
    const speed = isPlaying ? (0.15 + boost) : 0.02;
    ref.current.rotation.x += delta * speed;
    ref.current.rotation.y += delta * (speed / 1.5);

    // Scale the entire universe based on the bass!
    const targetScale = isPlaying ? (1 + boost * 0.5) : 1;
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    // ... same as before
  );
}
