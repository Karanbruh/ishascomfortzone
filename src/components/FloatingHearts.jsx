import { useEffect, useRef, useState } from 'react'
import styles from './FloatingHearts.module.css'

function createHearts(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: `${Date.now()}-${index}`,
    left: `${8 + ((index * 17) % 84)}%`,
    delay: `${index * 0.08}s`,
    duration: `${2.2 + (index % 4) * 0.35}s`,
    size: 12 + (index % 5) * 4,
    emoji: index % 3 === 0 ? '💗' : index % 3 === 1 ? '❤️' : '💕',
  }))
}

export default function FloatingHearts({ count = 16, active = true, onDone }) {
  const [wasActive, setWasActive] = useState(active)
  const [hearts, setHearts] = useState(() => (active ? createHearts(count) : []))
  const onDoneRef = useRef(onDone)

  if (active !== wasActive) {
    setWasActive(active)
    setHearts(active ? createHearts(count) : [])
  }

  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    if (!active) {
      return undefined
    }

    const timeout = window.setTimeout(() => {
      onDoneRef.current?.()
    }, 3200)

    return () => window.clearTimeout(timeout)
  }, [active, hearts])

  if (hearts.length === 0) {
    return null
  }

  return (
    <div className={styles.layer} aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className={styles.heart}
          style={{
            left: heart.left,
            fontSize: heart.size,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  )
}
