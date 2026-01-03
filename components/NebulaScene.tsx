"use client"
import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'

function SmokeParticles() {
  const ref = useRef<THREE.Points>(null!)
  const { isPlaying } = useAudioPlayer()
  
  const sphere = useMemo(() => {
    const arr = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      const stride = i * 3
      arr[stride] = (Math.random() - 0.5) * 15
      arr[stride + 1] = (Math.random() - 0.5) * 15
      arr[stride + 2] = (Math.random() - 0.5) * 15
    }
    return arr
  }, [])

  useFrame((state, delta) => {
    const speed = isPlaying ? 0.15 : 0.02
    ref.current.rotation.x += delta * speed
    ref.current.rotation.y += delta * (speed / 1.5)
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#a855f7"
          size={0.07}
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
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <fog attach="fog" args={['#000', 5, 20]} />
        <SmokeParticles />
      </Canvas>
    </div>
  )
}
