"use client"

import CustomVideoPlayer from './custom-video-player'

interface HeroVideoProps {
  className?: string
}

export default function HeroVideo({ className = "" }: HeroVideoProps) {
  // Direct video URL from Vercel Blob storage - no loading state needed
  const videoUrl = 'https://rx5dqaxk8k008yuv.public.blob.vercel-storage.com/hero-video-1755718572053.mp4'

  return (
    <CustomVideoPlayer
      src={videoUrl}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  )
}
