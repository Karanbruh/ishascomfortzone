import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture, Html } from '@react-three/drei'
import * as THREE from 'three'
import { memoryVideo } from './memories'

export default function MemoryVideoCard({ isMobile, reducedMotion, onSelect }) {
  const groupRef = useRef(null)
  const texture = useTexture(memoryVideo.poster, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace
  })

  const layout = isMobile ? memoryVideo.mobile : memoryVideo.desktop
  const width = 1.15 * layout.scale
  const height = 0.78 * layout.scale

  const basePosition = useMemo(
    () => new THREE.Vector3(...layout.position),
    [layout.position],
  )

  const playShape = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-0.04, -0.06)
    shape.lineTo(0.07, 0)
    shape.lineTo(-0.04, 0.06)
    shape.closePath()
    return new THREE.ShapeGeometry(shape)
  }, [])

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) {
      return
    }
    const t = state.clock.elapsedTime
    groupRef.current.position.y = basePosition.y + Math.sin(t * 0.5) * 0.06
    groupRef.current.rotation.z = layout.rotation[2] + Math.sin(t * 0.35) * 0.02
  })

  return (
    <group
      ref={groupRef}
      position={layout.position}
      rotation={layout.rotation}
      onClick={(event) => {
        event.stopPropagation()
        onSelect()
      }}
      onPointerOver={(event) => {
        event.stopPropagation()
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto'
      }}
    >
      <mesh position={[0, 0, -0.025]} scale={[1.06, 1.08, 1]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color="#e88aa8" transparent opacity={0.28} />
      </mesh>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.8}
          metalness={0.05}
          emissive="#3a2048"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <circleGeometry args={[0.16, 32]} />
        <meshBasicMaterial color="#f7efe3" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0.015, 0, 0.03]} geometry={playShape}>
        <meshBasicMaterial color="#1a1035" />
      </mesh>
      <Html center position={[0, -height * 0.62, 0.04]} style={{ pointerEvents: 'none' }}>
        <p
          style={{
            margin: 0,
            fontFamily: 'Fraunces, Georgia, serif',
            fontStyle: 'italic',
            fontSize: isMobile ? '11px' : '12px',
            color: '#f8d4e8',
            whiteSpace: 'nowrap',
            textShadow: '0 2px 10px rgba(0,0,0,0.55)',
          }}
        >
          {memoryVideo.label}
        </p>
      </Html>
    </group>
  )
}
