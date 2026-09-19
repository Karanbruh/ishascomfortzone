import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

function createHeartShape() {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.bezierCurveTo(0, -0.3, -0.5, -0.3, -0.5, 0.1)
  shape.bezierCurveTo(-0.5, 0.4, 0, 0.7, 0, 1.0)
  shape.bezierCurveTo(0, 0.7, 0.5, 0.4, 0.5, 0.1)
  shape.bezierCurveTo(0.5, -0.3, 0, -0.3, 0, 0)
  return shape
}

function createParticlePositions(count) {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i += 1) {
    const seed = i * 12.9898
    const n1 = Math.sin(seed) * 43758.5453
    const n2 = Math.sin(seed * 1.71) * 43758.5453
    const n3 = Math.sin(seed * 2.33) * 43758.5453
    arr[i * 3] = (n1 - Math.floor(n1) - 0.5) * 8
    arr[i * 3 + 1] = (n2 - Math.floor(n2) - 0.5) * 6
    arr[i * 3 + 2] = (n3 - Math.floor(n3) - 0.5) * 5 - 0.5
  }
  return arr
}

export function GlowingMoon({ reducedMotion }) {
  const moonRef = useRef(null)
  const haloRef = useRef(null)

  useFrame((state) => {
    if (!moonRef.current) {
      return
    }
    if (!reducedMotion) {
      moonRef.current.rotation.y = state.clock.elapsedTime * 0.04
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.7) * 0.035
      if (haloRef.current) {
        haloRef.current.scale.setScalar(pulse)
      }
    }
  })

  return (
    <group position={[0, 0.15, -2.4]}>
      <mesh ref={haloRef}>
        <sphereGeometry args={[1.55, 32, 32]} />
        <meshBasicMaterial color="#f8d4e8" transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <mesh ref={moonRef}>
        <sphereGeometry args={[1.05, 48, 48]} />
        <meshStandardMaterial
          color="#f5e6c8"
          emissive="#e8d4a8"
          emissiveIntensity={0.45}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>
      <pointLight color="#f8d4e8" intensity={0.55} distance={10} decay={2} />
    </group>
  )
}

export function CentralHeart({ reducedMotion, isMobile }) {
  const heartRef = useRef(null)
  const geometry = useMemo(() => {
    const shape = createHeartShape()
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelSegments: 2,
    })
    geo.center()
    geo.scale(0.55, 0.55, 0.55)
    return geo
  }, [])

  useFrame((state) => {
    if (!heartRef.current || reducedMotion) {
      return
    }
    const t = state.clock.elapsedTime
    heartRef.current.rotation.y = Math.sin(t * 0.35) * 0.25
    const pulse = 1 + Math.sin(t * 1.2) * 0.04
    heartRef.current.scale.setScalar(pulse)
  })

  return (
    <group position={[0, isMobile ? -0.05 : -0.1, 1.1]}>
      <mesh ref={heartRef} geometry={geometry}>
        <meshStandardMaterial
          color="#e88aa8"
          emissive="#c97a9a"
          emissiveIntensity={0.55}
          roughness={0.35}
          metalness={0.15}
        />
      </mesh>
      <Html center position={[0, -0.58, 0.1]} style={{ pointerEvents: 'none' }}>
        <p
          style={{
            margin: 0,
            fontFamily: 'Fraunces, Georgia, serif',
            fontSize: isMobile ? '15px' : '17px',
            color: '#f7efe3',
            letterSpacing: '0.06em',
            whiteSpace: 'nowrap',
            textShadow: '0 2px 12px rgba(232, 138, 168, 0.45)',
          }}
        >
          isha ♡ karan
        </p>
      </Html>
    </group>
  )
}

export function SoftParticles({ count = 55, reducedMotion }) {
  const pointsRef = useRef(null)
  const positions = useMemo(() => createParticlePositions(count), [count])

  useFrame((state) => {
    if (!pointsRef.current || reducedMotion) {
      return
    }
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#d4c4f0"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

export function NebulaGlow() {
  return (
    <group>
      <mesh position={[-2.5, 1.2, -3]}>
        <sphereGeometry args={[1.8, 16, 16]} />
        <meshBasicMaterial color="#c97a9a" transparent opacity={0.06} depthWrite={false} />
      </mesh>
      <mesh position={[2.8, -1, -3.2]}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial color="#9b7bb8" transparent opacity={0.05} depthWrite={false} />
      </mesh>
    </group>
  )
}
