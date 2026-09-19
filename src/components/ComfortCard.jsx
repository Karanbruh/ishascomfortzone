import styles from './ComfortCard.module.css'

export default function ComfortCard({ emoji, label, onClick }) {
  return (
    <button type="button" className={styles.card} onClick={onClick}>
      <span className={styles.emoji} aria-hidden="true">
        {emoji}
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  )
}
