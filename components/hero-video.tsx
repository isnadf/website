"use client"

import Image from 'next/image'
import CustomVideoPlayer from './custom-video-player'

interface HeroVideoProps {
  className?: string
}

export default function HeroVideo({ className = "h-full w-full" }: HeroVideoProps) {
  // MUX video source for optimized streaming
  const muxVideoUrl = "https://stream.mux.com/ZLLecc3gAF2cvMgjM026xKi4t4r200ndMKuAPzReH9021I.m3u8"

  return (
    <div className={className}>
      {/* Mobile: show static cover image */}
      <div className="relative h-full w-full block md:hidden">
        <Image
          src="/cover-mobil-isnad.png"
          alt="ISNAD Foundation hero cover"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Desktop/Tablet: show streaming video */}
      <div className="hidden md:block h-full w-full">
        <CustomVideoPlayer
          src={muxVideoUrl}
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          preload="auto"
          className="h-full w-full"
          videoClassName="object-cover"
          lazy={false}
        />
      </div>
    </div>
  )
}
