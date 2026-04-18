import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { label: 'Strategy', desc: 'We start with purpose — understanding your goals before a single pixel is placed.' },
  { label: 'Design', desc: 'Craft that speaks. Every interface is a conversation between brand and human.' },
  { label: 'Development', desc: 'Built to last. Clean, performant code that brings the vision to life precisely.' },
];

const stats = [
  { value: '20+', label: 'Projects Delivered' },
  { value: '5+', label: 'Years of Craft' },
  { value: '100%', label: 'Client Satisfaction' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-heading', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      gsap.from('.about-stat', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-stats', start: 'top 80%' },
      });
      gsap.from('.about-value', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-values', start: 'top 75%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-padding bg-[#050505] text-[#]">
      <div className="container">

        {/* Label */}
        <div className="mb-16">
          <span className="text-xs font-mono uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full">
            About Us
          </span>
        </div>

        {/* Headline */}
        <div className="about-heading mb-20 max-w-5xl">
          <h2 className="text-5xl md:text-7xl leading-tight">
            We build digital<br />
            <span className="font-serif-italic text-white/60">experiences</span> that<br />
            move people forward.
          </h2>
          <p className="mt-8 text-lg md:text-xl text-white max-w-2xl leading-relaxed">
            wefuturaa is a design &amp; development studio obsessed with the intersection of
            aesthetics and function. We partner with brands to create digital products that
            are intentional, beautiful, and built to perform.
          </p>
        </div>

        {/* Stats */}
        <div className="about-stats grid grid-cols-3 gap-8 border-t border-white/10 pt-16 mb-24">
          {stats.map((s) => (
            <div key={s.label} className="about-stat">
              <p className="text-5xl md:text-6xl font-bold font-heading">{s.value}</p>
              <p className="mt-2 text-sm uppercase tracking-widest text-white/40">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="about-values grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/10">
          {values.map((v, i) => (
            <div
              key={v.label}
              className={`about-value pt-24 pb-10 pr-8 ${i > 0 ? 'pl-10' : ''} ${i < values.length - 1 ? 'md:border-r border-white/10' : ''}`}
            >
              <span className="text-xs font-mono uppercase tracking-widest text-white/30">
                0{i + 1}
              </span>
              <h3 className="mt-4 text-2xl md:text-3xl font-bold font-heading uppercase">{v.label}</h3>
              <p className="mt-4 text-white/50 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
