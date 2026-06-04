'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    
    // Fade in text as you scroll into the about section
    gsap.fromTo(
      textRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    );

    // Green cursor effect on hover
    const onEnter = () => {
      document.querySelector('.cursor')?.classList.add('green-mode');
      document.querySelector('.cursor-follower')?.classList.add('green-mode');
    };
    const onLeave = () => {
      document.querySelector('.cursor')?.classList.remove('green-mode');
      document.querySelector('.cursor-follower')?.classList.remove('green-mode');
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mouseenter', onEnter);
      section.addEventListener('mouseleave', onLeave);
    }

    return () => {
      if (section) {
        section.removeEventListener('mouseenter', onEnter);
        section.removeEventListener('mouseleave', onLeave);
      }
      onLeave();
    };
  }, []);

  return (
    <section id="about" className="About" ref={sectionRef}>
      {/* Left side: Sticky titles */}
      <div style={{ flex: 1 }}>
        <div className="About-sticky">
          <p>Singer</p>
          <p>Performer</p>
          <p style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}>Content Creator</p>
        </div>
      </div>

      {/* Right side: Scrolling description */}
      <div className="About-content" ref={textRef} style={{ opacity: 0 }}>
        <p>
          I am Anu Maria Antony, a passionate singer and Nursing graduate whose musical journey is rooted
          in <em>faith</em>, creativity, and heartfelt expression. Through devotional music, cover songs, and
          collaborative projects, I strive to connect with audiences and inspire them through meaningful
          melodies.
        </p>
        <Link href="https://youtube.com/@amabeatles8024" target="_blank" rel="noopener" className="About-link">
          Listen on YouTube →
        </Link>
      </div>
    </section>
  );
}
