import { useCallback, useState } from 'react'
import './App.css'
import BackgroundStars from './components/BackgroundStars'
import ComfortMenu from './components/ComfortMenu'
import EmergencyKit from './components/EmergencyKit'
import FinalSection from './components/FinalSection'
import Hero from './components/Hero'
import MemoryGalaxy from './components/MemoryGalaxy/MemoryGalaxy'
import OpenWhen from './components/OpenWhen'
import SecretMessage from './components/SecretMessage'
import SiteFooter from './components/SiteFooter'
import TonightAgenda from './components/TonightAgenda'

export default function App() {
  const [starsBrighter, setStarsBrighter] = useState(false)

  const handleSecretReveal = useCallback((revealed) => {
    setStarsBrighter(revealed)
  }, [])

  return (
    <>
      <BackgroundStars brighter={starsBrighter} />
      <main className="app">
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
