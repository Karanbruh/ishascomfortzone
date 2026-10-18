import { useState } from 'react'
import { openWhenCards } from '../data/content'
import ComfortModal from './ComfortModal'
import OpenWhenCard from './OpenWhenCard'
import styles from './OpenWhen.module.css'

export default function OpenWhen() {
  const [active, setActive] = useState(null)

  return (
    <section className={`section ${styles.section}`}>
      <h2 className="sectionHeading">open one whenever you need me 💌</h2>
      <p className="sectionSub">little messages from your idiot boyfriend.</p>

      <div className={styles.grid}>
        {openWhenCards.map((card) => (
          <OpenWhenCard key={card.id} label={card.label} onClick={() => setActive(card)} />
        ))}
      </div>

      <ComfortModal
        open={Boolean(active)}
        title={active?.label ?? ''}
        message={active?.message ?? ''}
        afterthought={active?.afterthought}
        onClose={() => setActive(null)}
        letter
      />
    </section>
  )
}
