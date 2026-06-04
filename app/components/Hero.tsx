'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const landingRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const bgSvgRef = useRef<SVGSVGElement>(null);
  const gridVRef = useRef<(HTMLSpanElement | null)[]>([]);
  const gridHRef = useRef<(HTMLSpanElement | null)[]>([]);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.8 });

      // Grid lines animate in
      tl.fromTo(
        gridVRef.current.filter(Boolean),
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          stagger: 0.08,
          transformOrigin: 'top',
        },
        0
      );

      tl.fromTo(
        gridHRef.current.filter(Boolean),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          stagger: 0.08,
          transformOrigin: 'left',
        },
        0.1
      );

      // Background decorative SVG fades in
      tl.to(
        bgSvgRef.current,
        {
          opacity: 0.07,
          duration: 1.5,
          ease: 'power2.out',
        },
        0.3
      );

      // Name lines slide up
      tl.fromTo(
        line1Ref.current,
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
        },
        0.6
      );

      tl.fromTo(
        line2Ref.current,
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
        },
        0.75
      );
    }, landingRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="Landing" ref={landingRef}>
      {/* Grid background lines */}
      <div className="BackgroundLine">
        <div className="BackgroundLine-vertical">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={`v${i}`}
              className="BackgroundLine-vertical--item"
              ref={(el) => { gridVRef.current[i] = el; }}
              style={{ transform: 'scaleY(0)' }}
            />
          ))}
        </div>
        <div className="BackgroundLine-horizontal">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={`h${i}`}
              className="BackgroundLine-horizontal--item"
              ref={(el) => { gridHRef.current[i] = el; }}
              style={{ transform: 'scaleX(0)' }}
            />
          ))}
        </div>
      </div>

      {/* Decorative background SVG */}
      <div className="Landing-background">
        <svg
          ref={bgSvgRef}
          className="Landing-background-svg"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Large decorative calligraphic swoosh */}
          <path
            d="M120 450 C 180 200, 350 100, 420 280 S 550 500, 650 200 Q 700 50, 600 120 C 500 200, 480 380, 550 450 S 700 500, 720 350"
            stroke="currentColor"
            strokeWidth="40"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M80 500 C 150 300, 250 150, 380 250 S 500 450, 600 250 C 650 150, 580 100, 520 180 S 420 350, 500 420 Q 580 480, 680 380"
            stroke="currentColor"
            strokeWidth="25"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Centered name */}
      <div className="Landing-container" ref={nameRef}>
        <div className="Landing-name">
          <div className="Landing-name-line" ref={line1Ref} style={{ opacity: 0 }}>
            <span className="Landing-name-bold">ANU</span>
            <span className="Landing-name-script __trail" style={{ marginLeft: '10px' }}>Maria</span>
          </div>
          <div className="Landing-name-line" ref={line2Ref} style={{ opacity: 0 }}>
            <span className="Landing-name-bold">ANTO</span>
            <span className="Landing-name-script __trail">ny</span>
          </div>
        </div>
      </div>
    </section>
  );
}
