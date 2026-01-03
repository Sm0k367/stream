// components/NebulaScene.tsx
"use client"
import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'

function SmokeParticles() {
  const ref = useRef<THREE.Points>(null!)
  const { isPlaying } = useAudioPlayer()
  
  // Generate 2,000 random points for the "Smoke"
  const sphere = useMemo(() => {
    const arr = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      const stride = i * 3
      arr[stride] = (Math.random() - 0.5) * 10
      arr[stride + 1] = (Math.random() - 0.5) * 10
      arr[stride + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [])

  useFrame((state, delta) => {
    // Rotation logic
    const speed = isPlaying ? 0.2 : 0.05
    ref.current.rotation.x += delta * speed
    ref.current.rotation.y += delta * (speed / 2)
    
    // Subtle breathing effect
    const time = state.clock.getElapsedTime()
    ref.current.scale.setScalar(1 + Math.sin(time) * 0.05)
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#a855f7" // Purple Smoke
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

export const NebulaScene = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 15]} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
        
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <SmokeParticles />
        </Float>
      </Canvas>
      
      {/* Overlay Vignette for depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  )
}
