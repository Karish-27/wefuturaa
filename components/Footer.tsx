import { useEffect, useRef, useState } from 'react';
import { FaLinkedinIn, FaDribbble, FaBehance, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Footer() {
  const [linkedinOpen, setLinkedinOpen] = useState(false);
  const linkedinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!linkedinOpen) return;
    const handler = (e: MouseEvent) => {
      if (linkedinRef.current && !linkedinRef.current.contains(e.target as Node)) {
        setLinkedinOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [linkedinOpen]);

  return (
    <footer id="contact" className="bg-[#050505] text-[#ffffff] relative overflow-x-hidden">
      <div className="section-padding container relative z-10">
        
        {/* Call to Action */}
        <div className="mb-32 flex flex-col items-center text-center">
            <h2 className="text-[5vw] leading-none mb-8 font-serif-italic">Have an idea?</h2>
            <a href="mailto:krutikparmar119@gmail.com" className="text-[8vw] md:text-[10vw] font-bold leading-none text-white border-b-2 border-transparent hover:border-white transition-colors duration-300">
                LET'S TALK
            </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/10 pt-16">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-[Syne] font-bold block mb-8">wefuturaa</span>
            <p className="max-w-xs text-gray-500 text-lg leading-relaxed">
              Developer & Designer crafting digital experiences where beautiful design meets precise engineering. Specializing in UI/UX, React, and full-stack development.
            </p>
          </div>
          
          <div className="col-span-1 md:col-span-2 flex flex-col justify-start">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-8">Connect</h4>
            <div className="flex flex-wrap gap-4">
              <div className="relative" ref={linkedinRef}>
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={linkedinOpen}
                  aria-label="LinkedIn profiles"
                  onClick={() => setLinkedinOpen((o) => !o)}
                  className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/40"
                >
                  <FaLinkedinIn size={22} />
                </button>
                {linkedinOpen && (
                  <div className="absolute left-0 top-full mt-2 min-w-max z-50">
                    <div className="bg-[#0a0a0a] border border-white/20 rounded-lg p-1 shadow-lg">
                      <a
                        href="https://www.linkedin.com/in/krutikparmar1/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setLinkedinOpen(false)}
                        className="block px-4 py-2 text-xs font-mono uppercase tracking-wider text-white/80 hover:bg-white hover:text-black rounded whitespace-nowrap"
                      >
                        Krutik Parmar
                      </a>
                      <a
                        href="https://www.linkedin.com/in/karishma-kumavat-480891241/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setLinkedinOpen(false)}
                        className="block px-4 py-2 text-xs font-mono uppercase tracking-wider text-white/80 hover:bg-white hover:text-black rounded whitespace-nowrap"
                      >
                        Karishma Kumavat
                      </a>
                    </div>
                  </div>
                )}
              </div>
              {[
                { icon: <FaDribbble size={22} />, href: 'https://dribbble.com/Krutik_Parmar', label: 'Dribbble' },
                { icon: <FaBehance size={22} />, href: 'https://www.behance.net/krutikp', label: 'Behance' },
                { icon: <FaEnvelope size={22} />, href: 'mailto:krutikparmar119@gmail.com', label: 'Email' },
                { icon: <FaPhone size={22} />, href: 'tel:+919265542717', label: 'Contact' },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white hover:text-black transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-32 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-widest">
            <span>© 2026 wefuturaa • Vadodara, GUjarat</span>
            <div className="flex gap-8 mt-4 md:mt-0">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
        </div>
      </div>
      
      {/* Giant Background Text */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none opacity-5">
        <h1
          className="font-black text-center whitespace-nowrap"
          style={{
            fontSize: 'clamp(1rem, 16vw, 99vw)',
            lineHeight: 0.8,
            marginBottom: '-0.12em',
          }}
        >
          WEFUTURAA
        </h1>
      </div>
    </footer>
  );
}