import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Beams from './Beams';
import { FaGithub, FaLinkedinIn, FaDribbble, FaBehance } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

function SocialLinks() {
  const [liOpen, setLiOpen] = useState(false);

  return (
    <div className="flex gap-2 mt-2">
      {/* Direct links */}
      <a href="https://github.com/Karish-27" target="_blank" rel="noopener noreferrer"
        className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors">
        <FaGithub size={14} />
      </a>

      {/* LinkedIn — dropdown for two profiles */}
      <div className="relative" onMouseEnter={() => setLiOpen(true)} onMouseLeave={() => setLiOpen(false)}>
        <button
          onClick={() => setLiOpen(o => !o)}
          className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors"
        >
          <FaLinkedinIn size={14} />
        </button>
        {liOpen && (
          <div className="absolute top-full right-0 pt-2 z-50">
            <div className="flex flex-col bg-[#111] border border-white/10 rounded-lg overflow-hidden">
              <a href="https://www.linkedin.com/in/karishma-kumavat-480891241/" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-mono tracking-wider text-white/70 hover:bg-white hover:text-black transition-colors whitespace-nowrap">
                Karishma
              </a>
              <a href="https://www.linkedin.com/in/krutikparmar1/" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-mono tracking-wider text-white/70 hover:bg-white hover:text-black transition-colors whitespace-nowrap border-t border-white/10">
                Krutik
              </a>
            </div>
          </div>
        )}
      </div>

      <a href="https://dribbble.com/Krutik_Parmar" target="_blank" rel="noopener noreferrer"
        className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors">
        <FaDribbble size={14} />
      </a>

      <a href="https://www.behance.net/krutikp" target="_blank" rel="noopener noreferrer"
        className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors">
        <FaBehance size={14} />
      </a>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial clear state
      gsap.set(".hero-char", { yPercent: 120, rotateZ: 10 });

      // Chaotic text entry
      tl.to(".hero-char", {
        yPercent: 0,
        rotateZ: 0,
        stagger: 0.05,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.5
      });
      
      gsap.from(".hero-fade", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        delay: 1
      });

      // Parallax Background Image
      gsap.to(".hero-bg", {
        yPercent: 30,
        scale: 1.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const title = "WEFUTURAA";

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#050505] text-[#FFFFFF]">
      {/* Beams animated background */}
      <div className="absolute inset-0 z-0">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>

      {/* Background Image with effects */}
      <div className="hero-bg absolute inset-0 z-0 opacity-40">
         <img
           src="/image/hero_bg.jpg"
           alt="Hero background"
           className="w-full h-full object-cover grayscale contrast-125 scale-105"
         />
         <div className="absolute inset-0 bg-[#050505]/50 mix-blend-multiply"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
      </div>

      {/* Dark veil over beams to keep text sharp */}
      <div className="absolute inset-0 z-[1] bg-[#050505]/70 pointer-events-none"></div>

      <div className="relative z-10 w-full h-full flex flex-col justify-between p-4 sm:p-6 md:p-12">
        <div className="flex justify-between items-start hero-fade mt-10 md:mt-16">
           <div className="flex flex-col gap-2 md:gap-3">
             <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest opacity-60">
               ( Est. 2026 )
             </div>
             <div className="hidden md:block text-xs font-mono uppercase tracking-wider opacity-40 max-w-[200px]">
               Developer & Designer<br/>
               <span className="text-white/60">Code meets Craft</span>
             </div>
           </div>
           <div className="hidden md:flex text-right flex-col items-end gap-2 md:gap-3">
             <div className="flex items-center gap-2">
               <span className="text-xs font-mono uppercase tracking-wider opacity-50">Available for work</span>
               <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
             </div>
             <div className="text-xs font-mono uppercase tracking-wider opacity-50">
               Vadodara, GUJ
             </div>
             <SocialLinks />
           </div>
        </div>


        <div className="relative mb-8 md:mb-12">
          <h1 ref={titleRef} className="text-[10vw] sm:text-[8vw] md:text-[7vw] leading-[1.1] font-heading font-black tracking-tight text-white">
            <div className="flex flex-wrap">
              {title.split("").map((char, i) => (
                <span key={i} className="hero-char inline-block origin-bottom will-change-transform">{char}</span>
              ))}
            </div>
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mt-6 md:mt-12 border-t border-white/20 pt-4 md:pt-8 hero-fade gap-4 md:gap-6">
            <div className="flex-1 max-w-2xl">
              <p className="text-sm sm:text-base md:text-xl lg:text-2xl font-serif-italic text-gray-300 leading-snug mb-4 md:mb-6">
                "Crafting digital experiences where elegant design and precise engineering collide."
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-[10px] md:text-xs font-mono uppercase tracking-wider opacity-70">
                <div>
                  <div className="text-white/40 mb-1">Dev Stack</div>
                  <div>MERN Stack • TypeScript • Git • Tailwind • HTML • CSS • JavaScript • MySQL</div>
                </div>
                <div>
                  <div className="text-white/40 mb-1">Design</div>
                  <div>Figma • Framer</div>
                </div>
                <div>
                  <div className="text-white/40 mb-1">Motion</div>
                  <div>GSAP • Three.js</div>
                </div>
                <div>
                  <div className="text-white/40 mb-1">Focus</div>
                  <div>Dev + Design</div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
               <span className="inline-block px-6 md:px-8 py-3 md:py-4 border border-white/30 rounded-full uppercase text-[10px] md:text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer">
                 Scroll Down
               </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}