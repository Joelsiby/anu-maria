'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    let raf: number;
    const animate = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.12;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.12;
      follower.style.left = followerPos.current.x + 'px';
      follower.style.top = followerPos.current.y + 'px';
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onEnter = () => cursor.classList.add('hover');
    const onLeave = () => cursor.classList.remove('hover');

    const addHoverListeners = () => {
      const links = document.querySelectorAll('a, button, [data-hover], [role="button"]');
      links.forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
      return links;
    };

    // Initial bind
    let links = addHoverListeners();

    // Re-bind on DOM changes (e.g. menu open/close)
    const observer = new MutationObserver(() => {
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      links = addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMouseMove);

    // Hide cursor on touch devices
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    if (mediaQuery.matches) {
      cursor.style.display = 'none';
      follower.style.display = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}
