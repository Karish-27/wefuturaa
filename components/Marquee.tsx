import { useEffect, useRef } from 'react';

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 200;
    let halfWidth = 0;
    let x = 0;
    let last: number | null = null;
    let raf: number;

    function tick(now: number) {
      if (last !== null) {
        // clamp delta to 50ms so dropped frames don't cause a visible jump
        const delta = Math.min(now - last, 50);
        x -= speed * (delta / 1000);
        if (x <= -halfWidth) x += halfWidth;
        track.style.transform = `translateX(${x}px)`;
      }
      last = now;
      raf = requestAnimationFrame(tick);
    }

    function start() {
      halfWidth = track.scrollWidth / 2;
      raf = requestAnimationFrame(tick);
    }

    // Reset last on tab refocus so we don't catch up with a big delta spike
    function onVisibility() {
      if (!document.hidden) last = null;
    }
    document.addEventListener('visibilitychange', onVisibility);

    // Wait for fonts so scrollWidth is measured with the real typeface
    (document.fonts?.ready ?? Promise.resolve()).then(start);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className="py-12 md:py-24 overflow-hidden bg-bg-color text-dark border-y border-gray-300">
      <div
        ref={trackRef}
        className="flex whitespace-nowrap"
        style={{ willChange: 'transform' }}
      >
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-12 px-6 flex-shrink-0">
            <span className="text-[8vw] font-heading font-bold uppercase leading-none">
              Strategy
            </span>
            <span className="w-4 h-4 rounded-full bg-dark flex-shrink-0" />
            <span className="text-[8vw] font-heading font-bold uppercase leading-none">
              Design
            </span>
            <span className="w-4 h-4 rounded-full bg-dark flex-shrink-0" />
            <span className="text-[8vw] font-heading font-bold uppercase leading-none">
              Development
            </span>
            <span className="w-4 h-4 rounded-full bg-dark flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
