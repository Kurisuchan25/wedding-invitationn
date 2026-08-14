import { useEffect, useState } from 'react';
import { couple } from '../../utils/weddingData';

const LINKS = [
  {
    id: 'hero',
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    id: 'story',
    label: 'Our Story',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
  {
    id: 'details',
    label: 'Details',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
      </svg>
    ),
  },
  {
    id: 'music',
    label: 'Soundtrack',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </svg>
    ),
  },
  {
    id: 'gallery',
    label: 'Gallery',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
      </svg>
    ),
  },
];

/**
 * Navbar — a floating capsule dock at the bottom center of the screen.
 * Appears once the envelope has been opened.
 */
export default function Navbar({ visible }) {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [visible]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <nav
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-1 px-3 py-2 rounded-full bg-[#1a1a2e]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {LINKS.map((link) => {
          const isActive = active === link.id;
          return (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              title={link.label}
              aria-label={link.label}
              className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group ${isActive
                  ? 'bg-white text-[#1a1a2e] shadow-[0_0_12px_rgba(255,255,255,0.3)]'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
            >
              {link.icon}

              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1a1a2e] text-white text-[0.6rem] tracking-wider uppercase px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none border border-white/10">
                {link.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
