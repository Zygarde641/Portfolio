'use client'

import { useEffect, useRef, useState, createContext, useContext, useCallback } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MusicContextType {
  audioData: Uint8Array | null
  isPlaying: boolean
}

const MusicContext = createContext<MusicContextType>({ audioData: null, isPlaying: false })

export const useMusicContext = () => useContext(MusicContext)

interface MusicPlayerProps {
  children: React.ReactNode
}

export function MusicProvider({ children }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioData, setAudioData] = useState<Uint8Array | null>(null)
  const [volume, setVolume] = useState(0.05)
  const [showSlider, setShowSlider] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const hasStartedRef = useRef(false)

  const initAudioContext = useCallback(() => {
    if (!audioRef.current || audioContextRef.current) return

    try {
      const audioContext = new AudioContext()
      audioContextRef.current = audioContext

      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      analyserRef.current = analyser

      const source = audioContext.createMediaElementSource(audioRef.current)
      source.connect(analyser)
      analyser.connect(audioContext.destination)

      const dataArray = new Uint8Array(analyser.frequencyBinCount)

      const updateData = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray)
          setAudioData(new Uint8Array(dataArray))
        }
        requestAnimationFrame(updateData)
      }
      updateData()
    } catch (error) {
      console.error('Audio init error:', error)
    }
  }, [])

  useEffect(() => {
    const audio = new Audio('/music.mp3')
    audio.loop = true
    audio.volume = 0.05
    audioRef.current = audio

    const startAudio = async () => {
      if (hasStartedRef.current) return
      hasStartedRef.current = true
      
      try {
        await audio.play()
        setIsPlaying(true)
        initAudioContext()
        removeListeners()
      } catch (error) {
        hasStartedRef.current = false
        console.log('Play attempt failed:', error)
      }
    }

    const removeListeners = () => {
      document.removeEventListener('click', startAudio)
      document.removeEventListener('touchstart', startAudio)
      document.removeEventListener('mousemove', startAudio)
      document.removeEventListener('keydown', startAudio)
    }

    // Try immediate auto-play
    audio.play().then(() => {
      setIsPlaying(true)
      hasStartedRef.current = true
      initAudioContext()
    }).catch(() => {
      // Auto-play blocked, listen for user interaction
      document.addEventListener('click', startAudio)
      document.addEventListener('touchstart', startAudio)
      document.addEventListener('mousemove', startAudio, { once: true })
      document.addEventListener('keydown', startAudio)
    })

    return () => {
      removeListeners()
      audio.pause()
      audio.src = ''
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [initAudioContext])

  const togglePlay = async () => {
    if (!audioRef.current) return

    if (!audioContextRef.current) {
      initAudioContext()
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.error('Play error:', error)
      }
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <MusicContext.Provider value={{ audioData, isPlaying }}>
      {children}
      
      {/* Music control */}
      <div 
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
        onMouseEnter={() => setShowSlider(true)}
        onMouseLeave={() => setShowSlider(false)}
      >
        {/* Volume slider */}
        <AnimatePresence>
          {showSlider && (
            <motion.div
              initial={{ opacity: 0, width: 0, x: 20 }}
              animate={{ opacity: 1, width: 'auto', x: 0 }}
              exit={{ opacity: 0, width: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center bg-black/80 rounded-full px-3 py-2 border border-red-500/30"
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                style={{
                  background: `linear-gradient(to right, #ff3333 0%, #ff3333 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
                }}
              />
              <span className="text-xs text-gray-400 ml-2 w-8">{Math.round(volume * 100)}%</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Volume button */}
        <button
          onClick={togglePlay}
          className="relative p-3 rounded-full bg-black/50 border border-red-500/30 hover:border-red-500 transition-all group"
          aria-label={isPlaying ? 'Mute music' : 'Play music'}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
          )}
          
          {/* Pulse animation when playing */}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full border border-red-500 animate-ping opacity-30" />
          )}
        </button>
      </div>
    </MusicContext.Provider>
  )
}
