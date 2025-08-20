"use client"

import React, { useRef, useState, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, RotateCcw } from 'lucide-react'
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
  lazy = true
}: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const hlsRef = useRef<Hls | null>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(muted)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isInView, setIsInView] = useState(!lazy)
  const [videoSrc, setVideoSrc] = useState<string | undefined>(!lazy ? src : undefined)
  const [isHlsSupported, setIsHlsSupported] = useState(false)

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
    
    if (isHlsStream && Hls.isSupported() && !video.canPlayType('application/vnd.apple.mpegurl')) {
      // Use HLS.js for HLS streams
      if (hlsRef.current) {
        hlsRef.current.destroy()
      }
      
      hlsRef.current = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      })
      
      hlsRef.current.loadSource(videoSrc)
      hlsRef.current.attachMedia(video)
      
      hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) {
          video.play().catch(() => {
            // Autoplay might be blocked
            setIsPlaying(false)
          })
        }
      })
      
      hlsRef.current.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS error:', data)
      })
    } else {
      // Regular video or native HLS support
      video.src = videoSrc
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy()
        hlsRef.current = null
      }
    }
  }, [videoSrc, isInView, autoPlay])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      setProgress((video.currentTime / video.duration) * 100)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
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

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const width = rect.width
      const seekTime = (clickX / width) * duration
      videoRef.current.currentTime = seekTime
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div 
      ref={containerRef}
      className={`relative group ${className}`}
    >
      <video
        ref={videoRef}
        autoPlay={false}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        poster={poster}
        preload={isInView ? preload : "none"}
        className="w-full h-full object-cover"
      />
      
      {/* Overlay for click to play */}
      {!isPlaying && (
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
    </div>
  )
}
