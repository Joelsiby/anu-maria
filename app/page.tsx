import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Marquee from './components/Marquee';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import Preloader from './components/Preloader';

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <SmoothScroll />
      <Nav />
      <main className="relative w-full" style={{ background: 'var(--bg)' }}>
        <h1 className="sr-only">
          Creative Developer | WebGL, GSAP, Three.js
        </h1>
        <div className="relative" style={{ zIndex: 10 }}>
          <Hero />
          <About />
          <Projects />
          <Marquee />
        </div>
      </main>
      <Footer />
    </>
  );
}
