import styles from './OpenWhenCard.module.css'

export default function OpenWhenCard({ label, onClick }) {
  return (
    <button type="button" className={styles.envelope} onClick={onClick}>
      <span className={styles.flap} aria-hidden="true" />
      <span className={styles.seal} aria-hidden="true">
        💌
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  )
}
