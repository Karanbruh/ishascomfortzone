import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

export default function FloatingMemory({ memory, isMobile, reducedMotion, onSelect }) {
  const groupRef = useRef(null)
  const texture = useTexture(memory.src, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
  })

  const layout = isMobile ? memory.mobile : memory.desktop
  const width = 1.05 * layout.scale
  const height = 1.4 * layout.scale

  const basePosition = useMemo(
    () => new THREE.Vector3(...layout.position),
    [layout.position],
  )

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) {
      return
    }
    const t = state.clock.elapsedTime
    groupRef.current.position.y =
      basePosition.y + Math.sin(t * memory.floatSpeed + memory.id.length) * memory.floatAmp
    groupRef.current.position.x =
      basePosition.x + Math.cos(t * memory.floatSpeed * 0.35) * memory.floatAmp * 0.45
    groupRef.current.rotation.z =
      layout.rotation[2] + Math.sin(t * memory.floatSpeed * 0.4) * 0.025
  })

  return (
    <group
      ref={groupRef}
      position={layout.position}
      rotation={layout.rotation}
      onClick={(event) => {
        event.stopPropagation()
        onSelect(memory)
      }}
      onPointerOver={(event) => {
        event.stopPropagation()
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto'
      }}
    >
      <mesh position={[0, 0, -0.02]} scale={[1.04, 1.04, 1]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color="#f8d4e8" transparent opacity={0.22} />
      </mesh>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.85}
          metalness={0.05}
          emissive="#2a1838"
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  )
}
