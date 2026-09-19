import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import styles from './MemoryGalaxy.module.css'

export default function MemoryLightbox({ memory, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!memory) {
      return undefined
    }

    document.body.classList.add('modal-open')
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [memory, onClose])

  if (!memory) {
    return null
  }

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={styles.lightbox}
        role="dialog"
        aria-modal="true"
        aria-label={memory.label}
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
        <img src={memory.src} alt={memory.label} className={styles.lightboxImage} />
        <p className={styles.lightboxLabel}>{memory.label}</p>
      </div>
    </div>
  )
}
