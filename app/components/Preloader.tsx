'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const vlineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const hlineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 0.3,
      onComplete: () => setDone(true),
    });

    // Phase 1: Grid lines appear on the white overlay
    tl.fromTo(
      vlineRefs.current.filter(Boolean),
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 0.6,
        ease: 'power3.inOut',
        stagger: 0.06,
        transformOrigin: 'top',
      },
      0
    );

    tl.fromTo(
      hlineRefs.current.filter(Boolean),
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.6,
        ease: 'power3.inOut',
        stagger: 0.06,
        transformOrigin: 'left',
      },
      0.1
    );

    // Phase 2: White background slides up, revealing the page
    tl.to(
      bgRef.current,
      {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
      },
      0.9
    );

    // Phase 3: Grid lines fade out
    tl.to(
      [...vlineRefs.current.filter(Boolean), ...hlineRefs.current.filter(Boolean)],
      {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
      },
      1.1
    );
  }, []);

  if (done) return null;

  return (
    <div className="PageTransition" ref={containerRef}>
      <div className="PageTransition-bg" ref={bgRef} />
      {[1, 2, 3].map((i) => (
        <span
          key={`v${i}`}
          className={`PageTransition-vline __${i}`}
          ref={(el) => { vlineRefs.current[i - 1] = el; }}
          style={{ transform: 'scaleY(0)' }}
        />
      ))}
      {[1, 2, 3].map((i) => (
        <span
          key={`h${i}`}
          className={`PageTransition-hline __${i}`}
          ref={(el) => { hlineRefs.current[i - 1] = el; }}
          style={{ transform: 'scaleX(0)' }}
        />
      ))}
    </div>
  );
}
