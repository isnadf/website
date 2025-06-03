"use client"

import { useEffect, useState } from 'react'
import { isGoogleTranslateActive, isPageTranslated, getCurrentLanguage } from '@/lib/google-translate-utils'
import { TRANSLATION_CONFIG } from '@/lib/translation-config'

/**
 * Debug component to monitor Google Translate state
 * Only visible in development mode
 */
export default function TranslationDebug() {
  const [isTranslated, setIsTranslated] = useState(false)
  const [isPageLevelTranslated, setIsPageLevelTranslated] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development and if debug component is enabled
    if (process.env.NODE_ENV === 'development' && TRANSLATION_CONFIG.ENABLE_DEBUG_COMPONENT) {
      setIsVisible(true)
    }

    const checkTranslationState = () => {
      setIsTranslated(isGoogleTranslateActive())
      setIsPageLevelTranslated(isPageTranslated())
      setCurrentLang(getCurrentLanguage())
    }

    // Initial check
    checkTranslationState()

    // Check periodically
    const interval = setInterval(checkTranslationState, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  // Only show when translation is active or in development mode
  if (!isTranslated && !isPageLevelTranslated) {
    return (
      <div className="fixed bottom-4 right-4 bg-black/60 text-white p-2 rounded text-xs font-mono z-50 opacity-50 hover:opacity-100 transition-opacity">
        🌐 GT: OFF
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50 max-w-xs">
      <div className="font-bold mb-2">🌐 Translation Active</div>
      <div className="space-y-1">
        <div>
          <span className="text-gray-300">Active:</span>{' '}
          <span className={isTranslated ? 'text-green-400' : 'text-red-400'}>
            {isTranslated ? 'YES' : 'NO'}
          </span>
        </div>
        <div>
          <span className="text-gray-300">Page Translated:</span>{' '}
          <span className={isPageLevelTranslated ? 'text-green-400' : 'text-red-400'}>
            {isPageLevelTranslated ? 'YES' : 'NO'}
          </span>
        </div>
        <div>
          <span className="text-gray-300">Language:</span>{' '}
          <span className="text-blue-400">{currentLang}</span>
        </div>
      </div>
    </div>
  )
}
