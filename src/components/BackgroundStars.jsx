import styles from './BackgroundStars.module.css'

const STAR_COUNT = 48

function createStars() {
  return Array.from({ length: STAR_COUNT }, (_, index) => ({
    id: index,
    left: `${(index * 37) % 100}%`,
    top: `${(index * 53 + 11) % 100}%`,
    size: 1 + (index % 3),
    delay: `${(index % 8) * 0.4}s`,
    duration: `${2.5 + (index % 5) * 0.6}s`,
    opacity: 0.35 + (index % 5) * 0.12,
  }))
}

const stars = createStars()

export default function BackgroundStars({ brighter = false }) {
  return (
    <div
      className={`${styles.sky} ${brighter ? styles.brighter : ''}`}
      aria-hidden="true"
    >
      <div className={styles.glowPink} />
      <div className={styles.glowLavender} />
      {stars.map((star) => (
        <span
          key={star.id}
          className={styles.star}
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  )
}
