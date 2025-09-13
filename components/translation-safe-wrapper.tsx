"use client"

import React, { Component, ReactNode, useEffect, useState, useRef } from 'react'
import {
  isGoogleTranslateActive,
  createTranslationObserver,
  debounce,
  createSafeDOMWrapper,
  removeTranslationArtifacts
} from '@/lib/google-translate-utils'
import { isTranslationFixEnabled, TRANSLATION_CONFIG } from '@/lib/translation-config'

interface TranslationErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface TranslationErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Error boundary specifically designed to catch hydration mismatches
 * caused by Google Translate DOM mutations
 */
class TranslationErrorBoundary extends Component<
  TranslationErrorBoundaryProps,
  TranslationErrorBoundaryState
> {
  private retryCount = 0
  private maxRetries = 3
  private retryTimeout?: NodeJS.Timeout

  constructor(props: TranslationErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): TranslationErrorBoundaryState {
    // Only catch errors if Google Translate is actually active
    const isTranslationActive = isGoogleTranslateActive()

    if (!isTranslationActive) {
      // If translation is not active, let the error bubble up normally
      throw error
    }

    // Check if this is a hydration error that might be caused by Google Translate
    const isHydrationError = error.message.includes('Hydration') ||
      error.message.includes('hydration') ||
      error.message.includes('Text content does not match') ||
      error.message.includes('server-rendered HTML') ||
      error.message.includes('removeChild') ||
      error.message.includes('replaceChild') ||
      error.message.includes('insertBefore') ||
      error.stack?.includes('hydrateRoot')

    return {
      hasError: true,
      error: isHydrationError ? error : undefined
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Check for specific DOM manipulation errors caused by Google Translate
    const isDOMError = error.message.includes('removeChild') ||
      error.message.includes('replaceChild') ||
      error.message.includes('insertBefore') ||
      error.message.includes('not a child of this node')

    // Only handle hydration errors that might be translation-related
    const isTranslationRelated = isGoogleTranslateActive() && (
      error.message.includes('Hydration') ||
      error.message.includes('hydration') ||
      error.message.includes('Text content does not match') ||
      isDOMError
    )

    if (isTranslationRelated) {
      console.warn('Translation-related error detected:', error.message)

      // Clean up translation artifacts before retrying
      try {
        const body = document.body;
        if (body) {
          removeTranslationArtifacts(body);
        }
      } catch (cleanupError) {
        console.warn('Could not clean translation artifacts:', cleanupError);
      }

      // Attempt to recover by retrying after a short delay
      if (this.retryCount < this.maxRetries) {
        this.retryCount++
        this.retryTimeout = setTimeout(() => {
          this.setState({ hasError: false, error: undefined })
        }, 100 * this.retryCount) // Exponential backoff
      }
    } else {
      // For non-translation errors, log normally and don't auto-retry
      console.error('Application error:', error, errorInfo)
    }

    this.setState({ errorInfo })
  }

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout)
    }
  }

  render() {
    if (this.state.hasError) {
      // If we have a custom fallback, use it
      if (this.props.fallback) {
        return this.props.fallback
      }

      // For translation-related errors, show a minimal fallback
      if (this.state.error && isGoogleTranslateActive()) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading translated content...</p>
            </div>
          </div>
        )
      }

      // For other errors, show a more detailed error message
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-8 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-muted-foreground mb-4">
              An error occurred while loading the page. Please try refreshing.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Hook to detect and handle Google Translate state changes
 */
function useTranslationDetection() {
  const [isTranslated, setIsTranslated] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // Start with false to avoid unnecessary loading
  const domWrapperRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    // Initial check
    const checkTranslation = () => {
      const translated = isGoogleTranslateActive()
      setIsTranslated(translated)
      setIsLoading(false)

      // Only set up DOM wrapper when translation is actually active
      if (translated && !domWrapperRef.current) {
        domWrapperRef.current = createSafeDOMWrapper()
      } else if (!translated && domWrapperRef.current) {
        // Restore original DOM methods when translation is disabled
        domWrapperRef.current()
        domWrapperRef.current = null
      }
    }

    // Debounced version to prevent excessive updates
    const debouncedCheck = debounce(checkTranslation, 300)

    // Check immediately
    checkTranslation()

    // Set up observer for translation changes
    const observer = createTranslationObserver(() => {
      debouncedCheck()
    })

    // Also listen for URL changes that might indicate translation
    const handleLocationChange = () => {
      debouncedCheck()
    }

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleLocationChange)

    // Cleanup
    return () => {
      if (observer) {
        observer.disconnect()
      }
      window.removeEventListener('popstate', handleLocationChange)

      // Restore original DOM methods
      if (domWrapperRef.current) {
        domWrapperRef.current()
      }
    }
  }, [])

  return { isTranslated, isLoading }
}

/**
 * Main wrapper component that provides translation-safe rendering
 */
export default function TranslationSafeWrapper({ children }: { children: ReactNode }) {
  const { isTranslated, isLoading } = useTranslationDetection()
  
  // If the fix is disabled, just render children normally
  if (!isTranslationFixEnabled()) {
    return <>{children}</>
  }

  // Only show loading state very briefly and only if translation is detected
  if (isLoading && isTranslated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Only wrap in error boundary if translation is active and error boundaries are enabled
  if (isTranslated && TRANSLATION_CONFIG.ENABLE_ERROR_BOUNDARIES) {
    return (
      <TranslationErrorBoundary
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading translated content...</p>
            </div>
          </div>
        }
      >
        {/* Add a key that changes when translation state changes to force re-render */}
        <div key={`translation-${isTranslated}`} className="translation-safe-content">
          {children}
        </div>
      </TranslationErrorBoundary>
    )
  }

  // Normal rendering when translation is not active or error boundaries are disabled
  return <>{children}</>
}
