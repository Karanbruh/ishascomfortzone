import styles from './EmergencyItem.module.css'

export default function EmergencyItem({ emoji, label, message, expanded, onToggle }) {
  return (
    <div className={`${styles.item} ${expanded ? styles.open : ''}`}>
      <button type="button" className={styles.trigger} onClick={onToggle} aria-expanded={expanded}>
        <span className={styles.emoji} aria-hidden="true">
          {emoji}
        </span>
        <span className={styles.label}>{label}</span>
      </button>
      {expanded ? <p className={styles.message}>{message}</p> : null}
    </div>
  )
}
