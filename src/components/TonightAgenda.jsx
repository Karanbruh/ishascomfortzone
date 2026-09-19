import { useState } from 'react'
import { agendaItems } from '../data/content'
import FloatingHearts from './FloatingHearts'
import styles from './TonightAgenda.module.css'

export default function TonightAgenda() {
  const [checked, setChecked] = useState({})
  const [burst, setBurst] = useState(false)

  const checkedCount = agendaItems.filter((item) => checked[item.id]).length
  const allDone = checkedCount === agendaItems.length

  const toggle = (id) => {
    setChecked((prev) => {
      const turningOn = !prev[id]
      const next = { ...prev, [id]: turningOn }
      const nextCount = agendaItems.filter((item) => next[item.id]).length

      if (turningOn) {
        setBurst(true)
      }

      if (nextCount === agendaItems.length) {
        setBurst(true)
      }

      return next
    })
  }

  return (
    <section className={`section ${styles.section}`}>
      <h2 className="sectionHeading">tonight&apos;s very important agenda 🌙</h2>

      <ul className={styles.list}>
        {agendaItems.map((item) => {
          const isChecked = Boolean(checked[item.id])
          return (
            <li key={item.id}>
              <button
                type="button"
                className={`${styles.item} ${isChecked ? styles.done : ''}`}
                onClick={() => toggle(item.id)}
                aria-pressed={isChecked}
              >
                <span className={styles.box} aria-hidden="true">
                  {isChecked ? '♡' : ''}
                </span>
                <span className={styles.label}>{item.label}</span>
                {isChecked ? (
                  <span className={styles.sparkle} aria-hidden="true">
                    ✨
                  </span>
                ) : null}
              </button>
            </li>
          )
        })}
      </ul>

      {allDone ? (
        <p className={styles.complete} role="status">
          LOOK AT YOU 🥺❤️
          <br />
          10/10 baby behaviour.
        </p>
      ) : null}

      <div className={styles.note}>
        <p className={styles.noteLabel}>most important task:</p>
        <p className={styles.noteMain}>don&apos;t be mean to yourself today.</p>
        <p className={styles.noteBody}>
          you don&apos;t have to be happy.
          <br />
          you don&apos;t have to be productive.
          <br />
          you don&apos;t have to have energy.
          <br />
          you don&apos;t have to be anything.
        </p>
        <p className={styles.noteBody}>
          you can just have a shitty day.
          <br />
          i&apos;ll still love you exactly the same.
        </p>
      </div>

      <FloatingHearts active={burst} count={12} onDone={() => setBurst(false)} />
    </section>
  )
}
