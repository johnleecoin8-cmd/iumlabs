import { useEffect } from 'react';

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  provider?: string;
  areaServed?: string;
  serviceType?: string[];
}

/**
 * Injects Service structured data (Schema.org) for SEO
 * Uses Service type for service pages
 */
const ServiceSchema = ({
  name,
  description,
  url,
  provider = "ium Labs",
  areaServed = "Korea",
  serviceType = [],
}: ServiceSchemaProps) => {
  useEffect(() => {
    // Remove any existing service schema
    const existingSchema = document.querySelector('script[data-schema="service"]');
    if (existingSchema) {
      existingSchema.remove();
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": name,
      "description": description,
      "url": url.startsWith('http') ? url : `https://iumlabs.io${url}`,
      "provider": {
        "@type": "Organization",
        "name": provider,
        "url": "https://iumlabs.io",
        "logo": {
          "@type": "ImageObject",
          "url": "https://iumlabs.io/favicon.png"
        }
      },
      "areaServed": {
        "@type": "Country",
        "name": areaServed
      },
      ...(serviceType.length > 0 && { "serviceType": serviceType.join(", ") }),
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "url": url.startsWith('http') ? url : `https://iumlabs.io${url}`
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'service');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [name, description, url, provider, areaServed, serviceType]);

  return null;
};

export default ServiceSchema;
