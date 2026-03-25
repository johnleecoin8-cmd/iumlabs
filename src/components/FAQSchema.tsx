import { Helmet } from 'react-helmet-async';

interface FAQSchemaProps {
  faqs: { question: string; answer: string }[];
}

/**
 * Injects FAQPage JSON-LD structured data for Google rich snippets.
 */
const FAQSchema = ({ faqs }: FAQSchemaProps) => {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default FAQSchema;
