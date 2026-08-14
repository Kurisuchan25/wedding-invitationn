import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useCountdown from '../../hooks/useCountdown';
import { venue, schedule, dressCode, weddingDateDisplay, weddingDateISO } from '../../utils/weddingData';

gsap.registerPlugin(ScrollTrigger);

// ─── SVG Icons ──────────────────────────────────────────────────────────────
const ICONS = {
  church: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5H7M3 22h18M5 22V10l7-5 7 5v12M12 10v4" />
    </svg>
  ),
  reception: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 22h8M12 17v5M5 3h14l-1.5 8a5.5 5.5 0 0 1-11 0L5 3z" />
    </svg>
  ),
  door: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M14 11h.01" />
    </svg>
  ),
  rings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="12" r="6" />
      <circle cx="15" cy="12" r="6" />
    </svg>
  ),
  cocktail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 22h8M12 15v7M4 3l8 9 8-9H4z" />
    </svg>
  ),
  sparkles: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3 1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3Z" />
    </svg>
  ),
  mapPin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  copy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

const TIMELINE_ICONS = [ICONS.door, ICONS.rings, ICONS.cocktail, ICONS.reception, ICONS.sparkles];

// ─── Ornament — the section's signature flourish, echoing a wax-seal motif ──
function Ornament({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 sm:gap-4 ${className}`} aria-hidden="true">
      <span className="h-px w-14 sm:w-20 bg-gradient-to-r from-transparent to-gold-deep/60" />
      <svg width="22" height="11" viewBox="0 0 22 11" className="shrink-0 text-gold">
        <path d="M1 5.5C4.8.9 17.2.9 21 5.5c-3.8 4.6-16.2 4.6-20 0z" fill="none" stroke="currentColor" strokeWidth="0.9" />
        <path d="M2 5.5h18" stroke="currentColor" strokeWidth="0.55" />
        <path d="M11 2.3v6.4" stroke="currentColor" strokeWidth="0.5" opacity="0.55" />
      </svg>
      <span className="h-px w-14 sm:w-20 bg-gradient-to-l from-transparent to-gold-deep/60" />
    </div>
  );
}

// ─── Medallion — a wax-seal-inspired icon badge reused across the section ──
function Medallion({ icon, size = 'md' }) {
  const dims = size === 'sm' ? 'h-12 w-12 sm:h-14 sm:w-14' : 'h-14 w-14 sm:h-16 sm:w-16';
  const iconDims = size === 'sm' ? 'h-5 w-5' : 'h-5 w-5 sm:h-6 sm:w-6';
  return (
    <div className={`relative shrink-0 ${dims}`}>
      <div className="absolute inset-0 rounded-full border border-gold-deep/25" />
      <div className="absolute inset-[3px] rounded-full border border-gold/45 bg-forest/70 shadow-[0_0_18px_rgba(143,201,255,0.15)] backdrop-blur-md transition-all duration-500 group-hover:scale-105 group-hover:border-gold group-hover:shadow-[0_0_26px_rgba(143,201,255,0.4)]" />
      <div className={`absolute inset-0 flex items-center justify-center text-gold transition-colors duration-500 group-hover:text-ivory`}>
        <div className={`${iconDims} [&>svg]:h-full [&>svg]:w-full`}>{icon}</div>
      </div>
    </div>
  );
}

// ─── Corner flourishes reused on framed panels ─────────────────────────────
function CornerFlourishes() {
  return (
    <>
      <span className="pointer-events-none absolute top-3 left-3 h-5 w-5 border-t border-l border-gold/20 transition-colors duration-500 group-hover:border-gold/70" />
      <span className="pointer-events-none absolute top-3 right-3 h-5 w-5 border-t border-r border-gold/20 transition-colors duration-500 group-hover:border-gold/70" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b border-l border-gold/20 transition-colors duration-500 group-hover:border-gold/70" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-gold/20 transition-colors duration-500 group-hover:border-gold/70" />
    </>
  );
}

// ─── Fine paper-grain texture — tactile depth over the glass panels ───────
function GrainOverlay() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay" aria-hidden="true">
      <filter id="eventDetailsGrain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#eventDetailsGrain)" />
    </svg>
  );
}

// ─── Section Header ─────────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="relative mx-auto mb-16 sm:mb-20 max-w-2xl text-center">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-[45%] select-none font-display text-[8rem] sm:text-[12rem] leading-none text-gold/[0.06]"
      >
        &amp;
      </span>
      <span className="font-body text-xs tracking-[0.35em] uppercase text-gold">
        {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-[clamp(2.6rem,6.5vw,4.2rem)] leading-tight text-ivory">
        {title}
      </h2>
      {subtitle && (
        <div className="mt-5 flex items-center justify-center gap-3 text-gold-light">
          <Ornament />
        </div>
      )}
      {subtitle && (
        <p className="mt-4 font-body italic text-sm sm:text-base tracking-wider text-gold-light">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Arch Glass Event Card ───────────────────────────────────────────────────
function MainEventCard({ type, icon, hall, time, location, countdownUnit = null }) {
  return (
    <div className="group relative flex-1 overflow-hidden rounded-t-[140px] sm:rounded-t-[180px] rounded-b-[32px] border border-gold/20 bg-forest/20 p-8 pt-12 sm:px-12 sm:pb-12 sm:pt-16 backdrop-blur-md shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 hover:bg-forest/30 hover:shadow-[0_25px_60px_-15px_rgba(200,233,246,0.15)]">

      {/* Inner border to accent the arch */}
      <div className="pointer-events-none absolute inset-2 rounded-t-[132px] sm:rounded-t-[172px] rounded-b-3xl border border-gold/10 transition-colors duration-500 group-hover:border-gold/20" />

      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-gold-light/10 rounded-full blur-[60px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50" />

      <div className="relative flex flex-col items-center text-center z-10">

        {/* Floating Medallion with Pulse */}
        <div className="relative">
          <div className="absolute -inset-2 rounded-full bg-gold/10 animate-pulse-seal" />
          <Medallion icon={icon} />
        </div>

        <span className="mt-8 font-body text-[11px] tracking-[0.4em] text-gold-light uppercase font-semibold">
          {type}
        </span>

        <h3 className="mt-4 font-display text-2xl sm:text-3xl leading-snug text-ivory font-normal">
          {hall}
        </h3>

        {/* Elegant Diamond Divider */}
        <div className="my-6 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/40" />
          <div className="w-1.5 h-1.5 rotate-45 border border-gold/60" />
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        <p className="font-body text-sm tracking-[0.2em] text-gold-light font-medium">
          {time}
        </p>

        {countdownUnit && (
          <div className="mt-4 inline-block rounded-full border border-[#C8E9F6]/20 bg-ink/40 px-4 py-1.5 text-[10px] font-mono tracking-widest text-[#C8E9F6] opacity-90 transition-all duration-300 group-hover:bg-ink/60 group-hover:border-[#C8E9F6]/40 shadow-inner">
            IN {countdownUnit.days}D {countdownUnit.hours}H {countdownUnit.minutes}M
          </div>
        )}

        <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-ivory-dim/80">
          <span className="h-3 w-3 text-gold/70">{ICONS.mapPin}</span>
          {location}
        </p>
      </div>
    </div>
  );
}

// ─── Swatch — a wax-drip shaped color chip, echoing the medallion motif ────
function SwatchCard({ hex }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy color code ${hex}`}
      className="group flex flex-col items-center gap-3 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
    >
      <div
        className="relative h-16 w-14 sm:h-20 sm:w-16 overflow-hidden rounded-t-full rounded-b-sm border border-gold-deep/30 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.55)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-gold group-hover:shadow-[0_14px_30px_-8px_rgba(143,201,255,0.35)]"
        style={{ backgroundColor: hex }}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center bg-forest/70 text-gold backdrop-blur-sm transition-opacity duration-300 ${copied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
        >
          <div className="h-4 w-4">{copied ? ICONS.check : ICONS.copy}</div>
        </div>
      </div>
      <span className="font-mono text-[10px] sm:text-xs tracking-widest text-gold-light uppercase">
        {copied ? 'Copied' : hex}
      </span>
    </button>
  );
}

// ─── Main EventDetails Component ────────────────────────────────────────────
export default function EventDetails() {
  const rootRef = useRef(null);
  const [addressCopied, setAddressCopied] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const countdown = useCountdown(weddingDateISO);

  const fullAddress = `${venue.name}, ${venue.area}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setAddressCopied(true);
    setTimeout(() => setAddressCopied(false), 2000);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-fade]').forEach((el) => {
        if (prefersReducedMotion) {
          gsap.set(el, { autoAlpha: 1, y: 0 });
          return;
        }
        gsap.from(el, {
          autoAlpha: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="details"
      ref={rootRef}
      className="relative px-6 py-24 sm:px-12 sm:py-32 overflow-x-hidden"
      style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(189,224,254,0.1) 50%, transparent 100%)' }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-light/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-deep/[0.04] blur-3xl" />
        <GrainOverlay />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Celebrate With Us"
          title="Event Details"
          subtitle={`${weddingDateDisplay.weekday}, ${weddingDateDisplay.full}`}
        />

        {/* Ceremony & Reception Cards */}
        <div data-fade className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="md:-translate-y-3">
            <MainEventCard
              type="Ceremony"
              icon={ICONS.church}
              hall={venue.ceremonyHall}
              time="3:00 PM"
              location={venue.area}
              countdownUnit={countdown}
            />
          </div>
          <div className="md:translate-y-3">
            <MainEventCard
              type="Reception"
              icon={ICONS.reception}
              hall={venue.receptionHall}
              time="6:00 PM"
              location={venue.area}
            />
          </div>
        </div>

        <Ornament className="my-16 sm:my-20" />

        {/* ─── Schedule of Events - Interactive Step Switcher ─── */}
        <div data-fade className="mt-24 sm:mt-28">
          <div className="mb-12 text-center">
            <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">
              Timeline
            </span>
            <h3 className="mt-2 font-display text-3xl sm:text-4xl text-ivory">
              Schedule of Events
            </h3>
          </div>

          <div className="mx-auto max-w-3xl">
            {/* Interactive horizontal steps track */}
            <div className="relative mb-12 flex items-center justify-between overflow-x-auto pb-4 pt-2 px-4 scrollbar-none gap-6 sm:gap-0">

              {/* Connecting line behind steps */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-gold/10 hidden sm:block z-0" />

              {schedule.map((item, idx) => {
                const Icon = TIMELINE_ICONS[idx % TIMELINE_ICONS.length];
                const isActive = activeIdx === idx;

                return (
                  <button
                    key={item.label}
                    onClick={() => setActiveIdx(idx)}
                    className="relative flex flex-col items-center gap-3 shrink-0 focus:outline-none z-10 group cursor-pointer"
                  >
                    {/* Time pill */}
                    <span className={`font-mono text-[10px] tracking-wider px-3 py-1 rounded-full border transition-all duration-300 ${isActive
                      ? 'bg-gold/20 border-gold text-ivory shadow-[0_0_12px_rgba(234,246,253,0.2)]'
                      : 'bg-ink/50 border-gold/10 text-gold-light/60 group-hover:border-gold/30'
                      }`}>
                      {item.time}
                    </span>

                    {/* Step node icon */}
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 ${isActive
                      ? 'border-gold bg-[#0d1622] text-gold shadow-[0_0_20px_rgba(200,233,246,0.4)] scale-110'
                      : 'border-gold/20 bg-[#0d1622]/80 text-gold-light/50 group-hover:border-gold/40 group-hover:scale-105'
                      }`}>
                      <div className="h-4.5 w-4.5 [&>svg]:h-full [&>svg]:w-full">{Icon}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Card Details View */}
            <div
              key={activeIdx}
              style={{ animation: 'fade-up 0.4s ease-out both' }}
              className="group relative overflow-hidden rounded-2xl border border-gold/20 bg-forest/20 p-8 sm:p-12 backdrop-blur-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
            >
              <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl border border-gold/10" />

              {/* Internal decorative glows */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-light/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-20 flex flex-col sm:flex-row gap-8 items-center sm:items-start text-center sm:text-left">
                {/* Large Medallion */}
                <div className="flex-shrink-0">
                  <Medallion icon={TIMELINE_ICONS[activeIdx % TIMELINE_ICONS.length]} size="lg" />
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <span className="font-body text-xs font-semibold tracking-[0.25em] text-gold uppercase block mb-1">
                      {schedule[activeIdx].time}
                    </span>
                    <h4 className="font-display text-3xl sm:text-4xl text-ivory font-normal leading-tight">
                      {schedule[activeIdx].label}
                    </h4>
                  </div>

                  {schedule[activeIdx].note && (
                    <p className="text-sm leading-relaxed text-gold-light/80 max-w-xl">
                      {schedule[activeIdx].note}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Step navigation arrows */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                disabled={activeIdx === 0}
                onClick={() => setActiveIdx(i => Math.max(0, i - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/20 bg-forest/20 text-gold-light hover:border-gold hover:text-gold transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                disabled={activeIdx === schedule.length - 1}
                onClick={() => setActiveIdx(i => Math.min(schedule.length - 1, i + 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/20 bg-forest/20 text-gold-light hover:border-gold hover:text-gold transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* ─── Dress Code ─── */}
        <div data-fade className="mt-24 sm:mt-28">
          <div className="mb-10 text-center">
            <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">
              Attire Guidelines
            </span>
            <h3 className="mt-2 font-display text-3xl sm:text-4xl text-ivory">
              {dressCode.title}
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm leading-relaxed text-gold-light/85">
              {dressCode.description}
            </p>
          </div>

          <div className="group relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gold/20 bg-forest/20 p-8 sm:p-12 backdrop-blur-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-gold/40 hover:bg-forest/30">
            <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl border border-gold/10" />

            {/* Background flourish inside the box */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-light/5 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 group-hover:opacity-75 opacity-50" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 group-hover:opacity-75 opacity-50" />

            <div className="relative z-20">
              <p className="mb-10 text-center font-body text-[11px] tracking-[0.35em] text-gold-light/80 uppercase">
                Suggested Palette
              </p>
              <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                {(dressCode.palette || ['#8FC9FF', '#A2D2FF', '#BDE0FE', '#E5F0FA']).map((hex) => (
                  <SwatchCard key={hex} hex={hex} />
                ))}
              </div>
              <p className="mt-10 text-center text-[11px] text-ivory-dim/60 italic tracking-wide">
                Tap a swatch to copy its color code
              </p>
            </div>
          </div>
        </div>

        <Ornament className="my-16 sm:my-20" />

        {/* ─── Getting There & Map ─── */}
        <div data-fade className="mt-24 sm:mt-28 relative">
          <div className="mb-10 text-center">
            <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">
              Location
            </span>
            <h3 className="mt-2 font-display text-3xl sm:text-4xl text-ivory">
              Getting There
            </h3>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-gold-light/90">
              <span className="relative flex h-3 w-3">
                <span className="animate-map-pin-pulse absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-gold"></span>
              </span>
              {venue.name} · {venue.area}
            </p>
          </div>

          {/* Map Frame (Premium Glassmorphism) */}
          <div className="group relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-gold/20 bg-forest/20 p-2 sm:p-3 backdrop-blur-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-gold/40 hover:bg-forest/30">
            <div className="relative overflow-hidden rounded-xl bg-ink">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-xl border border-gold/10" />
              <iframe
                title="Wedding Venue Map"
                src={venue.mapsEmbedSrc}
                width="100%"
                height="400"
                style={{ border: 0, filter: 'contrast(1.05) saturate(0.95) opacity(0.9)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="transition-all duration-700 group-hover:scale-105 group-hover:filter-none"
              />

              {/* Overlay gradient to blend edges */}
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* Map Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={venue.mapsLink}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full bg-gold px-8 py-3.5 font-body text-xs tracking-[0.25em] text-forest font-semibold uppercase shadow-[0_10px_28px_-10px_rgba(234,246,253,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_-10px_rgba(234,246,253,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
              <span className="relative z-10 flex items-center gap-2">
                <span className="h-4 w-4">{ICONS.mapPin}</span>
                Open in Maps
              </span>
            </a>
            <button
              onClick={handleCopyAddress}
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-gold/30 bg-forest/40 px-8 py-3.5 font-body text-xs tracking-[0.25em] text-gold-light uppercase backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-forest/60 hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <span className="h-4 w-4 transition-transform duration-300 group-hover:scale-110">
                {addressCopied ? ICONS.check : ICONS.copy}
              </span>
              {addressCopied ? 'Address Copied' : 'Copy Location'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}