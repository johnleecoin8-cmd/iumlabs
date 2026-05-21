import { useEffect } from 'react';

interface AutoFAQSchemaProps {
  content: string;
  url: string;
}

function extractFAQs(content: string): { question: string; answer: string }[] {
  const lines = content.split('\n');
  const faqs: { question: string; answer: string }[] = [];
  let currentQuestion = '';
  let currentAnswer: string[] = [];

  for (const line of lines) {
    const headerMatch = line.match(/^#{2,3}\s+(.+)/);
    if (headerMatch) {
      if (currentQuestion && currentAnswer.length > 0) {
        faqs.push({
          question: currentQuestion,
          answer: currentAnswer
            .join(' ')
            .replace(/\*\*([^*]+)\*\*/g, '$1')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/[#*_`~]/g, '')
            .trim()
            .slice(0, 500),
        });
      }

      const heading = headerMatch[1].trim();
      const isQuestion =
        heading.endsWith('?') ||
        /^(why|how|what|when|where|who|which|can|do|does|is|are|should|will)\b/i.test(heading);

      if (isQuestion) {
        currentQuestion = heading;
        currentAnswer = [];
      } else {
        currentQuestion = '';
        currentAnswer = [];
      }
      continue;
    }

    if (currentQuestion) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('![') && !trimmed.startsWith('{{') && !trimmed.startsWith('%%') && !trimmed.startsWith('>!')) {
        currentAnswer.push(trimmed);
      }
    }
  }

  if (currentQuestion && currentAnswer.length > 0) {
    faqs.push({
      question: currentQuestion,
      answer: currentAnswer
        .join(' ')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[#*_`~]/g, '')
        .trim()
        .slice(0, 500),
    });
  }

  return faqs.slice(0, 10);
}

const AutoFAQSchema = ({ content, url }: AutoFAQSchemaProps) => {
  useEffect(() => {
    const existing = document.querySelector('script[data-schema="faq"]');
    if (existing) existing.remove();

    const faqs = extractFAQs(content);
    if (faqs.length < 2) return;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'faq');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [content, url]);

  return null;
};

export default AutoFAQSchema;
