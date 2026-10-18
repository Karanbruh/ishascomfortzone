import { useCallback, useState, useSyncExternalStore } from 'react'
import { starWhispers } from '../data/content'
import styles from './StarWhispers.module.css'

/** Matches BackgroundStars position formula so hit targets sit on the same stars. */
function starPosition(index) {
  return {
    left: `${(index * 37) % 100}%`,
    top: `${(index * 53 + 11) % 100}%`,
  }
}

function subscribeModalOpen(callback) {
  const observer = new MutationObserver(callback)
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class'],
  })
  return () => observer.disconnect()
}

function getModalOpenSnapshot() {
  return document.body.classList.contains('modal-open')
}

function getModalOpenServerSnapshot() {
  return false
}

function useModalBlocked() {
  return useSyncExternalStore(
    subscribeModalOpen,
    getModalOpenSnapshot,
    getModalOpenServerSnapshot,
  )
}

export default function StarWhispers() {
  const [toast, setToast] = useState(null)
  const [found, setFound] = useState(() => ({}))
  const blocked = useModalBlocked()

  const reveal = useCallback(
    (starId, text) => {
      if (blocked || found[starId]) {
        return
      }
      setFound((prev) => ({ ...prev, [starId]: true }))
      setToast(text)
    },
    [blocked, found],
  )

  const visibleToast = blocked ? null : toast

  return (
    <>
      <div
        className={`${styles.layer}${blocked ? ` ${styles.blocked}` : ''}`}
        aria-hidden={blocked ? true : undefined}
      >
        {starWhispers.map((whisper) => {
          const position = starPosition(whisper.starId)
          const alreadyFound = Boolean(found[whisper.starId])
          return (
            <button
              key={whisper.starId}
              type="button"
              className={styles.starHit}
              style={{ left: position.left, top: position.top }}
              onClick={() => reveal(whisper.starId, whisper.text)}
              disabled={blocked || alreadyFound}
              tabIndex={blocked || alreadyFound ? -1 : 0}
              aria-label={
                alreadyFound
                  ? 'Little star message already found'
                  : 'A little secret from karan'
              }
            />
          )
        })}
      </div>

      {visibleToast ? (
        <div className={styles.toast} role="status">
          <p className={styles.toastText}>{visibleToast}</p>
          <button
            type="button"
            className={styles.toastClose}
            onClick={() => setToast(null)}
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      ) : null}
    </>
  )
}
