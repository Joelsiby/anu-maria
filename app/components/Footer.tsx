'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctaRef.current) return;
    
    gsap.fromTo(
      ctaRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, 
        opacity: 1,
        duration: 1.2, 
        ease: 'power3.out',
        scrollTrigger: { 
          trigger: ctaRef.current, 
          start: 'top 85%' 
        },
      }
    );
  }, []);

  return (
    <footer id="footer" className="Footer">
      <div className="Footer-top">
        {/* Left side: CTA */}
        <div ref={ctaRef} style={{ opacity: 0 }}>
          <div className="Footer-cta">
            Let's work<br />
            <em>together.</em>
          </div>
          <a href="mailto:anumariaaj18@gmail.com" className="Footer-email">
            anumariaaj18@gmail.com
          </a>
          <div style={{ marginTop: '24px', fontSize: '12px', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.7)', maxWidth: '400px', lineHeight: '1.6' }}>
            Available for collaborations, worship events, studio projects, and performances.
          </div>
        </div>

        {/* Right side: Links */}
        <div className="Footer-links">
          <div className="Footer-col">
            <div className="Footer-col-title">Social</div>
            <a href="https://youtube.com/@amabeatles8024" target="_blank" rel="noopener">YouTube</a>
            <a href="https://www.instagram.com/anu_mariantony" target="_blank" rel="noopener">Instagram</a>
          </div>
        </div>
      </div>

      <div className="Footer-bottom">
        <span>Anu Maria Antony © 2026</span>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-script)', fontSize: '20px' }}>
          Singer & Performer
        </span>
      </div>
    </footer>
  );
}
