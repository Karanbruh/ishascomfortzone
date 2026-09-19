import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'
import styles from './ComfortModal.module.css'

export default function ComfortModal({ open, title, message, onClose, letter = false }) {
  const titleId = useId()
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) {
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
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={`${styles.dialog} ${letter ? styles.letter : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
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
        {title ? (
          <h3 id={titleId} className={styles.title}>
            {title}
          </h3>
        ) : (
          <span id={titleId} className={styles.srOnly}>
            Message
          </span>
        )}
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  )
}
