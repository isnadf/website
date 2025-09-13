'use client'

import { useEffect } from 'react'
import { isGoogleTranslateActive } from '@/lib/google-translate-utils'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Check for specific DOM manipulation errors caused by Google Translate
    const isDOMError = error.message.includes('removeChild') ||
      error.message.includes('replaceChild') ||
      error.message.includes('insertBefore') ||
      error.message.includes('not a child of this node')

    // Check if this is a translation-related error
    const isTranslationError = isGoogleTranslateActive() && (
      error.message.includes('Hydration') ||
      error.message.includes('hydration') ||
      error.message.includes('Text content does not match') ||
      error.message.includes('server-rendered HTML') ||
      isDOMError
    )

    if (isTranslationError) {
      console.warn('Translation-related error detected:', error.message)

      // Auto-retry for translation errors after a short delay
      const timer = setTimeout(() => {
        reset()
      }, 300)

      return () => clearTimeout(timer)
    } else {
      // Log other errors normally
      console.error('Application error:', error)
    }
  }, [error, reset])

  // Check if this is a translation-related error (for UI display)
  const isDOMError = error.message.includes('removeChild') ||
    error.message.includes('replaceChild') ||
    error.message.includes('insertBefore') ||
    error.message.includes('not a child of this node')

  const isTranslationError = isGoogleTranslateActive() && (
    error.message.includes('Hydration') ||
    error.message.includes('hydration') ||
    error.message.includes('Text content does not match') ||
    isDOMError
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        {isTranslationError ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-6"></div>
            <h2 className="text-xl font-semibold mb-4">Preparing translated content...</h2>
            <p className="text-muted-foreground">
              The page is being optimized for translation. Please wait a moment.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
            <p className="text-muted-foreground mb-6">
              We encountered an unexpected error. Don&apos;t worry, you can try again.
            </p>
            <div className="space-y-3">
              <Button onClick={reset} className="w-full">
                Try again
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/'}
                className="w-full"
              >
                Go to homepage
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
