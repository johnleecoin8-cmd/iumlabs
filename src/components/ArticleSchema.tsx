import { useEffect } from 'react';

interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  author: string;
  authorRole?: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  tags?: string[];
}

/**
 * Injects Article structured data (Schema.org) for SEO
 * Helps Google understand the content and improve search visibility
 */
const ArticleSchema = ({
  title,
  description,
  image,
  author,
  authorRole,
  datePublished,
  dateModified,
  url,
  tags = [],
}: ArticleSchemaProps) => {
  useEffect(() => {
    // Remove any existing article schema
    const existingSchema = document.querySelector('script[data-schema="article"]');
    if (existingSchema) {
      existingSchema.remove();
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "image": image.startsWith('http') ? image : `https://iumlabs.io${image}`,
      "author": {
        "@type": "Person",
        "name": author,
        ...(authorRole && { "jobTitle": authorRole }),
      },
      "publisher": {
        "@type": "Organization",
        "name": "Ium Labs",
        "logo": {
          "@type": "ImageObject",
          "url": "https://iumlabs.io/favicon.png"
        }
      },
      "datePublished": datePublished,
      "dateModified": dateModified || datePublished,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      },
      ...(tags.length > 0 && { "keywords": tags.join(", ") }),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'article');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [title, description, image, author, authorRole, datePublished, dateModified, url, tags]);

  return null;
};

export default ArticleSchema;
