"use client"

import CustomVideoPlayer from './custom-video-player'

interface HeroVideoProps {
  className?: string
}

export default function HeroVideo({ className = "object-contain" }: HeroVideoProps) {
  // MUX video source for optimized streaming
  const muxVideoUrl = "https://stream.mux.com/ZLLecc3gAF2cvMgjM026xKi4t4r200ndMKuAPzReH9021I.m3u8"

  return (
    <CustomVideoPlayer
      src={muxVideoUrl}
      autoPlay={true}
      muted={true}
      loop={true}
      playsInline={true}
      preload="auto"
      className={className}
      lazy={false}
    />
  )
}
