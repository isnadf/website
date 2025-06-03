'use client'

import { useEffect } from 'react'
import { isGoogleTranslateActive } from '@/lib/google-translate-utils'

export default function GlobalError({
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
      console.warn('Global translation-related error detected:', error.message)

      // Auto-retry for translation errors after a short delay
      const timer = setTimeout(() => {
        reset()
      }, 500)

      return () => clearTimeout(timer)
    } else {
      // Log other errors normally
      console.error('Global application error:', error)
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
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="text-center max-w-md">
            {isTranslationError ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-6"></div>
                <h2 className="text-xl font-semibold mb-4">Loading translated content...</h2>
                <p className="text-muted-foreground mb-6">
                  The page is being prepared for translation. This will only take a moment.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
                <p className="text-muted-foreground mb-6">
                  An unexpected error occurred. Please try refreshing the page.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={reset}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                  >
                    Try again
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full px-4 py-2 border border-border rounded hover:bg-muted transition-colors"
                  >
                    Refresh page
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}
