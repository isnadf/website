"use client"

import Image from 'next/image'
import CustomVideoPlayer from './custom-video-player'

interface HeroVideoProps {
  className?: string
  src?: string
  poster?: string
  objectFit?: "cover" | "contain"
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
  preload?: "none" | "metadata" | "auto"
  lazy?: boolean
}

export default function HeroVideo({
  className = "h-full w-full",
  src,
  poster,
  objectFit = "cover",
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  preload = "auto",
  lazy = false
}: HeroVideoProps) {
  // Only use provided MP4 (or other) source; no default HLS
  const videoSrc = src
  const posterSrc = poster || "/cover-mobil-isnad.png"
  const objectClass = objectFit === "contain" ? "object-contain" : "object-cover"

  return (
    <div className={className}>
      <div className="h-full w-full">
        {videoSrc ? (
          <CustomVideoPlayer
            src={videoSrc}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            playsInline={playsInline}
            preload={preload}
            className="h-full w-full"
            videoClassName={`h-full w-full ${objectClass}`}
            lazy={lazy}
          />
        ) : (
          <Image
            src={posterSrc}
            alt="ISNAD Foundation hero cover"
            fill
            priority
            sizes="100vw"
            className={`${objectClass}`}
          />
        )}
      </div>
    </div>
  )
}
