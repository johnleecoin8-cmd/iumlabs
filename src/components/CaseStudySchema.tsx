import { useEffect } from 'react';

interface CaseStudySchemaProps {
  name: string;
  description: string;
  image: string;
  url: string;
  category?: string;
  services?: string[];
  metrics?: Array<{ value: string; label: string }>;
}

/**
 * Injects Case Study structured data (Schema.org) for SEO
 * Uses CreativeWork type which is suitable for case studies and portfolio items
 */
const CaseStudySchema = ({
  name,
  description,
  image,
  url,
  category,
  services = [],
  metrics = [],
}: CaseStudySchemaProps) => {
  useEffect(() => {
    // Remove any existing case study schema
    const existingSchema = document.querySelector('script[data-schema="casestudy"]');
    if (existingSchema) {
      existingSchema.remove();
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": name,
      "description": description,
      "image": image.startsWith('http') ? image : `https://iumlabs.io${image}`,
      "url": url,
      "provider": {
        "@type": "Organization",
        "name": "Ium Labs",
        "url": "https://iumlabs.io",
        "logo": {
          "@type": "ImageObject",
          "url": "https://iumlabs.io/logo.png"
        }
      },
      ...(category && { "genre": category }),
      ...(services.length > 0 && { "keywords": services.join(", ") }),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'casestudy');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [name, description, image, url, category, services, metrics]);

  return null;
};

export default CaseStudySchema;
