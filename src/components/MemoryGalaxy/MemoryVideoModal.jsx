import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import styles from './MemoryGalaxy.module.css'

export default function MemoryVideoModal({ open, video, onClose }) {
  const closeRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    if (!open) {
      return undefined
    }

    document.body.classList.add('modal-open')
    closeRef.current?.focus()
    const videoEl = videoRef.current

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', onKeyDown)
      if (videoEl) {
        videoEl.pause()
        videoEl.currentTime = 0
      }
    }
  }, [open, onClose])

  if (!open || !video) {
    return null
  }

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={styles.videoDialog}
        role="dialog"
        aria-modal="true"
        aria-label={video.label}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} strokeWidth={2} />
        </button>
        <p className={styles.videoTitle}>{video.label}</p>
        <video
          ref={videoRef}
          className={styles.videoPlayer}
          controls
          playsInline
          preload="metadata"
          poster={video.poster}
          src={video.src}
        >
          <track kind="captions" />
        </video>
      </div>
    </div>
  )
}
