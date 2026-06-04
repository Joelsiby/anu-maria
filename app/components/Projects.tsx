'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    year: '2025',
    client: 'Featured Vocalist',
    name: 'Holybeats × Shalom (Song 1)',
    tags: ['YouTube', 'Vocalist', 'Performance'],
    img: 'https://img.youtube.com/vi/zj_rQOqM3P8/hqdefault.jpg',
    href: 'https://youtu.be/zj_rQOqM3P8',
  },
  {
    year: '2025',
    client: 'Featured Vocalist',
    name: 'Holybeats × Shalom (Song 2)',
    tags: ['YouTube', 'Music Video'],
    img: 'https://img.youtube.com/vi/5RTG0oWV7ds/hqdefault.jpg',
    href: 'https://youtu.be/5RTG0oWV7ds',
  },
  {
    year: '2025',
    client: 'Solo',
    name: 'Devotional Song',
    tags: ['YouTube', 'Devotional', 'Faith'],
    img: 'https://img.youtube.com/vi/doEx6WdPV8I/hqdefault.jpg',
    href: 'https://youtu.be/doEx6WdPV8I',
  },
  {
    year: '2025',
    client: 'Cover Song',
    name: 'Featured: New Year',
    tags: ['Instagram', 'Reel', 'Cover'],
    img: '/instagram_1.png',
    href: 'https://www.instagram.com/reel/DS9tmg_CKvi/',
  },
  {
    year: '2025',
    client: 'Christmas Cover',
    name: 'Featured: Christmas',
    tags: ['Instagram', 'Reel', 'Christmas'],
    img: '/instagram_2.png',
    href: 'https://www.instagram.com/reel/DSpW-0dAasJ/',
  },
  {
    year: '2025',
    client: 'Onam Cover',
    name: 'Featured: Onam',
    tags: ['Instagram', 'Reel', 'Onam'],
    img: '/instagram_3.png',
    href: 'https://www.instagram.com/reel/DONQ0rmEcWy/',
  },
];

export default function Projects() {
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const hoverImageRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const pos = useRef({ x: -500, y: -500 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Scroll reveal animation
    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
        }
      );
    });

    // Mouse follower for the hover image
    const hoverEl = hoverImageRef.current;
    if (!hoverEl) return;

    let rafId: number;
    const currentPos = { x: -500, y: -500 };
    
    const animate = () => {
      currentPos.x += (pos.current.x - currentPos.x) * 0.15;
      currentPos.y += (pos.current.y - currentPos.y) * 0.15;
      
      // We apply standard transform because opacity/scale is handled by CSS class __active
      if (hoverEl) {
        hoverEl.style.left = `${currentPos.x}px`;
        hoverEl.style.top = `${currentPos.y}px`;
      }
      
      rafId = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="projects" className="Projects">
      <div className="Projects-header">
        <div className="Uppercase" style={{ fontSize: '14px' }}>Featured Projects</div>
        <div className="Uppercase" style={{ fontSize: '14px', color: 'var(--accent)' }}>0{PROJECTS.length} works</div>
      </div>

      <div 
        className="ProjectList"
        onTouchMove={(e) => {
          const touch = e.touches[0];
          pos.current.x = touch.clientX;
          pos.current.y = touch.clientY;
          const el = document.elementFromPoint(touch.clientX, touch.clientY);
          const row = el?.closest('.ProjectRow') as HTMLAnchorElement;
          if (row) {
            const index = itemsRef.current.indexOf(row);
            if (index !== -1 && PROJECTS[index]) {
              setActiveImage(PROJECTS[index].img);
              setIsHovering(true);
            }
          } else {
            setIsHovering(false);
          }
        }}
        onTouchEnd={() => setIsHovering(false)}
      >
        {PROJECTS.map((p, i) => (
          <Link
            key={i}
            href={p.href}
            className="ProjectRow"
            ref={(el) => { itemsRef.current[i] = el; }}
            style={{ opacity: 0 }}
            onMouseEnter={() => {
              setActiveImage(p.img);
              setIsHovering(true);
            }}
            onMouseLeave={() => {
              setIsHovering(false);
            }}
          >
            <div className="ProjectRow-left">
              <span className="ProjectRow-year">{p.year} — {p.client}</span>
              <span className="ProjectRow-title">{p.name}</span>
            </div>
            
            <div className="ProjectRow-right">
              <div className="ProjectRow-tags">
                {p.tags.map((t, j) => (
                  <span key={j} className="ProjectRow-tag">{t}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Cursor-following hover image */}
      <div 
        ref={hoverImageRef} 
        className={`ProjectHoverImage ${isHovering ? '__active' : ''}`}
      >
        {activeImage && <img src={activeImage} alt="Project preview" />}
      </div>

      <div style={{ textAlign: 'center', marginTop: '120px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link
          href="https://www.instagram.com/anu_mariantony"
          target="_blank"
          rel="noopener"
          style={{
            display: 'inline-block',
            padding: '20px 60px',
            border: '1px solid rgba(0,0,0,0.2)',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--fg)',
            textDecoration: 'none',
            transition: 'background-color 0.3s, color 0.3s',
            borderRadius: '40px'
          }}
          onMouseEnter={e => {
            (e.target as HTMLAnchorElement).style.backgroundColor = 'var(--fg)';
            (e.target as HTMLAnchorElement).style.color = 'var(--bg)';
          }}
          onMouseLeave={e => {
            (e.target as HTMLAnchorElement).style.backgroundColor = 'transparent';
            (e.target as HTMLAnchorElement).style.color = 'var(--fg)';
          }}
        >
          See Instagram
        </Link>
        <Link
          href="https://youtube.com/@amabeatles8024"
          target="_blank"
          rel="noopener"
          style={{
            display: 'inline-block',
            padding: '20px 60px',
            border: '1px solid rgba(0,0,0,0.2)',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--fg)',
            textDecoration: 'none',
            transition: 'background-color 0.3s, color 0.3s',
            borderRadius: '40px'
          }}
          onMouseEnter={e => {
            (e.target as HTMLAnchorElement).style.backgroundColor = 'var(--fg)';
            (e.target as HTMLAnchorElement).style.color = 'var(--bg)';
          }}
          onMouseLeave={e => {
            (e.target as HTMLAnchorElement).style.backgroundColor = 'transparent';
            (e.target as HTMLAnchorElement).style.color = 'var(--fg)';
          }}
        >
          See YouTube
        </Link>
      </div>
    </section>
  );
}
