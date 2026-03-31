import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  cat: string;
  year: string;
  img: string;
}

const designProjects: Project[] = [
  { id: 1, title: "Aeon", cat: "UI Design", year: "2024", img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2670&auto=format&fit=crop" },
  { id: 2, title: "Mono", cat: "Branding", year: "2023", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop" },
  { id: 3, title: "Kinetic", cat: "UI/UX", year: "2023", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
  { id: 4, title: "Prism", cat: "Visual Design", year: "2022", img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2616&auto=format&fit=crop" },
  { id: 5, title: "Haze", cat: "Brand Identity", year: "2024", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop" },
  { id: 6, title: "Lume", cat: "Motion Design", year: "2023", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop" },
  { id: 7, title: "Fold", cat: "Typography", year: "2022", img: "https://images.unsplash.com/photo-1524721696987-b9527df9e512?q=80&w=2333&auto=format&fit=crop" },
];

const devProjects: Project[] = [
  { id: 8,  title: "Nebula", cat: "Full Stack", year: "2024", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop" },
  { id: 9,  title: "Vortex", cat: "App Dev", year: "2023", img: "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=2670&auto=format&fit=crop" },
  { id: 10, title: "Orbit",  cat: "Backend",   year: "2024", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop" },
  { id: 11, title: "Flux",   cat: "React App", year: "2023", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop" },
  { id: 12, title: "Pulse",  cat: "Node.js API", year: "2024", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop" },
  { id: 13, title: "Axon",   cat: "Mobile Dev", year: "2023", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop" },
  { id: 14, title: "Grid",   cat: "Dashboard UI", year: "2022", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="group cursor-pointer flex-shrink-0">
      <div className="work-card-inner relative overflow-hidden aspect-video mb-6">
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:opacity-0 transition-opacity duration-500"></div>
      </div>
      <div className="flex justify-between items-end border-b border-white/20 pb-4">
        <div>
          <h3 className="text-4xl md:text-5xl font-heading mb-1">{project.title}</h3>
          <span className="text-sm font-mono text-gray-400">{project.cat}</span>
        </div>
        <span className="text-sm font-mono">{project.year}</span>
      </div>
    </div>
  );
};

export default function WorkGallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card reveals for both columns
      gsap.utils.toArray('.work-card-inner').forEach((card: any) => {
        gsap.fromTo(card,
          { scale: 0.9, opacity: 0.5 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 50%",
              scrub: 1
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative bg-[#050505] text-white py-24 overflow-hidden">
      <div className="container">
        <div className="mb-24 flex flex-col items-center text-center">
          <h2 className="text-[12vw] leading-[0.8] font-heading font-black mix-blend-exclusion z-10">
            SELECTED
          </h2>
          <h2 className="text-[12vw] leading-[0.8] font-heading font-black text-transparent stroke-text z-10 -mt-4 md:-mt-10">
            WORKS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 px-4 md:px-12">

          {/* Left Column — Design */}
          <div className="md:border-r border-white/10 md:pr-16">
            <div className="flex items-center gap-4 mb-12">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">01</span>
              <div className="flex-1 h-[1px] bg-white/10"></div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/60">Design</span>
            </div>

            {/* Independently scrollable design column */}
            <div
              data-lenis-prevent
              className="overflow-y-auto pr-2"
              style={{ height: '80vh', scrollbarWidth: 'none' }}
            >
              <style>{`.design-col::-webkit-scrollbar { display: none; }`}</style>
              <div className="design-col flex flex-col gap-8">
                {designProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Development */}
          <div className="md:pl-16 mt-16 md:mt-0">
            <div className="flex items-center gap-4 mb-12">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">02</span>
              <div className="flex-1 h-[1px] bg-white/10"></div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/60">Development</span>
            </div>

            {/* Independently scrollable dev column */}
            <div
              data-lenis-prevent
              className="overflow-y-auto pl-2"
              style={{ height: '80vh', scrollbarWidth: 'none' }}
            >
              <style>{`.dev-col::-webkit-scrollbar { display: none; }`}</style>
              <div className="dev-col flex flex-col gap-8">
                {devProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
