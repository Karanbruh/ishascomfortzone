import styles from './Hero.module.css'

export default function Hero() {
  const scrollIn = () => {
    document.getElementById('comfort-menu')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.hero} aria-label="Welcome">
      <div className={styles.moonWrap} aria-hidden="true">
        <div className={styles.moonGlow} />
        <div className={styles.moon} />
      </div>

      <div className={styles.content}>
        <h1 className={styles.heading}>hey ishaaa 🌙</h1>
        <p className={styles.line}>i know today isn&apos;t exactly your favourite day...</p>
        <p className={styles.line}>
          so i made you a tiny little corner on the internet where you don&apos;t have to do anything.
        </p>
        <p className={styles.soft}>you can just exist here, okay baby? 🥺🫂</p>

        <button type="button" className={`primaryBtn ${styles.cta}`} onClick={scrollIn}>
          come inside, baby →
        </button>
      </div>

      <p className={styles.credit}>made with way too much love by karan ❤️</p>
    </section>
  )
}
