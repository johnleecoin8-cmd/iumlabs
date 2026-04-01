import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
  noindex?: boolean;
  /**
   * Override canonical URL for alias pages
   * e.g., /kol-marketing should point to /services/influencer
   */
  canonicalPath?: string;
}

const BASE_URL = 'https://iumlabs.io';
const DEFAULT_IMAGE = '/images/share-og.jpeg';
const SITE_NAME = 'ium Labs';

/**
 * SEOHead component using react-helmet-async for proper SSR/prerender meta tag injection.
 * This ensures crawlers see correct meta tags even without JavaScript execution.
 */
const SEOHead = ({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  keywords = [],
  noindex = false,
  canonicalPath,
}: SEOHeadProps) => {
  const fullUrl = `${BASE_URL}${path}`;
  const canonicalUrl = canonicalPath ? `${BASE_URL}${canonicalPath}` : fullUrl;
  const imageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;
  
  // Default keywords for the site
  const defaultKeywords = [
    'Korea Web3',
    'Korea Crypto',
    'Korea Web3 Marketing',
    'Korea Crypto Agency',
    'Korean Crypto Marketing',
    'Web3 GTM Korea',
    'Blockchain Marketing Korea',
    'Korean Market Entry',
    'Web3 Marketing Agency Korea',
  ];
  
  const allKeywords = [...new Set([...keywords, ...defaultKeywords])];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      <meta name="author" content={author || SITE_NAME} />
      
      {/* Canonical URL - supports override for alias pages */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} - ${SITE_NAME}`} />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific (for blog posts) */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@iumlabs" />
      <meta name="twitter:creator" content="@iumlabs" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={`${title} - ${SITE_NAME}`} />

      {/* Googlebot */}
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Hreflang */}
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="ko" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEOHead;
