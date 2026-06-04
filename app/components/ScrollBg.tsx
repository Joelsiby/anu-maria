'use client';
import { useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'hero',     bg: '#0e0e0e', fg: '#f0ede6' },
  { id: 'about',    bg: '#100f0a', fg: '#f0ede6' },
  { id: 'projects', bg: '#0b0b0b', fg: '#f0ede6' },
  { id: 'marquee',  bg: '#0e0e0e', fg: '#f0ede6' },
  { id: 'footer',   bg: '#0a0a08', fg: '#f0ede6' },
];

export default function ScrollBg() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          const section = SECTIONS.find(s => s.id === id);
          if (!section || !bgRef.current) return;
          bgRef.current.style.background = section.bg;
          document.documentElement.style.setProperty('--bg', section.bg);
          document.documentElement.style.setProperty('--fg', section.fg);
        });
      },
      { threshold: 0.3 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={bgRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        background: '#0e0e0e',
        transition: 'background 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        pointerEvents: 'none',
      }}
    />
  );
}
