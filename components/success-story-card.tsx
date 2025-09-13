"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"

interface SuccessStoryCardProps {
  name: string
  degree: string
  university: string
  quote: string
}

export default function SuccessStoryCard({ name, degree, university, quote }: SuccessStoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full overflow-hidden backdrop-blur-sm bg-gradient-to-r from-[hsl(0,76%,40%)]/80 via-black/80 to-[hsl(120,61%,34%)]/80 border-white/20 text-white">
        <CardContent className="flex flex-col p-6">
          <div className="mb-4">
            <QuoteIcon className="mb-2 h-8 w-8 text-white opacity-50" />
            <p className="italic text-white/90">{quote}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-[hsl(120,61%,70%)]">{degree}</p>
            <p className="text-sm text-white/70">{university}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

