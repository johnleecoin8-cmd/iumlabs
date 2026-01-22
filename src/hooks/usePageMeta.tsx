import { useEffect } from 'react';

const DEFAULT_SHARE_IMAGE_PATH = "/images/share-og.jpeg";

interface PageMetaOptions {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  suffix?: string;
  keywords?: string[];
}

/**
 * Hook to set unique page meta tags for SEO
 * Includes title, description, canonical URL, Open Graph tags, and og:image
 */
export const usePageMeta = (
  titleOrOptions: string | PageMetaOptions,
  description?: string,
  path?: string,
  suffix: string = "ium Labs"
) => {
  useEffect(() => {
    // Support both old signature and new options object
    let title: string;
    let desc: string | undefined;
    let pagePath: string | undefined;
    let titleSuffix: string;
    let keywords: string[] | undefined;

    if (typeof titleOrOptions === 'object') {
      title = titleOrOptions.title;
      desc = titleOrOptions.description;
      pagePath = titleOrOptions.path;
      titleSuffix = titleOrOptions.suffix || "ium Labs";
      keywords = titleOrOptions.keywords;
    } else {
      title = titleOrOptions;
      desc = description;
      pagePath = path;
      titleSuffix = suffix;
    }

    // Update page title
    const fullTitle = title ? `${title} | ${titleSuffix}` : titleSuffix;
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
    if (desc) {
      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) {
        descMeta.setAttribute('content', desc);
      }

      const ogDescMeta = document.querySelector('meta[property="og:description"]');
      if (ogDescMeta) {
        ogDescMeta.setAttribute('content', desc);
      }

      const twitterDescMeta = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescMeta) {
        twitterDescMeta.setAttribute('content', desc);
      }
    }

    // Update canonical URL and og:url
    if (pagePath) {
      const fullUrl = `https://iumlabs.io${pagePath}`;

      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', fullUrl);
      }

      const ogUrlMeta = document.querySelector('meta[property="og:url"]');
      if (ogUrlMeta) {
        ogUrlMeta.setAttribute('content', fullUrl);
      }
    }

    // Update keywords meta tag
    if (keywords && keywords.length > 0) {
      const keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (keywordsMeta) {
        keywordsMeta.setAttribute('content', keywords.join(', '));
      }
    }
    const shareImageUrl = `https://iumlabs.io${DEFAULT_SHARE_IMAGE_PATH}`;

    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      ogImageMeta.setAttribute('content', shareImageUrl);
    }

    const ogImageSecureMeta = document.querySelector('meta[property="og:image:secure_url"]');
    if (ogImageSecureMeta) {
      ogImageSecureMeta.setAttribute('content', shareImageUrl);
    }

    const twitterImageMeta = document.querySelector('meta[name="twitter:image"]');
    if (twitterImageMeta) {
      twitterImageMeta.setAttribute('content', shareImageUrl);
    }
  }, [titleOrOptions, description, path, suffix]);
};

export default usePageMeta;

