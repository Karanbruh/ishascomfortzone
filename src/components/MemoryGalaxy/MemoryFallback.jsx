import { memoryPhotos, memoryVideo } from './memories'
import styles from './MemoryGalaxy.module.css'

export default function MemoryFallback({ onPhotoSelect, onVideoSelect }) {
  return (
    <div className={styles.fallback}>
      <div className={styles.fallbackGrid}>
        {memoryPhotos.map((photo) => (
          <button
            key={photo.id}
            type="button"
            className={styles.fallbackCard}
            onClick={() => onPhotoSelect(photo)}
          >
            <img src={photo.src} alt={photo.label} className={styles.fallbackImage} />
            <span className={styles.fallbackLabel}>{photo.label}</span>
          </button>
        ))}
        <button
          type="button"
          className={`${styles.fallbackCard} ${styles.fallbackVideo}`}
          onClick={() => onVideoSelect()}
        >
          <img
            src={memoryVideo.poster}
            alt={memoryVideo.label}
            className={styles.fallbackImage}
          />
          <span className={styles.playBadge} aria-hidden="true">
            ▶
          </span>
          <span className={styles.fallbackLabel}>{memoryVideo.label}</span>
        </button>
      </div>
      <p className={styles.names}>isha ♡ karan</p>
    </div>
  )
}
