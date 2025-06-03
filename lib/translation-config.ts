/**
 * Configuration for Google Translate fix
 * Set ENABLE_TRANSLATION_FIX to false to completely disable the fix
 */

export const TRANSLATION_CONFIG = {
  // Set to false to completely disable the Google Translate fix
  ENABLE_TRANSLATION_FIX: true,
  
  // Set to false to disable the debug component
  ENABLE_DEBUG_COMPONENT: true,
  
  // Set to false to disable DOM protection (less safe but less intrusive)
  ENABLE_DOM_PROTECTION: true,
  
  // Set to false to disable error boundaries (not recommended)
  ENABLE_ERROR_BOUNDARIES: true,
  
  // Debounce delay for translation detection (ms)
  DETECTION_DEBOUNCE_DELAY: 300,
  
  // Maximum retry attempts for error recovery
  MAX_RETRY_ATTEMPTS: 3,
  
  // Retry delay multiplier (exponential backoff)
  RETRY_DELAY_MULTIPLIER: 100,
} as const

/**
 * Quick disable function - set this to false to turn off all translation fixes
 */
export const isTranslationFixEnabled = () => TRANSLATION_CONFIG.ENABLE_TRANSLATION_FIX
