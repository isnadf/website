/**
 * Utility functions for detecting and handling Google Translate
 * to prevent hydration mismatches in Next.js applications
 */

/**
 * Detects if Google Translate is currently active on the page
 * @returns boolean indicating if translation is active
 */
export function isGoogleTranslateActive(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for Google Translate elements in the DOM
  const indicators = [
    // Google Translate widget
    document.querySelector('.goog-te-combo'),
    document.querySelector('.goog-te-banner-frame'),
    document.querySelector('.goog-te-spinner-pos'),
    
    // Translated content indicators
    document.querySelector('font[style*="vertical-align: inherit"]'),
    document.querySelector('.goog-text-highlight'),
    
    // Check if body has Google Translate classes
    document.body.classList.contains('translated-ltr'),
    document.body.classList.contains('translated-rtl'),
    
    // Check for Google Translate script
    document.querySelector('script[src*="translate.google"]'),
    
    // Check for translated elements (Google wraps text in font tags)
    document.querySelector('font[color]'),
  ];
  
  return indicators.some(indicator => indicator !== null && indicator !== false);
}

/**
 * Detects if the current page language differs from the original
 * @returns boolean indicating if page is translated to a different language
 */
export function isPageTranslated(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check URL parameters for Google Translate
  const urlParams = new URLSearchParams(window.location.search);
  const translateParam = urlParams.get('_x_tr_tl');
  
  // Check for Google Translate cookie
  const cookies = document.cookie.split(';');
  const googleTranslateCookie = cookies.find(cookie => 
    cookie.trim().startsWith('googtrans=')
  );
  
  // Check meta tags that Google Translate might modify
  const htmlLang = document.documentElement.lang;
  const metaLang = document.querySelector('meta[http-equiv="content-language"]')?.getAttribute('content');
  
  return !!(translateParam || googleTranslateCookie || 
    (htmlLang && metaLang && htmlLang !== metaLang));
}

/**
 * Safely checks if an element has been modified by Google Translate
 * @param element - The DOM element to check
 * @returns boolean indicating if element contains translated content
 */
export function isElementTranslated(element: Element): boolean {
  if (!element) return false;
  
  // Check for Google Translate font wrappers
  const hasFontTags = element.querySelector('font[style*="vertical-align"]') !== null;
  
  // Check for Google Translate classes
  const hasTranslateClasses = element.classList.contains('goog-text-highlight') ||
    element.querySelector('.goog-text-highlight') !== null;
  
  // Check for modified text nodes (Google Translate wraps them)
  const textNodes = Array.from(element.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
  const hasModifiedText = textNodes.some(node => {
    const parent = node.parentElement;
    return parent && parent.tagName === 'FONT' && parent.hasAttribute('style');
  });
  
  return hasFontTags || hasTranslateClasses || hasModifiedText;
}

/**
 * Creates a mutation observer to detect Google Translate changes
 * @param callback - Function to call when translation changes are detected
 * @returns MutationObserver instance
 */
export function createTranslationObserver(callback: () => void): MutationObserver | null {
  if (typeof window === 'undefined') return null;
  
  const observer = new MutationObserver((mutations) => {
    const hasTranslationChanges = mutations.some(mutation => {
      // Check for added nodes that indicate translation
      const addedNodes = Array.from(mutation.addedNodes);
      const hasTranslateNodes = addedNodes.some(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          return element.tagName === 'FONT' || 
                 element.classList.contains('goog-text-highlight') ||
                 element.querySelector('font[style*="vertical-align"]') !== null;
        }
        return false;
      });
      
      // Check for class changes that indicate translation
      const hasTranslateClasses = mutation.type === 'attributes' && 
        mutation.attributeName === 'class' &&
        mutation.target instanceof Element &&
        (mutation.target.classList.contains('translated-ltr') ||
         mutation.target.classList.contains('translated-rtl'));
      
      return hasTranslateNodes || hasTranslateClasses;
    });
    
    if (hasTranslationChanges) {
      callback();
    }
  });
  
  // Observe the entire document for translation changes
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style']
  });
  
  return observer;
}

/**
 * Debounced function to prevent excessive calls
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Safely gets the current page language, accounting for translation
 * @returns string representing the current language code
 */
export function getCurrentLanguage(): string {
  if (typeof window === 'undefined') return 'en';

  // Check Google Translate cookie first
  const cookies = document.cookie.split(';');
  const googleTranslateCookie = cookies.find(cookie =>
    cookie.trim().startsWith('googtrans=')
  );

  if (googleTranslateCookie) {
    const cookieValue = googleTranslateCookie.split('=')[1];
    const parts = cookieValue.split('/');
    if (parts.length >= 3) {
      return parts[2]; // Target language
    }
  }

  // Fallback to document language
  return document.documentElement.lang || 'en';
}

/**
 * Safely removes Google Translate artifacts from DOM nodes
 * This prevents React from losing track of nodes that Google Translate has wrapped
 */
export function cleanTranslatedNode(node: Node): Node {
  if (!node || node.nodeType !== Node.ELEMENT_NODE) return node;

  const element = node as Element;

  // If this is a Google Translate font wrapper, return its text content
  if (element.tagName === 'FONT' && element.hasAttribute('style')) {
    const style = element.getAttribute('style') || '';
    if (style.includes('vertical-align: inherit')) {
      // Create a text node with the unwrapped content
      const textContent = element.textContent || '';
      return document.createTextNode(textContent);
    }
  }

  // Recursively clean child nodes
  const children = Array.from(element.childNodes);
  children.forEach(child => {
    const cleanedChild = cleanTranslatedNode(child);
    if (cleanedChild !== child) {
      try {
        element.replaceChild(cleanedChild, child);
      } catch (error) {
        // Ignore errors if node is already removed
        console.warn('Could not replace translated node:', error);
      }
    }
  });

  return element;
}

/**
 * Safely removes all Google Translate modifications from an element
 * @param element - The element to clean
 */
export function removeTranslationArtifacts(element: Element): void {
  if (!element) return;

  // Remove Google Translate classes
  element.classList.remove('goog-text-highlight');

  // Find and unwrap font elements created by Google Translate
  const fontElements = element.querySelectorAll('font[style*="vertical-align"]');
  fontElements.forEach(font => {
    try {
      const parent = font.parentNode;
      if (parent) {
        // Replace font element with its text content
        const textNode = document.createTextNode(font.textContent || '');
        parent.replaceChild(textNode, font);
      }
    } catch (error) {
      // Ignore errors if nodes are already modified
      console.warn('Could not remove translation artifact:', error);
    }
  });

  // Remove Google Translate attributes
  element.removeAttribute('data-gtranslate');

  // Clean up any remaining Google Translate elements
  const translateElements = element.querySelectorAll('.goog-text-highlight, .goog-te-spinner-pos');
  translateElements.forEach(el => {
    try {
      el.remove();
    } catch (error) {
      console.warn('Could not remove Google Translate element:', error);
    }
  });
}

/**
 * Creates a safe DOM manipulation wrapper that handles Google Translate conflicts
 */
export function createSafeDOMWrapper() {
  const originalRemoveChild = Node.prototype.removeChild;
  const originalReplaceChild = Node.prototype.replaceChild;
  const originalInsertBefore = Node.prototype.insertBefore;

  // Override removeChild to handle Google Translate conflicts
  Node.prototype.removeChild = function<T extends Node>(child: T): T {
    try {
      // Check if the child is actually a child of this node
      if (!this.contains(child)) {
        console.warn('Attempted to remove node that is not a child - likely Google Translate conflict');
        return child;
      }
      return originalRemoveChild.call(this, child) as T;
    } catch (error) {
      console.warn('DOM removeChild error (Google Translate conflict):', error);
      return child;
    }
  };

  // Override replaceChild to handle Google Translate conflicts
  Node.prototype.replaceChild = function<T extends Node>(newChild: Node, oldChild: T): T {
    try {
      if (!this.contains(oldChild)) {
        console.warn('Attempted to replace node that is not a child - likely Google Translate conflict');
        return oldChild;
      }
      return originalReplaceChild.call(this, newChild, oldChild) as T;
    } catch (error) {
      console.warn('DOM replaceChild error (Google Translate conflict):', error);
      return oldChild;
    }
  };

  // Override insertBefore to handle Google Translate conflicts
  Node.prototype.insertBefore = function<T extends Node>(newNode: T, referenceNode: Node | null): T {
    try {
      if (referenceNode && !this.contains(referenceNode)) {
        console.warn('Attempted to insert before node that is not a child - likely Google Translate conflict');
        return this.appendChild(newNode) as T;
      }
      return originalInsertBefore.call(this, newNode, referenceNode) as T;
    } catch (error) {
      console.warn('DOM insertBefore error (Google Translate conflict):', error);
      return this.appendChild(newNode) as T;
    }
  };

  // Return cleanup function
  return () => {
    Node.prototype.removeChild = originalRemoveChild;
    Node.prototype.replaceChild = originalReplaceChild;
    Node.prototype.insertBefore = originalInsertBefore;
  };
}
