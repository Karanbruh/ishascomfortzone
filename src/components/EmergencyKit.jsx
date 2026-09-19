import { useState } from 'react'
import { emergencyKit } from '../data/content'
import EmergencyItem from './EmergencyItem'
import styles from './EmergencyKit.module.css'

export default function EmergencyKit() {
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <section className={`section ${styles.section}`}>
      <h2 className="sectionHeading">isha&apos;s emergency comfort kit 🧸</h2>
      <p className="sectionSub">
        because apparently your boyfriend has decided he&apos;s qualified to run a comfort department.
      </p>

      <div className={styles.list}>
        {emergencyKit.map((item) => (
          <EmergencyItem
            key={item.id}
            emoji={item.emoji}
            label={item.label}
            message={item.message}
            expanded={openId === item.id}
            onToggle={() => toggle(item.id)}
          />
        ))}
      </div>
    </section>
  )
}
