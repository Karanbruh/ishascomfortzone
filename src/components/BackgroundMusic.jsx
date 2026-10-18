import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import styles from './BackgroundMusic.module.css'

const VIDEO_ID = 'l6E16JAk_Fs'
const WATCH_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`

function loadYouTubeApi() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('No window'))
  }

  if (window.YT?.Player) {
    return Promise.resolve(window.YT)
  }

  return new Promise((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady

    window.onYouTubeIframeAPIReady = () => {
      if (typeof previous === 'function') previous()
      if (window.YT?.Player) resolve(window.YT)
      else reject(new Error('YouTube API unavailable'))
    }

    if (!document.getElementById('youtube-iframe-api')) {
      const tag = document.createElement('script')
      tag.id = 'youtube-iframe-api'
      tag.src = 'https://www.youtube.com/iframe_api'
      tag.async = true
      tag.onerror = () => reject(new Error('Failed to load YouTube API'))
      document.head.appendChild(tag)
    }
  })
}

function startUnmuted(player) {
  player.unMute()
  player.setVolume(100)
  player.playVideo()
}

export default function BackgroundMusic() {
  const hostId = useId().replace(/:/g, '')
  const playerRef = useRef(null)
  const gestureCleanupRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [muted, setMuted] = useState(false)
  const [started, setStarted] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    let player = null

    const clearGestureUnlock = () => {
      gestureCleanupRef.current?.()
      gestureCleanupRef.current = null
    }

    const unlockAudioOnGesture = (ytPlayer) => {
      clearGestureUnlock()

      const unlock = (event) => {
        if (cancelled) return
        // Let the FAB's own onClick handle unmute/mute to avoid a
        // pointerdown-unmute + click-mute double toggle.
        if (event?.type === 'pointerdown' && event.target?.closest?.('[data-bg-music-fab]')) {
          return
        }
        try {
          startUnmuted(ytPlayer)
          setMuted(false)
          setStarted(true)
        } catch {
          // ignore
        }
        clearGestureUnlock()
      }

      document.addEventListener('pointerdown', unlock, { passive: true })
      document.addEventListener('keydown', unlock)
      gestureCleanupRef.current = () => {
        document.removeEventListener('pointerdown', unlock)
        document.removeEventListener('keydown', unlock)
      }
    }

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled) return

        player = new YT.Player(`yt-bg-${hostId}`, {
          videoId: VIDEO_ID,
          width: 200,
          height: 112,
          playerVars: {
            autoplay: 1,
            // Prefer audible intro music; browsers that block unmuted autoplay
            // fall back to muted playback + first-gesture unmute.
            mute: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            loop: 1,
            playlist: VIDEO_ID,
          },
          events: {
            onReady: (event) => {
              if (cancelled) return
              playerRef.current = event.target

              const fallbackMuted = () => {
                try {
                  event.target.mute()
                  event.target.setVolume(100)
                  event.target.playVideo()
                  setStarted(true)
                } catch {
                  setStarted(false)
                }
                setMuted(true)
                unlockAudioOnGesture(event.target)
              }

              try {
                startUnmuted(event.target)
                setStarted(true)
                setMuted(false)
                // Some browsers reject audible autoplay without throwing;
                // if still muted shortly after, fall back to gesture unlock.
                window.setTimeout(() => {
                  if (cancelled) return
                  try {
                    if (event.target.isMuted()) fallbackMuted()
                  } catch {
                    // ignore
                  }
                }, 500)
              } catch {
                fallbackMuted()
              }
              setReady(true)
            },
            onStateChange: (event) => {
              if (cancelled) return
              // 1 = playing
              if (event.data === 1) {
                setStarted(true)
              }
            },
            onAutoplayBlocked: (event) => {
              if (cancelled) return
              try {
                event.target.mute()
                event.target.setVolume(100)
                event.target.playVideo()
                setStarted(true)
                setMuted(true)
                unlockAudioOnGesture(event.target)
              } catch {
                setStarted(false)
                setMuted(true)
                unlockAudioOnGesture(event.target)
              }
            },
            onError: () => {
              if (!cancelled) setFailed(true)
            },
          },
        })
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })

    return () => {
      cancelled = true
      clearGestureUnlock()
      playerRef.current = null
      try {
        player?.destroy?.()
      } catch {
        // Player may already be gone
      }
    }
  }, [hostId])

  const toggleMute = useCallback(() => {
    const player = playerRef.current
    if (!player || !ready) return

    try {
      if (!started) {
        startUnmuted(player)
        setStarted(true)
        setMuted(false)
        return
      }

      if (muted) {
        startUnmuted(player)
        setMuted(false)
      } else {
        player.mute()
        setMuted(true)
      }
    } catch {
      setFailed(true)
    }
  }, [muted, ready, started])

  if (failed) {
    return (
      <a
        className={styles.fab}
        href={WATCH_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Khat by Navjot Ahuja on YouTube"
        title="Open on YouTube"
      >
        <VolumeX size={18} strokeWidth={1.75} aria-hidden />
      </a>
    )
  }

  return (
    <>
      <div className={styles.host} aria-hidden="true">
        <div id={`yt-bg-${hostId}`} />
      </div>
      <button
        type="button"
        className={styles.fab}
        data-bg-music-fab=""
        onClick={toggleMute}
        disabled={!ready}
        aria-label={!started ? 'Play music' : muted ? 'Unmute music' : 'Mute music'}
        aria-pressed={started && !muted}
        title={!started ? 'Play' : muted ? 'Unmute' : 'Mute'}
      >
        {muted ? (
          <VolumeX size={18} strokeWidth={1.75} aria-hidden />
        ) : (
          <Volume2 size={18} strokeWidth={1.75} aria-hidden />
        )}
      </button>
    </>
  )
}
