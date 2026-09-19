import { useState } from 'react'
import { comfortServices } from '../data/content'
import ComfortCard from './ComfortCard'
import ComfortModal from './ComfortModal'
import styles from './ComfortMenu.module.css'

export default function ComfortMenu() {
  const [active, setActive] = useState(null)

  return (
    <section id="comfort-menu" className={`section ${styles.section}`}>
      <h2 className="sectionHeading">okayyy, what does my girl need today? 🥺</h2>
      <p className="sectionSub">pick one. boyfriend services are currently open.</p>

      <div className={styles.grid}>
        {comfortServices.map((item) => (
          <ComfortCard
            key={item.id}
            emoji={item.emoji}
            label={item.label}
            onClick={() => setActive(item)}
          />
        ))}
      </div>

      <ComfortModal
        open={Boolean(active)}
        title={active ? `${active.emoji} ${active.label}` : ''}
        message={active?.message ?? ''}
        onClose={() => setActive(null)}
      />
    </section>
  )
}
