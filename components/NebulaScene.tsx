"use client"
import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useAudioAnalyzer } from '../hooks/useAudioAnalyzer'

function KineticParticles() {
  const pointsRef = useRef<THREE.Points>(null!)
  const { getFrequencyData } = useAudioAnalyzer()
  
  const count = 5000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  useFrame((state) => {
    const freq = getFrequencyData();
    const time = state.clock.getElapsedTime();
    
    // Pulse particles to the bass
    const scale = 1 + (freq / 255) * 0.5;
    pointsRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    
    // Organic drift
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.2;
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#a855f7"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export const NebulaScene = () => (
  <div className="fixed inset-0 -z-10 bg-[#020202]">
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <color attach="background" args={['#000']} />
      <fog attach="fog" args={['#000', 8, 20]} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <KineticParticles />
      </Float>
    </Canvas>
  </div>
);
