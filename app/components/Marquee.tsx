'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    
    // Simple infinite scroll setup for the marquee
    const width = textRef.current.scrollWidth / 2;
    
    gsap.to(textRef.current, {
      x: -width,
      duration: 20,
      ease: 'none',
      repeat: -1,
    });
  }, []);

  return (
    <section className="Marquee">
      <div className="Marquee-content" ref={textRef}>
        <span>Singer</span>
        <span>Performer</span>
        <span>Content Creator</span>
        <span>Singer</span>
        <span>Performer</span>
        <span>Content Creator</span>
        <span>Singer</span>
        <span>Performer</span>
        <span>Content Creator</span>
      </div>
    </section>
  );
}
