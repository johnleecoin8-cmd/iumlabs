import { useEffect } from 'react';

/**
 * Hook to set unique page meta tags for SEO
 * Includes title, description, canonical URL, and Open Graph tags
 */
export const usePageMeta = (
  title: string, 
  description?: string, 
  path?: string,
  suffix: string = "Korean Web3 Marketing Agency | ium labs"
) => {
  useEffect(() => {
    // Update page title
    const fullTitle = title ? `${title} | ${suffix}` : suffix;
    document.title = fullTitle;
    
    // Update og:title and twitter:title
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', fullTitle);
    }
    
    const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitleMeta) {
      twitterTitleMeta.setAttribute('content', fullTitle);
    }
    
    // Update description meta tags
    if (description) {
      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) {
        descMeta.setAttribute('content', description);
      }
      
      const ogDescMeta = document.querySelector('meta[property="og:description"]');
      if (ogDescMeta) {
        ogDescMeta.setAttribute('content', description);
      }
      
      const twitterDescMeta = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescMeta) {
        twitterDescMeta.setAttribute('content', description);
      }
    }
    
    // Update canonical URL
    if (path) {
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', `https://iumlabs.io${path}`);
      }
      
      const ogUrlMeta = document.querySelector('meta[property="og:url"]');
      if (ogUrlMeta) {
        ogUrlMeta.setAttribute('href', `https://iumlabs.io${path}`);
      }
    }
  }, [title, description, path, suffix]);
};

export default usePageMeta;
