import { useEffect, useState } from 'react'
import FloatingHearts from './FloatingHearts'
import styles from './SecretMessage.module.css'

export default function SecretMessage({ onRevealChange }) {
  const [revealed, setRevealed] = useState(false)
  const [cuddleSent, setCuddleSent] = useState(false)
  const [hearts, setHearts] = useState(false)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    onRevealChange?.(revealed)
  }, [revealed, onRevealChange])

  useEffect(() => {
    if (!revealed) {
      return undefined
    }
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [revealed])

  const sendCuddle = () => {
    setHearts(true)
    setPulse(true)
    setCuddleSent(true)
    window.setTimeout(() => setPulse(false), 600)
  }

  return (
    <section className={`section ${styles.section}`}>
      <button
        type="button"
        className={styles.mystery}
        onClick={() => setRevealed(true)}
      >
        don&apos;t click this 👀
      </button>

      {revealed ? (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Secret message">
          <div className={`${styles.panel} ${pulse ? styles.pulse : ''}`}>
            <button
              type="button"
              className={styles.close}
              onClick={() => setRevealed(false)}
              aria-label="Close secret"
            >
              ✕
            </button>

            <p className={styles.lead}>okay fine 😭</p>
            <p className={styles.lead}>you caught me.</p>
            <p className={styles.mid}>i just wanted another excuse to tell you...</p>

            <p className={styles.love}>i love you, isha. ❤️</p>

            <div className={styles.body}>
              <p>even on your worst days.</p>
              <p>even when you&apos;re tired.</p>
              <p>even when you&apos;re annoyed.</p>
              <p>even when you&apos;re quiet.</p>
              <p>even when you don&apos;t feel like yourself.</p>
              <p className={styles.gap}>you don&apos;t have to be anything for me.</p>
              <p>you can just be my girl.</p>
              <p>and i&apos;ll still be here.</p>
              <p className={styles.sign}>— karan 🫂</p>
            </div>

            <button type="button" className={`primaryBtn ${styles.cuddleBtn}`} onClick={sendCuddle}>
              send karan a cuddle 🫂
            </button>

            {cuddleSent ? (
              <p className={styles.delivered} role="status">
                cuddle successfully delivered to karan ❤️
              </p>
            ) : null}
          </div>

          <FloatingHearts active={hearts} count={24} onDone={() => setHearts(false)} />
        </div>
      ) : null}
    </section>
  )
}
