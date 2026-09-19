import styles from './FinalSection.module.css'

export default function FinalSection() {
  return (
    <section className={`section ${styles.section}`} aria-label="Goodnight">
      <div className={styles.moonWrap} aria-hidden="true">
        <div className={styles.cloud} />
        <div className={styles.cloudTwo} />
        <div className={styles.moonGlow} />
        <div className={styles.moon} />
      </div>

      <p className={styles.lead}>okay baby, that&apos;s enough internet for today 🌙</p>
      <p className={styles.line}>drink some water.</p>
      <p className={styles.line}>get cozy.</p>
      <p className={styles.line}>rest that pretty head.</p>
      <p className={styles.remember}>and remember...</p>
      <p className={styles.big}>someone loves you very, very much. ❤️</p>
      <p className={styles.night}>goodnight, isha.</p>
      <p className={styles.sign}>— karan</p>
    </section>
  )
}
