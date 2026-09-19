import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { memoryPhotos, memoryVideo } from './memories'
import MemoryFallback from './MemoryFallback'
import MemoryLightbox from './MemoryLightbox'
import MemoryVideoModal from './MemoryVideoModal'
import styles from './MemoryGalaxy.module.css'

const MemoryScene = lazy(() => import('./MemoryScene'))

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl'),
    )
  } catch {
    return false
  }
}

function subscribeReducedMotion(callback) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getReducedMotionServerSnapshot() {
  return false
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  )
}

class SceneErrorCatch extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    this.props.onError?.()
  }

  render() {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}

export default function MemoryGalaxy() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [webGL] = useState(() =>
    typeof window === 'undefined' ? true : detectWebGL(),
  )
  const [sceneError, setSceneError] = useState(false)
  const [activePhoto, setActivePhoto] = useState(null)
  const [videoOpen, setVideoOpen] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const node = sectionRef.current
    if (!node) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
      },
      { rootMargin: '120px 0px', threshold: 0.08 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const handlePhotoSelect = useCallback((photo) => {
    setActivePhoto(photo)
  }, [])

  const handleVideoSelect = useCallback(() => {
    setVideoOpen(true)
  }, [])

  const use3D = webGL && !sceneError

  return (
    <section
      ref={sectionRef}
      className={`section ${styles.section}`}
      aria-label="Our little universe"
    >
      <h2 className="sectionHeading">our little universe 🌙</h2>
      <p className="sectionSub">
        a few little pieces of us, floating around in my favourite place
      </p>

      <div className={styles.stage}>
        {!use3D ? (
          <MemoryFallback
            onPhotoSelect={handlePhotoSelect}
            onVideoSelect={handleVideoSelect}
          />
        ) : (
          <div className={styles.canvasWrap}>
            {visible ? (
              <Suspense
                fallback={
                  <div className={styles.loading}>loading our little universe…</div>
                }
              >
                <SceneErrorCatch onError={() => setSceneError(true)}>
                  <MemoryScene
                    onPhotoSelect={handlePhotoSelect}
                    onVideoSelect={handleVideoSelect}
                    reducedMotion={reducedMotion}
                    active={visible}
                  />
                </SceneErrorCatch>
              </Suspense>
            ) : (
              <div className={styles.loading}>scroll a little closer…</div>
            )}
          </div>
        )}
      </div>

      <MemoryLightbox memory={activePhoto} onClose={() => setActivePhoto(null)} />
      <MemoryVideoModal
        open={videoOpen}
        video={memoryVideo}
        onClose={() => setVideoOpen(false)}
      />

      <span className={styles.srOnly} aria-hidden="true">
        {memoryPhotos.length} memories
      </span>
    </section>
  )
}
