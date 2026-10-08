'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [items, setItems] = useState<TOCItem[]>([]);

  useEffect(() => {
    // Find all h2 and h3 in the prose container
    const headings = Array.from(document.querySelectorAll('.prose h2, .prose h3'));
    
    const newItems = headings.map((heading, index) => {
      // Create an ID if it doesn't have one
      if (!heading.id) {
        heading.id = heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `heading-${index}`;
      }
      return {
        id: heading.id,
        text: heading.textContent || '',
        level: heading.tagName === 'H2' ? 2 : 3
      };
    });

    setItems(newItems);
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="mb-10 bg-white/5 border border-white/10 rounded-2xl p-6">
      <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
        <svg className="w-4 h-4 text-[#F6C90E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        Daftar Isi
      </h4>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} style={{ paddingLeft: item.level === 3 ? '1.5rem' : '0' }}>
            <a 
              href={`#${item.id}`} 
              className="text-white/60 hover:text-[#F6C90E] transition-colors text-sm flex items-start gap-2 group"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="text-[#F6C90E]/50 group-hover:text-[#F6C90E] font-mono text-xs mt-0.5">{i + 1}.</span>
              <span>{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
