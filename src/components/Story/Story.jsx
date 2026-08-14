import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { storyTimeline } from '../../utils/weddingData';

gsap.registerPlugin(ScrollTrigger);

// Each chapter: cinematic background + a couple photo for the right panel
const CHAPTERS = [
  {
    ...storyTimeline[0],
    bg: '/images/story-ch1.png',
    photo: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/612d1402-0ad9-4135-3bbc-a30a6a252b00/w=800',
    photoAlt: 'Marjory & James — the first meeting',
    chapterNum: '01',
  },
  {
    ...storyTimeline[1],
    bg: '/images/story-ch2.png',
    photo: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/be854dd1-37aa-4fc7-f569-fdb948109300/w=800',
    photoAlt: 'Laughing together on a weekend trip',
    chapterNum: '02',
  },
  {
    ...storyTimeline[2],
    bg: '/images/story-ch3.png',
    photo: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/aeaa0756-9647-4f6c-d900-204bd25e4a00/w=800',
    photoAlt: 'The proposal at Taal Lake',
    chapterNum: '03',
  },
  {
    ...storyTimeline[3],
    bg: '/images/story-ch4.png',
    photo: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/316d1761-fd79-4ca9-b8d4-f2bb20521a00/w=800',
    photoAlt: 'Marjory & James — forever begins',
    chapterNum: '04',
  },
];

// ─── Individual full-screen chapter panel ─────────────────────────────────────
function ChapterPanel({ chapter, isActive, totalCount }) {
  const textRef = useRef(null);
  const photoRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Photo slides in from right
    tl.fromTo(
      photoRef.current,
      { autoAlpha: 0, x: 60, scale: 1.06 },
      { autoAlpha: 1, x: 0, scale: 1, duration: 0.95 }
    )
      // Accent line expands
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6 },
        '-=0.6'
      )
      // Text items stagger in from left
      .fromTo(
        textRef.current.querySelectorAll('.reveal-item'),
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.11 },
        '-=0.5'
      );

    return () => tl.kill();
  }, [isActive]);

  return (
    <div
      className="absolute inset-0 transition-opacity duration-700"
      style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none' }}
    >
      {/* ── Full-screen cinematic background ── */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-out"
        style={{
          backgroundImage: `url('${chapter.bg}')`,
          transform: isActive ? 'scale(1.04)' : 'scale(1.1)',
        }}
      />

      {/* Multi-layer gradient: dark left half, transparent right half for photo clarity */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, rgba(13,21,29,0.97) 0%, rgba(13,21,29,0.80) 42%, rgba(13,21,29,0.25) 65%, rgba(13,21,29,0.1) 100%),
            linear-gradient(to top, rgba(13,21,29,0.7) 0%, transparent 35%),
            linear-gradient(to bottom, rgba(13,21,29,0.5) 0%, transparent 20%)
          `,
        }}
      />

      {/* Film grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Content: split left (text) + right (photo) ── */}
      <div className="absolute inset-0 flex items-center">

        {/* LEFT — Chapter Text */}
        <div
          ref={textRef}
          className="relative z-10 flex h-full w-full flex-col justify-center px-8 sm:px-14 md:px-20 lg:px-28"
          style={{ maxWidth: '520px' }}
        >
          {/* Chapter + year */}
          <div className="reveal-item mb-5 flex items-center gap-3">
            <span className="font-cinzel text-[0.62rem] tracking-[0.5em] uppercase text-[#C8E9F6]">
              Chapter {chapter.chapterNum}
            </span>
            <span className="mx-1 h-px w-6 bg-[#EAF6FD]" />
            <span className="font-cinzel text-[0.62rem] tracking-[0.3em] text-[#EAF6FD]">
              {chapter.year}
            </span>
          </div>

          {/* Accent line */}
          <div
            ref={lineRef}
            className="reveal-item mb-5 h-[2px] origin-left"
            style={{
              width: '52px',
              background: 'linear-gradient(90deg, #C8E9F6, #EAF6FD)',
            }}
          />

          {/* Title */}
          <h2
            className="reveal-item font-script leading-[1.1]"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              color: '#EFEFEF',
              textShadow: '0 2px 24px rgba(0,0,0,0.5)',
            }}
          >
            {chapter.title}
          </h2>

          {/* Divider */}
          <div className="reveal-item my-5 flex items-center gap-2">
            <span className="h-px w-5 bg-[#EAF6FD]" />
            <span className="h-1 w-1 rounded-full bg-[#C8E9F6]" />
            <span className="h-px w-5 bg-[#EAF6FD]" />
          </div>

          {/* Description */}
          <p
            className="reveal-item text-sm leading-relaxed sm:text-base"
            style={{ color: '#C8E9F6', maxWidth: '400px' }}
          >
            {chapter.description}
          </p>

          {/* Step counter */}
          <div className="reveal-item mt-10 flex items-end gap-2">
            <span className="font-cinzel text-3xl font-light text-[#EAF6FD] leading-none">
              {chapter.chapterNum}
            </span>
            <span className="mb-0.5 font-cinzel text-sm text-[#EAF6FD30]">
              / {String(totalCount).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* RIGHT — Couple Photo */}
        <div
          ref={photoRef}
          className="absolute right-0 top-1/2 hidden -translate-y-1/2 md:block"
          style={{
            width: 'clamp(280px, 35vw, 520px)',
            right: 'clamp(80px, 10vw, 160px)',
          }}
        >
          {/* Outer frame glow */}
          <div
            className="relative"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(114,150,164,0.25)) drop-shadow(0 24px 60px rgba(0,0,0,0.5))',
            }}
          >
            {/* Decorative corner lines */}
            <div className="pointer-events-none absolute -inset-2 z-10">
              {/* Top-left */}
              <svg className="absolute left-0 top-0 h-8 w-8 text-[#C8E9F6]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M 0 16 L 0 0 L 16 0" />
              </svg>
              {/* Top-right */}
              <svg className="absolute right-0 top-0 h-8 w-8 text-[#C8E9F6]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M 32 16 L 32 0 L 16 0" />
              </svg>
              {/* Bottom-left */}
              <svg className="absolute bottom-0 left-0 h-8 w-8 text-[#C8E9F6]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M 0 16 L 0 32 L 16 32" />
              </svg>
              {/* Bottom-right */}
              <svg className="absolute bottom-0 right-0 h-8 w-8 text-[#C8E9F6]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M 32 16 L 32 32 L 16 32" />
              </svg>
            </div>

            {/* The photo itself */}
            <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <img
                src={chapter.photo}
                alt={chapter.photoAlt}
                className="h-full w-full object-cover transition-transform duration-[2000ms] ease-out"
                style={{ transform: isActive ? 'scale(1.04)' : 'scale(1.12)' }}
                loading="lazy"
              />

              {/* Subtle blue tint overlay on photo */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(114,150,164,0.15), rgba(13,21,29,0.2))',
                }}
              />

              {/* Bottom caption strip */}
              <div
                className="absolute inset-x-0 bottom-0 px-4 py-3"
                style={{ background: 'linear-gradient(to top, rgba(13,21,29,0.9), transparent)' }}
              >
                <p className="font-cinzel text-[0.6rem] tracking-[0.3em] text-[#C8E9F6] uppercase">
                  {chapter.photoAlt}
                </p>
              </div>
            </div>

            {/* Thin border around photo */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ border: '1px solid rgba(158,190,203,0.3)' }}
            />
          </div>
        </div>

        {/* Mobile-only compact photo strip (visible below md) */}
        <div
          className="absolute bottom-24 right-4 z-10 md:hidden"
          style={{ width: '120px' }}
        >
          <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: '3/4' }}>
            <img
              src={chapter.photo}
              alt={chapter.photoAlt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ border: '1px solid rgba(158,190,203,0.4)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Navigation arrows ────────────────────────────────────────────────────────
function NavArrow({ direction, onClick, disabled }) {
  const isUp = direction === 'up';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#C8E9F6]/30 bg-[#1b4a6b]/50 backdrop-blur-sm transition-all duration-300 hover:border-[#C8E9F6]/70 hover:bg-[#EAF6FD]/20 disabled:cursor-not-allowed disabled:opacity-20"
      aria-label={isUp ? 'Previous chapter' : 'Next chapter'}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="#C8E9F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        className={`h-5 w-5 transition-transform duration-200 ${isUp ? 'group-hover:-translate-y-0.5' : 'group-hover:translate-y-0.5'}`}>
        {isUp ? <path d="M18 15l-6-6-6 6" /> : <path d="M6 9l6 6 6-6" />}
      </svg>
    </button>
  );
}

// ─── Chapter dots ─────────────────────────────────────────────────────────────
function ChapterDots({ chapters, activeIndex, onSelect }) {
  return (
    <div className="flex flex-col items-center gap-4">
      {chapters.map((ch, i) => (
        <button
          key={ch.year}
          onClick={() => onSelect(i)}
          className="flex flex-col items-center gap-1 transition-all duration-300"
          aria-label={`Chapter ${i + 1}: ${ch.title}`}
        >
          <span
            className="block rounded-full transition-all duration-500"
            style={{
              width: i === activeIndex ? '8px' : '5px',
              height: i === activeIndex ? '8px' : '5px',
              background: i === activeIndex ? '#C8E9F6' : '#EAF6FD',
              boxShadow: i === activeIndex ? '0 0 10px rgba(205,222,229,0.7)' : 'none',
            }}
          />
          {i === activeIndex && (
            <span className="font-cinzel text-[0.55rem] tracking-[0.2em] text-[#C8E9F6]">
              {ch.year}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// ─── Scroll hint ──────────────────────────────────────────────────────────────
function ScrollHint({ visible }) {
  return (
    <div
      className="flex flex-col items-center gap-2 transition-all duration-500"
      style={{ opacity: visible ? 1 : 0, pointerEvents: 'none' }}
    >
      <span className="font-cinzel text-[0.58rem] tracking-[0.5em] text-[#EAF6FD] uppercase">Scroll</span>
      <div className="relative h-10 w-5 overflow-hidden rounded-full border border-[#EAF6FD]/50">
        <div
          className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#C8E9F6]"
          style={{ animation: 'scrollDot 1.6s ease-in-out infinite' }}
        />
      </div>
    </div>
  );
}

// ─── Main Story ───────────────────────────────────────────────────────────────
export default function Story() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef(null);
  const touchStartY = useRef(null);
  const lastWheelTime = useRef(0);

  const navigate = useCallback((dir) => {
    if (isAnimating) return;
    const next = activeIndex + dir;
    if (next < 0 || next >= CHAPTERS.length) return;
    setIsAnimating(true);
    setActiveIndex(next);
    setTimeout(() => setIsAnimating(false), 900);
  }, [activeIndex, isAnimating]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleWheel = (e) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 850) return;
      lastWheelTime.current = now;
      const rect = section.getBoundingClientRect();
      if (rect.top > 20 || rect.bottom < window.innerHeight - 20) return;
      e.preventDefault();
      navigate(e.deltaY > 0 ? 1 : -1);
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [navigate]);

  useEffect(() => {
    const handleTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
    const handleTouchEnd = (e) => {
      if (touchStartY.current === null) return;
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
      touchStartY.current = null;
    };
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigate]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') navigate(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        autoAlpha: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative h-[100svh] min-h-[600px] overflow-hidden"
      style={{ background: '#1b4a6b' }}
    >
      {/* Panels */}
      {CHAPTERS.map((chapter, i) => (
        <ChapterPanel
          key={chapter.year}
          chapter={chapter}
          isActive={i === activeIndex}
          totalCount={CHAPTERS.length}
        />
      ))}

      {/* Right nav cluster */}
      <div className="absolute right-5 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-5 sm:right-8">
        <NavArrow direction="up" onClick={() => navigate(-1)} disabled={activeIndex === 0 || isAnimating} />
        <ChapterDots chapters={CHAPTERS} activeIndex={activeIndex} onSelect={setActiveIndex} />
        <NavArrow direction="down" onClick={() => navigate(1)} disabled={activeIndex === CHAPTERS.length - 1 || isAnimating} />
      </div>

      {/* Bottom scroll hint */}
      <div className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2">
        <ScrollHint visible={activeIndex === 0} />
      </div>

      {/* Section label */}
      <div className="absolute left-8 top-7 z-20 sm:left-12">
        <span className="font-cinzel text-[0.58rem] tracking-[0.5em] text-[#EAF6FD] uppercase">Our Story</span>
      </div>

      {/* Screen-edge glows */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28"
        style={{ background: 'linear-gradient(to bottom, rgba(13,21,29,0.65), transparent)' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28"
        style={{ background: 'linear-gradient(to top, rgba(13,21,29,0.8), transparent)' }} />
    </section>
  );
}
