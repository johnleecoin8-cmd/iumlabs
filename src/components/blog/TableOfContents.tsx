import { useState, useEffect, useMemo } from 'react';
import { List } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const headings = useMemo(() => {
    const items: TOCItem[] = [];
    content.split('\n').forEach((line) => {
      if (line.startsWith('## ') && !line.startsWith('### ')) {
        const text = line.replace('## ', '');
        items.push({ id: slugify(text), text, level: 2 });
      } else if (line.startsWith('### ')) {
        const text = line.replace('### ', '');
        items.push({ id: slugify(text), text, level: 3 });
      }
    });
    return items;
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/60 text-sm font-medium w-full"
        >
          <List className="w-4 h-4" />
          Table of Contents
          <span className="ml-auto text-white/30">{isOpen ? '−' : '+'}</span>
        </button>
        {isOpen && (
          <nav className="mt-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <ul className="space-y-2">
              {headings.map((h) => (
                <li key={h.id} style={{ paddingLeft: h.level === 3 ? '12px' : '0' }}>
                  <a
                    href={`#${h.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`block text-sm leading-relaxed transition-colors ${
                      activeId === h.id ? 'text-[#b48cde] font-medium' : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop sidebar TOC */}
      <aside className="hidden lg:block fixed top-32 right-[max(1rem,calc((100vw-72rem)/2-14rem))] w-56 xl:w-64">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/25 mb-4 font-medium">On this page</p>
        <nav>
          <ul className="space-y-1.5 border-l border-white/[0.06]">
            {headings.map((h) => (
              <li key={h.id} style={{ paddingLeft: h.level === 3 ? '20px' : '12px' }}>
                <a
                  href={`#${h.id}`}
                  className={`block text-[13px] leading-relaxed py-0.5 transition-colors duration-200 ${
                    activeId === h.id
                      ? 'text-[#b48cde] font-medium border-l-2 border-[#b48cde] -ml-[1px] pl-[11px]'
                      : 'text-white/35 hover:text-white/60'
                  }`}
                  style={activeId === h.id && h.level === 3 ? { paddingLeft: '19px' } : {}}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export { slugify };
export default TableOfContents;
