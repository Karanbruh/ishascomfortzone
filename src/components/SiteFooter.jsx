import styles from './SiteFooter.module.css'

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.exclusive}>made exclusively for isha.</p>
      <p className={styles.version}>version 1.0 of karan&apos;s boyfriend services™</p>
      <p className={styles.copy}>© 2026 Karan&apos;s Extremely Serious Boyfriend Department</p>
    </footer>
  )
}
