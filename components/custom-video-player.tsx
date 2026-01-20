"use client"

import React, { useRef, useState, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Hls from 'hls.js'

interface CustomVideoPlayerProps {
  src: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
  className?: string
  poster?: string
  preload?: "none" | "metadata" | "auto"
  lazy?: boolean
  videoClassName?: string
}

export default function CustomVideoPlayer({
  src,
  autoPlay = false,
  muted = false,
  loop = false,
  playsInline = false,
  className = "",
  poster,
  preload = "metadata",
  lazy = true,
  videoClassName = ""
}: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const hlsRef = useRef<Hls | null>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(muted)
  const [isFullscreen, setIsFullscreen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isHlsSupported, setIsHlsSupported] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentTime, setCurrentTime] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [progress, setProgress] = useState(0)
  const [isInView, setIsInView] = useState(!lazy)
  const [videoSrc, setVideoSrc] = useState<string | undefined>(!lazy ? src : undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Check if HLS is supported natively or via HLS.js
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const isNativeHlsSupported = video.canPlayType('application/vnd.apple.mpegurl') !== ''
    setIsHlsSupported(isNativeHlsSupported || Hls.isSupported())
  }, [])

  // Initialize HLS if needed
  useEffect(() => {
    if (!isInView || !videoSrc) return

    const video = videoRef.current
    if (!video) return

    const isHlsStream = videoSrc.includes('.m3u8')
    
    let loadingTimeout: number | undefined = undefined

    // For HLS streams, set a conservative timeout; for MP4 progressive, rely on loadeddata
    if (isHlsStream) {
      loadingTimeout = window.setTimeout(() => {
        if (isLoading) {
          console.warn('Video loading timeout')
          setHasError(true)
          setIsLoading(false)
        }
      }, 30000) // 30 second timeout for slower networks
    }
 
    if (isHlsStream && Hls.isSupported() && !video.canPlayType('application/vnd.apple.mpegurl')) {
      // Use HLS.js for HLS streams
      if (hlsRef.current) {
        hlsRef.current.destroy()
      }
      
      hlsRef.current = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 5,
        enableSoftwareAES: true,
        debug: false,
      })
      
      hlsRef.current.loadSource(videoSrc)
      hlsRef.current.attachMedia(video)
      
      hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
        clearTimeout(loadingTimeout)
        setIsLoading(false)
        setHasError(false)
        if (autoPlay) {
          video.play().catch(() => {
            // Autoplay might be blocked
            setIsPlaying(false)
          })
        }
      })
      
      hlsRef.current.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS error:', data)
        
        // Handle different types of HLS errors
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error('Fatal network error encountered, trying to recover...')
              hlsRef.current?.startLoad()
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error('Fatal media error encountered, trying to recover...')
              hlsRef.current?.recoverMediaError()
              break
            default:
              console.error('Fatal error, cannot recover')
              setHasError(true)
              setIsLoading(false)
              // Fallback to regular video source if HLS fails
              if (video && videoSrc) {
                video.src = videoSrc.replace('.m3u8', '.mp4')
                video.load()
              }
              break
          }
        }
      })
    } else {
      // Regular video or native HLS support
      // Ensure inline playback attributes for iOS Safari
      video.setAttribute('playsinline', '')
      video.setAttribute('webkit-playsinline', '')
      video.setAttribute('x-webkit-airplay', 'allow')
      // Hint to avoid remote playback disruptions
      video.setAttribute('disableRemotePlayback', '')
      video.src = videoSrc
      
      // Add error handling for regular video sources
      video.addEventListener('error', (e) => {
        console.error('Video error:', e)
        setHasError(true)
        setIsLoading(false)
        // Try to load a fallback video if available
        if (videoSrc && !videoSrc.includes('fallback')) {
          const fallbackSrc = videoSrc.replace(/\.(mp4|webm|ogg)$/, '_fallback.mp4')
          video.src = fallbackSrc
          video.load()
        }
      })
      
      video.addEventListener('loadeddata', () => {
        if (loadingTimeout !== undefined) clearTimeout(loadingTimeout)
        setIsLoading(false)
        setHasError(false)
      })

      // Attempt to auto-recover if the stream stalls or waits
      let lastTime = 0
      let lastAdvanceTs = performance.now()

      const handleStalled = () => {
        // Try nudging the playback to continue
        const current = video.currentTime
        try {
          video.currentTime = Math.max(0, current - 0.001)
          // Attempt to resume
          const playPromise = video.play()
          if (playPromise && typeof playPromise.then === 'function') {
            playPromise.catch(() => {
              // ignore autoplay block here
            })
          }
        } catch {
          // ignore
        }
      }
      const handleTimeUpdateGuard = () => {
        const now = performance.now()
        if (video.currentTime > lastTime + 0.05) {
          lastTime = video.currentTime
          lastAdvanceTs = now
          return
        }
        // If playback hasn't advanced for > 2500ms while not paused/ended, attempt recovery
        if (!video.paused && !video.ended && now - lastAdvanceTs > 2500) {
          // If readyState is low, try reload and resume
          if (video.readyState < 3) {
            try {
              const ct = video.currentTime
              video.load()
              video.currentTime = ct
            } catch {}
          }
          handleStalled()
        }
      }
      const handleEndedLoop = () => {
        if (loop) {
          try {
            video.currentTime = 0
            const p = video.play()
            if (p && typeof p.then === 'function') p.catch(() => {})
          } catch {}
        }
      }
      video.addEventListener('stalled', handleStalled)
      video.addEventListener('waiting', handleStalled)
      video.addEventListener('suspend', () => {
        // Some browsers fire suspend during normal playback; only act if not playing
        if (video.paused && autoPlay) {
          handleStalled()
        }
      })
      video.addEventListener('timeupdate', handleTimeUpdateGuard)
      video.addEventListener('ended', handleEndedLoop)

      // Cleanup for non-HLS listeners
      return () => {
        video.removeEventListener('error', () => {})
        video.removeEventListener('loadeddata', () => {})
        video.removeEventListener('stalled', handleStalled)
        video.removeEventListener('waiting', handleStalled)
        video.removeEventListener('timeupdate', handleTimeUpdateGuard)
        video.removeEventListener('ended', handleEndedLoop)
        // Note: suspend uses anonymous handler; safe to ignore
      }
    }

    return () => {
      if (loadingTimeout !== undefined) clearTimeout(loadingTimeout)
      if (hlsRef.current) {
        hlsRef.current.destroy()
        hlsRef.current = null
      }
    }
  }, [videoSrc, isInView, autoPlay, isLoading, loop])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      setProgress((video.currentTime / video.duration) * 100)
    }

    const handleLoadedMetadata = () => {
      // Video metadata loaded
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  // Lazy load via IntersectionObserver
  useEffect(() => {
    if (!lazy) {
      // If not lazy, immediately set in view and load video
      setIsInView(true)
      setVideoSrc(src)
      return
    }
    
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsInView(true)
            setVideoSrc(src)
            observer.disconnect()
            break
          }
        }
      },
      { root: null, threshold: 0.1 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [lazy, src])

  // Autoplay when ready and in view
  useEffect(() => {
    if (!autoPlay) return
    if (!isInView) return
    const video = videoRef.current
    if (!video) return

    const tryPlay = async () => {
      try {
        await video.play()
        setIsPlaying(true)
      } catch {
        // Autoplay might be blocked; keep controls available
        setIsPlaying(false)
      }
    }

    if (video.readyState >= 2) {
      tryPlay()
    } else {
      const onCanPlay = () => {
        tryPlay()
        video.removeEventListener('canplay', onCanPlay)
      }
      video.addEventListener('canplay', onCanPlay)
      return () => video.removeEventListener('canplay', onCanPlay)
    }
  }, [autoPlay, isInView])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    }
  }


  return (
    <div 
      ref={containerRef}
      className={`relative group w-full h-full ${className}`}
    >
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        poster={poster}
        preload={isInView ? preload : "none"}
        crossOrigin="anonymous"
        className={`w-full h-full ${videoClassName || 'object-cover'}`}
      />
      
      {/* Loading shimmer */}
      {isLoading && (
        <div className="absolute inset-0 overflow-hidden bg-gray-200">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/70 to-transparent animate-shimmer" />
        </div>
      )}
      
      {/* Error message */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white text-center p-4">
            <div className="text-red-400 mb-2">⚠️</div>
            <p className="text-sm mb-2">Unable to load video</p>
            <Button
              onClick={() => {
                setHasError(false)
                setIsLoading(true)
                if (videoRef.current && videoSrc) {
                  videoRef.current.load()
                }
              }}
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              Retry
            </Button>
          </div>
        </div>
      )}
      
      {/* Overlay for click to play */}
      {!isPlaying && !isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Button
            onClick={togglePlay}
            size="lg"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
          >
            <Play className="h-8 w-8" />
          </Button>
        </div>
      )}

      {/* Custom Controls - Small Glass Container */}
      {!isLoading && !hasError && (
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
        <div className="flex items-center space-x-3">
          <Button
            onClick={togglePlay}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 p-2 h-8 w-8 rounded-full"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <Button
            onClick={toggleMute}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 p-2 h-8 w-8 rounded-full"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>

          <Button
            onClick={toggleFullscreen}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 p-2 h-8 w-8 rounded-full"
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      )}
    </div>
  )
}
