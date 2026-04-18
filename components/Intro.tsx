import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.intro-heading',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.intro-heading', start: 'top 85%' },
        }
      );
      gsap.fromTo(
        '.intro-body',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.intro-body', start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32 px-0"
      style={{
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        backgroundImage: 'url(/image/bg.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >

      {/* Vertical grid lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-[8vw]">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-full w-px bg-white/10" />
        ))}
      </div>

      {/* Keywords — left side */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-5">
        {['Design', 'Engineer', 'Innovate'].map((word) => (
          <span
            key={word}
            className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-semibold"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Page indicator — right side */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest opacity-50">02</span>
        <div className="flex flex-col gap-[3px]">
          <span className="block w-4 h-px bg-current opacity-50" />
          <span className="block w-3 h-px bg-current opacity-50" />
          <span className="block w-4 h-px bg-current opacity-50" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto px-[10vw]">

        {/* Headline */}
        <div className="intro-heading mb-16">
          <h2
            className="font-black leading-[1.0] tracking-tight"
            style={{
              fontSize: 'clamp(2.8rem, 7.5vw, 8rem)',
              fontWeight: 900,
              maxWidth: '80%',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            where code<br />
            meets craft —<br />
            built to last
          </h2>
        </div>

        {/* Bottom row: See Work + description */}
        <div className="intro-body flex flex-col md:flex-row md:items-end justify-between gap-12">

          {/* See Work button */}
          <div className="flex items-center gap-4">
            <span className="text-sm tracking-widest uppercase opacity-70">See Our Work</span>
            <button
              className="w-12 h-12 flex items-center justify-center"
              style={{ background: 'currentColor' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5"
                style={{ color: '#050505' }}
              >
                <polygon points="5,3 19,12 5,21" fill="currentColor" />
              </svg>
            </button>
          </div>

          {/* Description */}
          <div className="md:w-[36%]">
            <p className="text-sm leading-relaxed opacity-60 font-dark">
              WeFuturaa is a design-engineering studio where every pixel is intentional
              and every function is purposeful. We bridge the gap between elegant design
              and precise engineering — building digital products that are fast, beautiful,
              and built to endure in a digitally aware world.
            </p>
          </div>
        </div>

        {/* Footer row */}
        <div className="mt-20 flex items-center justify-between opacity-40 text-xs tracking-widest uppercase">
          <span>Get in touch</span>
          <div className="flex gap-6">
            <span>GitHub</span>
            <span>Dribbble</span>
            <span>Behance</span>
          </div>
        </div>

      </div>
    </section>
  );
}
