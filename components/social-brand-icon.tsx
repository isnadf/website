"use client"

import { useId } from "react"
import type { IconType } from "react-icons"
import { FaFacebookF } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

import { cn } from "@/lib/utils"

export type SocialPlatform = "facebook" | "instagram" | "x"

type SocialBrandConfig = {
  Icon: IconType
  iconClassName: string
}

const SOCIAL_BRAND_CONFIG: Record<Exclude<SocialPlatform, "instagram">, SocialBrandConfig> = {
  facebook: {
    Icon: FaFacebookF,
    iconClassName: "text-[#1877F2]",
  },
  x: {
    Icon: FaXTwitter,
    iconClassName: "text-black dark:text-white",
  },
}

type SocialBrandIconProps = {
  platform: SocialPlatform
  className?: string
}

function InstagramBrandIcon({ className }: { className?: string }) {
  const gradientId = useId()

  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="35%" stopColor="#FA7E1E" />
          <stop offset="62%" stopColor="#D62976" />
          <stop offset="82%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.25" stroke={`url(#${gradientId})`} strokeWidth="1.9" />
      <circle cx="12" cy="12" r="4.15" stroke={`url(#${gradientId})`} strokeWidth="1.9" />
      <circle cx="17.1" cy="6.9" r="1.15" fill={`url(#${gradientId})`} />
    </svg>
  )
}

export function SocialBrandIcon({ platform, className }: SocialBrandIconProps) {
  if (platform === "instagram") {
    return <InstagramBrandIcon className={className} />
  }

  const { Icon, iconClassName } = SOCIAL_BRAND_CONFIG[platform]

  return <Icon aria-hidden="true" className={cn(iconClassName, className)} />
}
