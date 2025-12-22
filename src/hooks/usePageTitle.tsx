import { useEffect } from 'react';

/**
 * Hook to set unique page titles for SEO
 * Follows the pattern: "Page Title | Ium Labs"
 */
export const usePageTitle = (title: string, suffix: string = "Ium Labs") => {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${suffix}` : suffix;
    document.title = fullTitle;
    
    // Also update og:title meta tag dynamically
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', fullTitle);
    }
    
    // Update twitter:title meta tag
    const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitleMeta) {
      twitterTitleMeta.setAttribute('content', fullTitle);
    }
  }, [title, suffix]);
};

export default usePageTitle;
