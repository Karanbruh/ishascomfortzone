import { useCallback, useEffect, useState } from 'react'
import './App.css'
import BackgroundMusic from './components/BackgroundMusic'
import BackgroundStars from './components/BackgroundStars'
import ComfortMenu from './components/ComfortMenu'
import EmergencyKit from './components/EmergencyKit'
import FinalSection from './components/FinalSection'
import Hero from './components/Hero'
import MemoryGalaxy from './components/MemoryGalaxy/MemoryGalaxy'
import OpenWhen from './components/OpenWhen'
import SecretMessage from './components/SecretMessage'
import SiteFooter from './components/SiteFooter'
import StarWhispers from './components/StarWhispers'
import TonightAgenda from './components/TonightAgenda'
import WelcomeIntro from './components/WelcomeIntro'

export default function App() {
  const [starsBrighter, setStarsBrighter] = useState(false)
  const [introActive, setIntroActive] = useState(true)

  const handleSecretReveal = useCallback((revealed) => {
    setStarsBrighter(revealed)
  }, [])

  useEffect(() => {
    if (!introActive) return undefined
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [introActive])

  return (
    <>
      <BackgroundStars brighter={starsBrighter} />
      <BackgroundMusic />
      {introActive && (
        <WelcomeIntro onComplete={() => setIntroActive(false)} />
      )}
      <main
        className="app"
        inert={introActive || undefined}
        aria-hidden={introActive || undefined}
      >
        <StarWhispers />
        <Hero />
        <ComfortMenu />
        <EmergencyKit />
        <OpenWhen />
        <TonightAgenda />
        <MemoryGalaxy />
        <SecretMessage onRevealChange={handleSecretReveal} />
        <FinalSection />
        <SiteFooter />
      </main>
    </>
  )
}
