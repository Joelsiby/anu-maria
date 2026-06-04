'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

const CYCLING_WORDS = ['collaborations', 'worship events', 'studio projects'];
const CYCLE_INTERVAL = 2500;

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Cycling word animation
  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIndex(wordIndex);
      setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
    }, CYCLE_INTERVAL);
    return () => clearInterval(timer);
  }, [wordIndex]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  const handleMenuOpen = useCallback(() => setMenuOpen(true), []);
  const handleMenuClose = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      {/* ─── Fixed Overlay UI ─── */}
      <div className="Overlay" ref={overlayRef} role="banner">
        {/* Upper row */}
        <div className="Overlay-upper">
          {/* Top-left: Role + availability */}
          <div className="Overlay-upper--item">
            <p className="Uppercase">Singer | Performer</p>
            <p className="Uppercase">
              Available for{' '}
              <span className="CyclingWord" aria-live="polite">
                {/* Hidden sizer for stable width */}
                <span className="CyclingWord-sizer" aria-hidden="true">
                  collaborations
                </span>
                {CYCLING_WORDS.map((word, i) => (
                  <span
                    key={word}
                    className={`CyclingWord-item ${
                      i === wordIndex
                        ? '__active'
                        : i === prevIndex
                        ? '__prev'
                        : '__next'
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </p>
          </div>

          {/* Top-center: Small logo */}
          <div className="Overlay-upper--item __logo">
            <div className="Overlay-upper--item---logo">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 633 292"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="Overlay-upper--item---logo-svg"
              >
                {/* Simplified "YN" monogram — replace with your own logo */}
                <text
                  x="316"
                  y="200"
                  textAnchor="middle"
                  fontFamily="'Bricolage Grotesque', sans-serif"
                  fontWeight="800"
                  fontSize="180"
                  fill="black"
                  letterSpacing="-8"
                >
                  ANU
                </text>
                <text
                  x="316"
                  y="290"
                  textAnchor="middle"
                  fontFamily="'Dancing Script', cursive"
                  fontWeight="700"
                  fontSize="100"
                  fill="#E8C84A"
                >
                  Maria
                </text>
              </svg>
            </div>
          </div>

          {/* Top-right: Menu button removed per request */}
        </div>

        {/* Lower row */}
        <div className="Overlay-lower">
          <div className="Overlay-lower--item">
            <p className="Uppercase">Music Portfolio</p>
          </div>
          <div className="Overlay-lower--item">
            <p className="Uppercase">Singer & Creator</p>
          </div>
        </div>
      </div>

      {/* ─── Fullscreen Menu ─── */}
      <div className={`Menu ${menuOpen ? '__open' : ''}`}>
        <button
          className="Menu-close"
          onClick={handleMenuClose}
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 37 37"
            fill="none"
          >
            <path
              d="M4.205 0L0 4.204L32.796 37L37 32.796L4.205 0Z"
              fill="white"
            />
            <path
              d="M0 32.796L4.205 37L37 4.204L32.796 0L0 32.796Z"
              fill="white"
            />
          </svg>
        </button>

        <nav className="Menu-nav">
          {[
            { label: 'Home', href: '/' },
            { label: 'About', href: '#about' },
            { label: 'Projects', href: '#projects' },
            { label: 'Contact', href: '#footer' },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={`Menu-nav--item Uppercase ${
                item.href === '/' ? 'Active' : ''
              }`}
              onClick={handleMenuClose}
              style={{ textTransform: 'none', fontSize: undefined, letterSpacing: undefined }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="Menu-lang">
          <span className="Menu-lang--item __active Uppercase">EN</span>
          <span className="Menu-lang--sep" aria-hidden="true">
            /
          </span>
          <span className="Menu-lang--item Uppercase">FR</span>
        </div>
      </div>
    </>
  );
}
