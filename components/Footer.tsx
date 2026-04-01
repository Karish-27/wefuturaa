import React from 'react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#050505] text-[#e1e1e1] relative overflow-hidden">
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
          
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-8">Sitemap</h4>
            <ul className="space-y-4 text-gray-400">
              {['Work', 'Services', 'Agency', 'Careers'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors text-lg">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
             <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-8">Connect</h4>
             <ul className="space-y-4 text-gray-400">
              <li>
                <a href="https://www.linkedin.com/in/krutikparmar1/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-lg">LinkedIn</a>
              </li>
              <li>
                <a href="https://github.com/Karish-27" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-lg">GitHub</a>
              </li>
              <li>
                <a href="mailto:krutikparmar119@gmail.com" className="hover:text-white transition-colors text-lg">Email</a>
              </li>
              <li>
                <a href="tel:+919265542717" className="hover:text-white transition-colors text-lg">Phone</a>
              </li>
            </ul>
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
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-5">
         <h1 className="text-[30vw] leading-[0.7] font-black text-center translate-y-[20%]">WEFUTURAA</h1>
      </div>
    </footer>
  );
}