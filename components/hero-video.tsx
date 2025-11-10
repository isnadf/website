"use client"

import Image from 'next/image'
import CustomVideoPlayer from './custom-video-player'

interface HeroVideoProps {
  className?: string
  src?: string
  poster?: string
}

export default function HeroVideo({ className = "h-full w-full", src, poster }: HeroVideoProps) {
  // Only use provided MP4 (or other) source; no default HLS
  const videoSrc = src
  const posterSrc = poster || "/cover-mobil-isnad.png"

  return (
    <div className={className}>
      {/* Mobile: show static cover image */}
      <div className="relative h-full w-full block md:hidden">
        <Image
          src={posterSrc}
          alt="ISNAD Foundation hero cover"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Desktop/Tablet: show streaming video */}
      <div className="hidden md:block h-full w-full">
        {videoSrc ? (
          <CustomVideoPlayer
            src={videoSrc}
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
            preload="auto"
            className="h-full w-full"
            videoClassName="object-cover"
            lazy={false}
          />
        ) : (
          <Image
            src={posterSrc}
            alt="ISNAD Foundation hero cover"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>
    </div>
  )
}
