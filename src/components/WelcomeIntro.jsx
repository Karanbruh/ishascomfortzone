import { useCallback, useEffect, useId, useRef, useState } from 'react'
import styles from './WelcomeIntro.module.css'

const MESSAGES = [
  'there is someone who makes my world a little softer…',
  "since us, i've been the happiest ♡",
  'you mean a lot to me, isha.',
  'i want to be the safe space for you, someone who feels like home.',
  'and when i\'m not with you, you can come here and find that safe space, always ♡',
  'welcome to your little comfort corner, isha ♡',
]

/** Per-message dwell (ms) — longer lines get more reading time. */
const MESSAGE_DWELLS = [2400, 2400, 2600, 3600, 4200, 2800]
const MESSAGE_DWELLS_REDUCED = [1800, 1800, 2000, 2800, 3200, 2200]

const PETALS = [
  { left: '6%', delay: '0s', duration: '11s', size: 10, drift: -18 },
  { left: '14%', delay: '1.2s', duration: '13s', size: 14, drift: 22 },
  { left: '22%', delay: '0.4s', duration: '10s', size: 9, drift: -12 },
  { left: '31%', delay: '2.1s', duration: '14s', size: 12, drift: 16 },
  { left: '40%', delay: '0.8s', duration: '12s', size: 11, drift: -24 },
  { left: '48%', delay: '1.7s', duration: '11.5s', size: 13, drift: 10 },
  { left: '56%', delay: '0.2s', duration: '13.5s', size: 8, drift: -15 },
  { left: '64%', delay: '2.6s', duration: '10.5s', size: 15, drift: 20 },
  { left: '72%', delay: '1.1s', duration: '12.5s', size: 10, drift: -8 },
  { left: '79%', delay: '0.6s', duration: '11s', size: 12, drift: 14 },
  { left: '86%', delay: '1.9s', duration: '14s', size: 9, drift: -20 },
  { left: '93%', delay: '0.9s', duration: '12s', size: 11, drift: 18 },
  { left: '18%', delay: '3.2s', duration: '13s', size: 13, drift: -10 },
  { left: '52%', delay: '2.8s', duration: '10s', size: 8, drift: 12 },
  { left: '68%', delay: '3.5s', duration: '11.5s', size: 14, drift: -16 },
  { left: '35%', delay: '4s', duration: '12s', size: 10, drift: 8 },
]

const STARS = [
  { top: '12%', left: '18%', size: 2, delay: '0s' },
  { top: '18%', left: '72%', size: 2.5, delay: '0.6s' },
  { top: '28%', left: '8%', size: 1.5, delay: '1.2s' },
  { top: '22%', left: '88%', size: 2, delay: '0.3s' },
  { top: '38%', left: '42%', size: 1.5, delay: '1.8s' },
  { top: '15%', left: '55%', size: 2, delay: '0.9s' },
  { top: '45%', left: '92%', size: 1.5, delay: '1.4s' },
  { top: '8%', left: '35%', size: 2.5, delay: '0.2s' },
  { top: '52%', left: '12%', size: 1.5, delay: '2s' },
  { top: '35%', left: '65%', size: 2, delay: '0.7s' },
]

function Petal({ left, delay, duration, size, drift }) {
  return (
    <span
      className={styles.petal}
      style={{
        left,
        width: size,
        height: size * 1.35,
        animationDelay: delay,
        animationDuration: duration,
        '--drift': `${drift}px`,
      }}
      aria-hidden="true"
    />
  )
}

/**
 * Karan — blue shirt, blue jeans, middle-part wavy hair.
 * Base layer behind Isha. Rear hug arm only peeks past her far side.
 * Front wrap arm rendered separately above Isha (KaranFrontArm).
 */
function KaranFigure() {
  return (
    <svg
      className={styles.figureSvg}
      viewBox="0 0 110 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Rear hug: forearm + hand peeking past Isha's far side */}
      <g className={`${styles.poseHug} ${styles.armWrap} ${styles.karanRearArm}`}>
        <path
          d="M72 102 C90 108 102 120 100 136 L90 134 C92 122 84 114 72 110 Z"
          fill="#4a6fa5"
        />
        <ellipse cx="98" cy="138" rx="6.5" ry="6" fill="#e8d4c4" />
      </g>

      {/* Rest far arm */}
      <g className={styles.poseRest}>
        <path
          d="M66 88 C76 98 80 116 74 136 L66 134 C70 118 68 102 60 94 Z"
          fill="#5a7fb8"
        />
        <ellipse cx="70" cy="138" rx="6" ry="5.5" fill="#e8d4c4" />
      </g>

      {/* Blue shirt + denim jeans — centered under leftward head */}
      <g className={styles.torso}>
        <rect x="34" y="62" width="12" height="10" rx="4" fill="#e8d4c4" />
        {/* Short sleeves */}
        <ellipse cx="28" cy="82" rx="9" ry="7" fill="#5a7fb8" />
        <ellipse cx="60" cy="82" rx="9" ry="7" fill="#5a7fb8" />
        {/* Shirt torso ending at waist */}
        <path
          d="M26 78 C27 68 34 66 44 66 C54 66 61 68 62 78 L64 118 C64 122 56 124 44 124 C32 124 24 122 24 118 Z"
          fill="#4a6fa5"
        />
        {/* Neckline */}
        <path
          d="M34 72 C36 80 40 84 44 84 C48 84 52 80 54 72"
          fill="#3d5f8f"
        />
        {/* Shirt folds */}
        <path
          d="M34 96 C38 100 42 102 48 100"
          stroke="#3a5a8a"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M36 108 C40 112 46 114 52 112"
          stroke="#3a5a8a"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.35"
        />
        {/* Waistband */}
        <rect x="26" y="120" width="36" height="6" rx="2" fill="#2e4570" />
        {/* Denim jeans — two distinct legs */}
        <path
          d="M26 126 L28 174 C28 178 32 180 36 180 L40 180 C42 180 43 176 42 172 L40 126 Z"
          fill="#35557a"
        />
        <path
          d="M46 126 L48 172 C47 176 48 180 50 180 L54 180 C58 180 62 178 62 174 L64 126 Z"
          fill="#35557a"
        />
        {/* Seam lines */}
        <path
          d="M33 128 L34 172"
          stroke="#2a4460"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M55 128 L56 172"
          stroke="#2a4460"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />
        <ellipse cx="36.5" cy="178" rx="7" ry="4" fill="#2a2238" />
        <ellipse cx="50.5" cy="178" rx="7" ry="4" fill="#2a2238" />
      </g>

      {/* Rest near arm */}
      <g className={styles.poseRest}>
        <path
          d="M30 88 C18 98 14 116 20 136 L28 134 C24 118 26 102 36 94 Z"
          fill="#6a8fc4"
        />
        <ellipse cx="24" cy="138" rx="6" ry="5.5" fill="#e8d4c4" />
      </g>

      {/* Head — middle-parted wavy black hair, face visible beside Isha */}
      <g className={styles.headGroup}>
        {/* Back hair volume behind head */}
        <path
          d="M17 44 C14 24 24 6 40 4 C56 6 66 24 63 44 C61 28 54 16 40 14 C26 16 19 28 17 44Z"
          fill="#0e0c10"
        />
        <circle cx="40" cy="42" r="21" fill="#e8d4c4" />
        {/* Left crown mound from part */}
        <path
          d="M40 8 C32 8 24 14 20 26 C18 34 19 42 22 46 C24 38 28 28 36 22 C38 16 39 10 40 8Z"
          fill="#141218"
        />
        {/* Right crown mound from part */}
        <path
          d="M40 8 C48 8 56 14 60 26 C62 34 61 42 58 46 C56 38 52 28 44 22 C42 16 41 10 40 8Z"
          fill="#141218"
        />
        {/* Left wavy locks — jaw length */}
        <path
          d="M20 38 C14 44 12 50 16 56 C18 60 24 58 26 54 C24 48 24 42 28 40 C25 39 22 38 20 38Z"
          fill="#141218"
        />
        <path
          d="M24 34 C18 42 17 50 22 56 C24 58 28 56 28 52 C26 46 28 40 32 36Z"
          fill="#1c1a20"
        />
        <path
          d="M28 30 C24 36 24 44 28 50 C30 52 32 50 32 48 C30 42 32 36 36 32Z"
          fill="#141218"
          opacity="0.85"
        />
        {/* Right wavy locks — jaw length */}
        <path
          d="M60 38 C66 44 68 50 64 56 C62 60 56 58 54 54 C56 48 56 42 52 40 C55 39 58 38 60 38Z"
          fill="#141218"
        />
        <path
          d="M56 34 C62 42 63 50 58 56 C56 58 52 56 52 52 C54 46 52 40 48 36Z"
          fill="#1c1a20"
        />
        <path
          d="M52 30 C56 36 56 44 52 50 C50 52 48 50 48 48 C50 42 48 36 44 32Z"
          fill="#141218"
          opacity="0.85"
        />
        {/* Center part gap */}
        <path
          d="M40 6 L40 24"
          stroke="#08070a"
          strokeWidth="2.8"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Soft wave texture */}
        <path
          d="M26 28 Q20 38 24 50"
          stroke="#08070a"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.35"
        />
        <path
          d="M54 28 Q60 38 56 50"
          stroke="#08070a"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.35"
        />
        {/* Face */}
        <ellipse cx="32" cy="44" rx="2.3" ry="2.7" fill="#4a3058" opacity="0.9" />
        <ellipse cx="48" cy="44" rx="2.3" ry="2.7" fill="#4a3058" opacity="0.9" />
        <path
          d="M35 54 Q40 59 45 54"
          stroke="#c48898"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="24" cy="50" r="3.4" fill="#f0a0c0" opacity="0.32" />
        <circle cx="56" cy="50" r="3.4" fill="#f0a0c0" opacity="0.32" />
      </g>
    </svg>
  )
}

/**
 * Karan's near arm wrapping around Isha — drawn above her body.
 * Shoulder → elbow → hand resting on her upper back / side.
 */
function KaranFrontArm() {
  return (
    <svg
      className={styles.frontArmSvg}
      viewBox="0 0 110 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g className={`${styles.armWrap} ${styles.karanFrontArm}`}>
        {/* Shoulder cap at left shoulder */}
        <ellipse cx="30" cy="84" rx="8" ry="7" fill="#6a8fc4" />
        {/* Upper arm to elbow at waist */}
        <path
          d="M24 86 C16 100 20 114 34 120 L40 112 C30 108 28 96 34 90 Z"
          fill="#5a7fb8"
        />
        {/* Forearm wrapping across Isha's upper back */}
        <path
          d="M34 118 C52 132 74 136 94 128 L90 118 C74 124 56 122 42 112 Z"
          fill="#5a7fb8"
        />
        <ellipse cx="96" cy="124" rx="7" ry="6.5" fill="#e8d4c4" />
        <ellipse cx="99" cy="121" rx="2.2" ry="1.8" fill="#d4b8a8" opacity="0.45" />
      </g>
    </svg>
  )
}

/**
 * Isha — black T-shirt, green pants, bangs, septum ring.
 * Front hug arm wraps onto Karan's back; rear arm peeks on his far side.
 */
function IshaFigure() {
  return (
    <svg
      className={styles.figureSvg}
      viewBox="0 0 110 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Rear hug: forearm + hand peeking on Karan's far side */}
      <g className={`${styles.poseHug} ${styles.armWrap} ${styles.ishaRearArm}`}>
        <path
          d="M34 102 C16 108 4 120 6 136 L16 134 C14 122 22 114 34 110 Z"
          fill="#2a2430"
        />
        <ellipse cx="8" cy="138" rx="6.5" ry="6" fill="#f0dcc8" />
      </g>

      {/* Rest far arm */}
      <g className={styles.poseRest}>
        <path
          d="M40 88 C28 98 24 116 30 136 L38 134 C34 118 36 102 46 94 Z"
          fill="#3a3440"
        />
        <ellipse cx="34" cy="138" rx="6" ry="5.5" fill="#f0dcc8" />
      </g>

      {/* Black T-shirt + green trousers */}
      <g className={styles.torso}>
        <rect x="58" y="58" width="12" height="10" rx="4" fill="#f0dcc8" />
        {/* Short sleeves */}
        <ellipse cx="48" cy="78" rx="9" ry="7" fill="#3a3440" />
        <ellipse cx="80" cy="78" rx="9" ry="7" fill="#3a3440" />
        {/* T-shirt torso ending at waist */}
        <path
          d="M44 74 C45 64 54 60 64 60 C74 60 83 64 84 74 L86 118 C86 122 78 124 64 124 C50 124 42 122 42 118 Z"
          fill="#1a1520"
        />
        {/* Charcoal highlight so black reads on dark sky */}
        <path
          d="M48 80 C50 72 56 68 64 68 C72 68 78 72 80 80 L82 112 C80 108 72 106 64 106 C56 106 48 108 46 112 Z"
          fill="#2a2430"
          opacity="0.55"
        />
        {/* Neckline */}
        <path
          d="M54 68 C56 78 60 84 64 84 C68 84 72 78 74 68"
          fill="#2e2834"
        />
        {/* Fabric folds */}
        <path
          d="M52 94 C56 100 60 106 58 114"
          stroke="#3a3440"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M70 94 C72 102 74 110 72 116"
          stroke="#3a3440"
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity="0.45"
        />
        {/* Waistband */}
        <rect x="44" y="120" width="40" height="6" rx="2" fill="#2f4a34" />
        {/* Green trousers — two distinct legs */}
        <path
          d="M44 126 L46 168 C46 172 50 174 54 174 L58 174 C60 174 61 170 60 166 L58 126 Z"
          fill="#3d5a40"
        />
        <path
          d="M68 126 L70 166 C69 170 70 174 72 174 L76 174 C80 174 84 172 84 168 L86 126 Z"
          fill="#3d5a40"
        />
        {/* Leg shading */}
        <path
          d="M50 130 L51 166"
          stroke="#2f4a34"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M76 130 L77 166"
          stroke="#2f4a34"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.45"
        />
        <ellipse cx="54" cy="172" rx="7" ry="4" fill="#121018" />
        <ellipse cx="74" cy="172" rx="7" ry="4" fill="#121018" />
      </g>

      {/* Rest near arm */}
      <g className={styles.poseRest}>
        <path
          d="M72 88 C84 98 88 116 82 136 L74 134 C78 118 76 102 66 94 Z"
          fill="#3a3440"
        />
        <ellipse cx="78" cy="138" rx="6" ry="5.5" fill="#f0dcc8" />
      </g>

      {/* Front hug arm — shoulder → elbow → hand on Karan's back */}
      <g className={`${styles.poseHug} ${styles.armWrap} ${styles.ishaFrontArm}`}>
        <ellipse cx="80" cy="80" rx="8" ry="7" fill="#3a3440" />
        <path
          d="M84 82 C92 96 88 110 74 116 L68 108 C78 104 80 92 74 86 Z"
          fill="#3a3440"
        />
        <path
          d="M74 114 C56 128 34 132 14 124 L18 114 C34 120 52 118 66 108 Z"
          fill="#2a2430"
        />
        <ellipse cx="12" cy="120" rx="7" ry="6.5" fill="#f0dcc8" />
        <ellipse cx="9" cy="117" rx="2.2" ry="1.8" fill="#e0c4b0" opacity="0.45" />
      </g>

      {/* Head — bangs, side framing, septum; cheek-to-cheek with Karan */}
      <g className={styles.headGroup}>
        {/* Back hair volume */}
        <path
          d="M42 44 C38 22 48 4 64 2 C80 4 90 22 86 44 C84 28 76 14 64 12 C52 14 44 28 42 44Z"
          fill="#1a1218"
        />
        <circle cx="64" cy="40" r="20" fill="#f0dcc8" />
        {/* Left side framing lock */}
        <path
          d="M44 38 C36 50 34 68 40 92 C38 70 38 52 44 38Z"
          fill="#1a1218"
        />
        <path
          d="M46 36 C40 48 40 64 44 84 C46 68 48 50 52 40Z"
          fill="#2a1824"
        />
        {/* Right side framing lock */}
        <path
          d="M84 38 C92 50 94 68 88 92 C90 70 90 52 84 38Z"
          fill="#1a1218"
        />
        <path
          d="M82 36 C88 48 88 64 84 84 C82 68 80 50 76 40Z"
          fill="#2a1824"
        />
        {/* Crown volume */}
        <ellipse cx="64" cy="12" rx="16" ry="8" fill="#1f121c" />
        {/* Distinct bang lobes across forehead */}
        <path
          d="M46 28 C48 18 52 14 56 16 C55 24 54 32 52 36 C50 34 48 32 46 28Z"
          fill="#1a1218"
        />
        <path
          d="M54 16 C56 12 60 10 64 12 C64 22 63 32 62 36 C58 30 56 22 54 16Z"
          fill="#2a1824"
        />
        <path
          d="M62 12 C66 10 70 12 72 16 C70 22 68 30 66 36 C64 32 63 22 62 12Z"
          fill="#1a1218"
        />
        <path
          d="M70 14 C74 12 78 14 82 22 C80 28 78 34 76 36 C74 32 72 24 70 14Z"
          fill="#2a1824"
        />
        <path
          d="M78 20 C82 18 86 24 86 32 C84 34 82 34 80 32 C80 28 79 24 78 20Z"
          fill="#1a1218"
        />
        {/* Soft bang highlight */}
        <path
          d="M58 18 C60 16 64 15 68 17"
          stroke="#3a2430"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.4"
        />
        {/* Face */}
        <ellipse cx="56" cy="42" rx="2" ry="2.4" fill="#5a3048" opacity="0.85" />
        <ellipse cx="72" cy="42" rx="2" ry="2.4" fill="#5a3048" opacity="0.85" />
        <path
          d="M62 46 L64 50 L66 46"
          stroke="#d4b8a8"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.55"
        />
        {/* Septum — delicate silver ring, clear of bangs */}
        <ellipse cx="64" cy="52.5" rx="3.6" ry="2.7" fill="none" stroke="#c8d0d8" strokeWidth="1.5" />
        <ellipse cx="64" cy="52.5" rx="3.6" ry="2.7" fill="none" stroke="#f4f7fa" strokeWidth="0.55" opacity="0.75" />
        <path
          d="M57 54 Q64 59 71 54"
          stroke="#d48898"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="48" cy="48" r="3.2" fill="#f0a0c0" opacity="0.32" />
        <circle cx="80" cy="48" r="3.2" fill="#f0a0c0" opacity="0.32" />
      </g>
    </svg>
  )
}

export default function WelcomeIntro({ onComplete }) {
  const titleId = useId()
  const overlayRef = useRef(null)
  const exitingRef = useRef(false)
  const completedRef = useRef(false)
  const timersRef = useRef([])
  const [isExiting, setIsExiting] = useState(false)
  const [isHugging, setIsHugging] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [messageIndex, setMessageIndex] = useState(-1)
  const [showCta, setShowCta] = useState(false)

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
  }, [])

  const finishComplete = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    clearTimers()
    onComplete?.()
  }, [clearTimers, onComplete])

  const beginExit = useCallback(() => {
    if (exitingRef.current) return
    exitingRef.current = true
    clearTimers()
    setIsExiting(true)

    const overlay = overlayRef.current
    let settled = false

    const settle = () => {
      if (settled) return
      settled = true
      finishComplete()
    }

    const onTransitionEnd = (event) => {
      if (event.target !== overlay) return
      if (event.propertyName !== 'opacity') return
      overlay?.removeEventListener('transitionend', onTransitionEnd)
      settle()
    }

    overlay?.addEventListener('transitionend', onTransitionEnd)
    const fallback = window.setTimeout(settle, 650)
    timersRef.current.push(fallback)
  }, [clearTimers, finishComplete])

  useEffect(() => {
    const schedule = (fn, ms) => {
      const id = window.setTimeout(fn, ms)
      timersRef.current.push(id)
      return id
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!reduced) {
      schedule(() => setIsHugging(true), 4200)
    }

    // Opening early; later lines align with appear → approach → hug hold.
    const startDelay = reduced ? 400 : 900
    const dwells = reduced ? MESSAGE_DWELLS_REDUCED : MESSAGE_DWELLS

    let elapsed = startDelay

    MESSAGES.forEach((_, index) => {
      schedule(() => setMessageIndex(index), elapsed)
      elapsed += dwells[index] ?? dwells[dwells.length - 1]
    })

    schedule(() => setShowCta(true), elapsed)

    return clearTimers
  }, [clearTimers])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        beginExit()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [beginExit])

  const activeMessage = messageIndex >= 0 ? MESSAGES[messageIndex] : null
  const stageClass = [
    styles.stage,
    isHugging ? styles.stageHugging : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      ref={overlayRef}
      className={`${styles.overlay} ${isExiting ? styles.exiting : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className={styles.sky} aria-hidden="true">
        <div className={styles.glowLavender} />
        <div className={styles.glowPink} />
        <div className={`${styles.moonWrap} ${isHugging ? styles.moonBright : ''}`}>
          <div className={styles.moonGlow} />
          <div className={styles.moon} />
        </div>
        {STARS.map((star, index) => (
          <span
            key={index}
            className={styles.star}
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}
        <div className={`${styles.sparkleLayer} ${isHugging ? styles.sparkleVisible : ''}`}>
          <span className={styles.sparkle} style={{ top: '42%', left: '46%' }} />
          <span className={styles.sparkle} style={{ top: '48%', left: '54%', animationDelay: '0.8s' }} />
          <span className={styles.sparkle} style={{ top: '40%', left: '52%', animationDelay: '1.4s' }} />
        </div>
      </div>

      <div className={styles.petals} aria-hidden="true">
        {PETALS.map((petal, index) => (
          <Petal key={index} {...petal} />
        ))}
      </div>

      <button
        type="button"
        className={styles.skip}
        onClick={beginExit}
        disabled={isExiting}
      >
        skip
      </button>

      <div className={stageClass} aria-hidden="true">
        <div className={`${styles.character} ${styles.karan}`}>
          <KaranFigure />
          <span className={styles.name}>Karan</span>
        </div>
        <div className={`${styles.character} ${styles.isha}`}>
          <IshaFigure />
          <span className={styles.name}>Isha</span>
        </div>
        <div className={styles.karanFrontArmLayer} aria-hidden="true">
          <KaranFrontArm />
          <span className={styles.nameSpacer} />
        </div>
      </div>

      <div className={styles.copy}>
        <h2 id={titleId} className={styles.visuallyHidden}>
          Welcome to Isha&apos;s Little Comfort Corner
        </h2>
        <div className={styles.messageSlot} aria-live="polite">
          {activeMessage ? (
            <p key={messageIndex} className={`${styles.message} ${styles.messageVisible}`}>
              {activeMessage}
            </p>
          ) : (
            <p className={styles.message}>{'\u00a0'}</p>
          )}
        </div>

        {showCta && (
          <button
            type="button"
            className={styles.enter}
            onClick={beginExit}
            disabled={isExiting}
          >
            come in, baby ♡
          </button>
        )}
      </div>
    </div>
  )
}
