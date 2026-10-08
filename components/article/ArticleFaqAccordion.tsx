'use client';

import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQ[];
}

export default function ArticleFaqAccordion({ faqs }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, index) => {
        const isActive = activeIndex === index;
        
        return (
          <div 
            key={index}
            className={`group rounded-[24px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform ${
              isActive 
                ? 'bg-[#171d2d] ring-1 ring-[#F6C90E]/40 -translate-y-2 shadow-[0_15px_40px_-10px_rgba(246,201,14,0.25)] relative z-10' 
                : 'bg-white/[0.02] ring-1 ring-white/5 hover:bg-white/[0.05] hover:ring-[#F6C90E]/20 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(246,201,14,0.1)] relative z-0'
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between p-6 md:px-8 md:py-6 bg-transparent border-none text-left cursor-pointer outline-none"
              aria-expanded={isActive}
            >
              <span className={`text-[16px] md:text-[18px] font-bold leading-snug pr-6 transition-colors duration-300 ${
                isActive ? 'text-[#F6C90E]' : 'text-white/90 group-hover:text-white'
              }`}>
                {faq.question}
              </span>
              
              <div 
                className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isActive 
                    ? 'bg-[#F6C90E] text-[#090B12] rotate-180 shadow-[0_0_15px_rgba(246,201,14,0.4)]' 
                    : 'bg-white/10 text-white group-hover:bg-white/20'
                }`}
              >
                <svg 
                  className={`w-5 h-5 transition-transform duration-500 ${isActive ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            <div 
              className="grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ gridTemplateRows: isActive ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="text-white/60 text-[15px] leading-relaxed px-6 md:px-8 pb-7 m-0">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
