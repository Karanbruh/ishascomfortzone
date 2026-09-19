import { Suspense, useMemo } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { memoryPhotos } from './memories'
import FloatingMemory from './FloatingMemory'
import MemoryVideoCard from './MemoryVideoCard'
import {
  CentralHeart,
  GlowingMoon,
  NebulaGlow,
  SoftParticles,
} from './SceneElements'

function SceneContent({ onPhotoSelect, onVideoSelect, reducedMotion }) {
  const { size } = useThree()
  const isMobile = size.width < 640
  const particleCount = isMobile ? 40 : 60

  const photos = useMemo(() => memoryPhotos, [])

  return (
    <>
      <color attach="background" args={['#0f0a1e']} />
      <fog attach="fog" args={['#0f0a1e', 6, 14]} />
      <ambientLight intensity={0.45} color="#d4c4f0" />
      <directionalLight position={[3, 4, 5]} intensity={0.35} color="#f7efe3" />
      <pointLight position={[-3, 2, 2]} intensity={0.25} color="#f0a0c0" />

      <NebulaGlow />
      <SoftParticles count={particleCount} reducedMotion={reducedMotion} />
      <GlowingMoon reducedMotion={reducedMotion} />
      <CentralHeart reducedMotion={reducedMotion} isMobile={isMobile} />

      {photos.map((photo) => (
        <FloatingMemory
          key={photo.id}
          memory={photo}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
          onSelect={onPhotoSelect}
        />
      ))}

      <MemoryVideoCard
        isMobile={isMobile}
        reducedMotion={reducedMotion}
        onSelect={onVideoSelect}
      />
    </>
  )
}

export default function MemoryScene({
  onPhotoSelect,
  onVideoSelect,
  reducedMotion,
  active,
}) {
  const isNarrow =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches

  return (
    <Canvas
      dpr={isNarrow ? 1 : [1, 1.5]}
      camera={{
        position: isNarrow ? [0, 0.1, 5.6] : [0, 0.05, 6.4],
        fov: isNarrow ? 46 : 40,
        near: 0.1,
        far: 40,
      }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      style={{ width: '100%', height: '100%', borderRadius: 'inherit' }}
      onCreated={({ gl }) => {
        gl.setClearColor('#0f0a1e')
      }}
    >
      <Suspense fallback={null}>
        <SceneContent
          onPhotoSelect={onPhotoSelect}
          onVideoSelect={onVideoSelect}
          reducedMotion={reducedMotion}
        />
      </Suspense>
    </Canvas>
  )
}
