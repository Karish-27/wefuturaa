import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type Service = {
  id: number;
  title: string;
  category: string;
  img: string;
  desc: string;
  deliverables: string[];
};

const services: Service[] = [
  {
    id: 1,
    title: 'UI/UX Design',
    category: 'Design',
    img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2000',
    desc: 'We craft interfaces that feel intuitive and look stunning. Every screen is designed with the user\'s journey at its core — balancing aesthetics with usability to create experiences people actually enjoy.',
    deliverables: ['User Research & Personas', 'Wireframes & Prototypes', 'Visual UI Design', 'Design Systems', 'Usability Testing'],
  },
  {
    id: 2,
    title: 'Brand Identity',
    category: 'Branding',
    img: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2000',
    desc: 'Your brand is more than a logo — it\'s the feeling people get when they interact with you. We build cohesive visual identities that communicate who you are instantly and memorably.',
    deliverables: ['Logo Design', 'Color & Typography System', 'Brand Guidelines', 'Visual Language', 'Brand Collateral'],
  },
  {
    id: 3,
    title: 'Web Development',
    category: 'Engineering',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2000',
    desc: 'From marketing sites to complex web applications, we write clean, performant code that brings designs to life with precision. Built for speed, scalability, and maintainability.',
    deliverables: ['Frontend Development', 'Backend & APIs', 'CMS Integration', 'Performance Optimization', 'Deployment & Hosting'],
  },
  {
    id: 4,
    title: 'Interactive Interfaces',
    category: 'Frontend',
    img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000',
    desc: 'We push the boundaries of what the web can feel like — rich animations, scroll storytelling, 3D elements, and micro-interactions that make your digital product impossible to forget.',
    deliverables: ['Scroll Animations', 'Motion Design', '3D Web Experiences', 'Micro-interactions', 'Creative Prototypes'],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(services[0].img);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(revealRef.current, { xPercent: -50, yPercent: -50 });

      const items = listRef.current?.children;
      if (items) {
        Array.from(items).forEach((item) => {
          gsap.fromTo(item,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: item, start: 'top 95%' } }
          );
        });
      }

      const moveReveal = (e: MouseEvent) => {
        if (!revealRef.current) return;
        gsap.to(revealRef.current, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
      };

      globalThis.addEventListener('mousemove', moveReveal);
      return () => globalThis.removeEventListener('mousemove', moveReveal);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate modal open/close
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(modalRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedService]);

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0, y: 40, duration: 0.3, ease: 'power3.in',
      onComplete: () => setSelectedService(null),
    });
  };

  const handleMouseEnter = (img: string) => {
    setActiveImage(img);
    gsap.to(revealRef.current, { scale: 1, opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(revealRef.current, { scale: 0, opacity: 0, duration: 0.3 });
  };

  return (
    <section ref={sectionRef} id="services" className="section-padding bg-[#7D2EE2] bg-svg-pattern text-[#f4f4f4] relative z-10 overflow-hidden">

      {/* Floating hover image */}
      <div
        ref={revealRef}
        className="fixed top-0 left-0 w-[300px] h-[400px] pointer-events-none z-50 opacity-0 scale-0 hidden md:block rounded-lg overflow-hidden mix-blend-exclusion"
        style={{ willChange: 'transform' }}
      >
        <img src={activeImage} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20">
          <h2 className="text-6xl md:text-8xl font-bold mb-8 md:mb-0">Our<br />Expertise</h2>
          <p className="max-w-xs text-sm uppercase tracking-wide text-gray-400 pt-4">
            End-to-end creative and technical services — from concept to code.
          </p>
        </div>

        <ul ref={listRef} className="border-t border-gray-700">
          {services.map((service) => (
            <li
              key={service.id}
              className="group border-b border-gray-700 relative overflow-hidden cursor-pointer"
              onMouseEnter={() => handleMouseEnter(service.img)}
              onMouseLeave={handleMouseLeave}
              onClick={() => setSelectedService(service)}
            >
              <div className="relative z-10 flex justify-between items-center py-12 px-4 group-hover:px-8 transition-all duration-500">
                <div className="flex items-baseline gap-8">
                  <span className="text-xs font-mono text-gray-500 group-hover:text-white transition-colors">0{service.id}</span>
                  <h3 className="text-3xl md:text-5xl group-hover:text-white transition-colors group-hover:translate-x-4 duration-500">{service.title}</h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs uppercase tracking-widest opacity-0 md:opacity-100 group-hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75">
                    {service.category}
                  </span>
                  <ArrowUpRight className="w-8 h-8 text-gray-500 group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            className="relative bg-[#111] text-[#f4f4f4] w-full max-w-3xl rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="h-56 md:h-72 overflow-hidden">
              <img src={selectedService.img} alt={selectedService.title} className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-gray-500">{selectedService.category}</span>
                  <h2 className="text-4xl md:text-5xl font-bold mt-2">{selectedService.title}</h2>
                </div>
                <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors cursor-none mt-1">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed mb-10">{selectedService.desc}</p>

              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">What's included</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedService.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
