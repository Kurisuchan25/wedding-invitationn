import { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import gsap from 'gsap';
import useCountdown from '../../hooks/useCountdown';
import {
  couple,
  weddingDateISO,
  weddingDateDisplay,
  venue,
} from '../../utils/weddingData';

/* ─── Phases ───────────────────────────────────────────────────────────────── */
const P = { LOADING: 0, IDLE: 1, OPENING: 2, CARD: 3, ENTERED: 4 };

const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

/* ─── 3-D sparkle ring ─────────────────────────────────────────────────────── */
function HeroFigure() {
  const ref = useRef(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.07;
    ref.current.position.y = -0.55 + Math.sin(state.clock.elapsedTime * 0.25) * 0.015;
  });
  return (
    <group ref={ref} position={[0, -0.78, -0.6]}>
      <mesh position={[0, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.7, 0.08, 28, 160]} />
        <meshStandardMaterial color="#C8E9F6" transparent opacity={0.1} />
      </mesh>
      <Sparkles count={26} size={0.8} speed={0.12} noise={0.7} color="#C8E9F6" />
    </group>
  );
}

/* ─── Ambient particles ────────────────────────────────────────────────────── */
function AmbientParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 18 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${1.5 + (i % 3)}px`,
            height: `${1.5 + (i % 3)}px`,
            left: `${5 + (i * 5.7) % 90}%`,
            top: `${8 + (i * 7.3) % 82}%`,
            background: i % 3 === 0 ? '#C8E9F6' : '#C8E9F6',
            opacity: 0.08 + (i % 5) * 0.04,
            animation: `float-particle ${6 + (i % 4) * 1.8}s ease-in-out ${(i % 7) * 0.55}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Corner ornaments ─────────────────────────────────────────────────────── */
function CornerOrnaments() {
  return (
    <div className="pointer-events-none">
      {[
        { cls: 'top-5 left-5 sm:top-8 sm:left-8', d1: 'M0 14 H68 M68 14 V22', d2: 'M14 0 V68 M14 68 H22', rx: 8, ry: 8 },
        { cls: 'top-5 right-5 sm:top-8 sm:right-8', d1: 'M80 14 H12 M12 14 V22', d2: 'M66 0 V68 M66 68 H58', rx: 62, ry: 8 },
        { cls: 'bottom-5 left-5 sm:bottom-8 sm:left-8', d1: 'M0 66 H68 M68 66 V58', d2: 'M14 80 V12 M14 12 H22', rx: 8, ry: 62 },
        { cls: 'bottom-5 right-5 sm:bottom-8 sm:right-8', d1: 'M80 66 H12 M12 66 V58', d2: 'M66 80 V12 M66 12 H58', rx: 62, ry: 62 },
      ].map((c, i) => (
        <div key={i} className={`absolute ${c.cls} z-20 text-[#C8E9F6]/60`}>
          <svg width="64" height="64" viewBox="0 0 80 80" fill="none" stroke="currentColor">
            <path d={c.d1} strokeWidth="1" />
            <path d={c.d2} strokeWidth="1" />
            <rect x={c.rx} y={c.ry} width="10" height="10" strokeWidth="0.7" />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* ─── Countdown unit ───────────────────────────────────────────────────────── */
function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="flex items-center justify-center backdrop-blur-sm"
        style={{
          width: 'clamp(44px, 11vw, 56px)', height: 'clamp(52px, 13vw, 64px)',
          border: '1px solid rgba(114,150,164,0.45)',
          background: 'rgba(22,35,46,0.7)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
        }}
      >
        <span className="font-serif text-[#EFEFEF]" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)' }}>
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="font-cinzel text-[#C8E9F6] uppercase" style={{ fontSize: 'clamp(0.5rem, 1.1vw, 0.6rem)', letterSpacing: '0.2em' }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Realistic Round Metallic Gold Button Seal ────────────────────────────── */
function WaxSeal({ sealRef, isIdle, onClick }) {
  return (
    <div
      ref={sealRef}
      className="absolute z-[35] cursor-pointer group"
      onClick={onClick}
      style={{
        width: 'clamp(54px, 11vw, 68px)',
        height: 'clamp(54px, 11vw, 68px)',
        left: '50%',
        bottom: 'calc(clamp(54px, 11vw, 68px) * -0.48)',
        transform: 'translateX(-50%)',
        filter: 'drop-shadow(0 10px 22px rgba(0, 0, 0, 0.85)) drop-shadow(0 3px 8px rgba(0, 0, 0, 0.5))',
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full transition-transform duration-300 group-hover:scale-105"
        style={{
          animation: isIdle ? 'pulse-seal 3s ease-in-out infinite' : 'none',
        }}
      >
        <defs>
          {/* Outer Ring Gold Metallic Gradient */}
          <radialGradient id="goldButtonOuterGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fff6bd" />
            <stop offset="25%" stopColor="#e3c25b" />
            <stop offset="60%" stopColor="#ba8f25" />
            <stop offset="85%" stopColor="#87610f" />
            <stop offset="100%" stopColor="#453003" />
          </radialGradient>

          {/* Center Dish Gold Metallic Gradient */}
          <radialGradient id="goldButtonCenterGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fff8c9" />
            <stop offset="30%" stopColor="#e0bc4e" />
            <stop offset="70%" stopColor="#ab7e1b" />
            <stop offset="100%" stopColor="#634505" />
          </radialGradient>
        </defs>

        {/* Outer Round Metallic Gold Bevel Rim */}
        <circle cx="50" cy="50" r="47" fill="url(#goldButtonOuterGrad)" stroke="#382502" strokeWidth="0.8" />

        {/* Outer Highlight Ring */}
        <circle cx="50" cy="50" r="46.5" fill="none" stroke="#fff8ce" strokeWidth="0.8" opacity="0.75" />

        {/* Concentric Step 1 */}
        <circle cx="50" cy="50" r="41" fill="url(#goldButtonOuterGrad)" />

        {/* Inner Debossed Circular Groove */}
        <circle cx="50" cy="50" r="36" fill="none" stroke="#3d2b04" strokeWidth="2.2" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="#ffe07d" strokeWidth="0.8" opacity="0.9" />

        {/* Center Stamped Metallic Dish */}
        <circle cx="50" cy="50" r="33.5" fill="url(#goldButtonCenterGrad)" />
        <circle cx="50" cy="50" r="33.5" fill="none" stroke="#684b07" strokeWidth="0.6" />

        {/* Debossed Center Emblem (Double Ring & Diamond Accent instead of Letter) */}
        <circle cx="50" cy="50" r="23" fill="none" stroke="#382502" strokeWidth="1.2" opacity="0.65" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="#fff5b8" strokeWidth="0.6" opacity="0.75" />
        <rect x="46.5" y="46.5" width="7" height="7" fill="#382502" transform="rotate(45 50 50)" opacity="0.75" />
        <rect x="47.5" y="47.5" width="5" height="5" fill="#ffe285" transform="rotate(45 50 50)" />
      </svg>
    </div>
  );
}

/* ─── Main Hero ────────────────────────────────────────────────────────────── */
export default function Hero({ opened, onOpen }) {
  const [phase, setPhase] = useState(P.LOADING);
  const countdown = useCountdown(weddingDateISO);

  const bgRef = useRef(null);
  const sceneRef = useRef(null);   // perspective + envelope scene
  const envRef = useRef(null);
  const flapRef = useRef(null);
  const sealRef = useRef(null);
  const contentRef = useRef(null);

  /* ── Entry: fade in bg + envelope ─────────────────────────────────────────── */
  useEffect(() => {
    gsap.set(bgRef.current, { opacity: 0 });
    gsap.set(sceneRef.current, { opacity: 0, y: 40 });

    gsap.timeline()
      .to(bgRef.current, { opacity: 1, duration: 1.6, ease: 'power2.out' })
      .to(sceneRef.current, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.8')
      .call(() => setPhase(P.IDLE));
  }, []);

  /* ── Open envelope directly into website ──────────────────────────────────── */
  const handleOpen = useCallback(() => {
    if (phase !== P.IDLE) return;
    setPhase(P.OPENING);

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Seal pulses & fades
    tl.to(sealRef.current, { scale: 1.15, duration: 0.2, ease: 'power2.out' })
      .to(sealRef.current, { scale: 0.8, opacity: 0, duration: 0.35, ease: 'power2.in' });

    // 2. Flap rotates open (true 3-D perspective)
    tl.to(flapRef.current, { rotateX: -175, duration: 0.95, ease: 'power3.inOut' }, '-=0.2');

    // 3. Envelope scales up slightly & fades directly out
    tl.to(sceneRef.current, { scale: 1.05, opacity: 0, duration: 0.7, ease: 'power2.inOut' }, '-=0.4')
      .call(() => {
        setPhase(P.ENTERED);
        onOpen();
      });
  }, [phase, onOpen]);

  /* ── Reveal main content when ENTERED ─────────────────────────────────────── */
  useEffect(() => {
    if (phase !== P.ENTERED || !contentRef.current) return;
    // Set hidden via GSAP (not React style) then reveal
    gsap.set(contentRef.current, { autoAlpha: 0 });
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to(contentRef.current, { autoAlpha: 1, duration: 0.5 })
        .from('[data-rv="eyebrow"]', { autoAlpha: 0, y: 14, duration: 0.7 }, '-=0.3')
        .from('[data-rv="names"]', { autoAlpha: 0, y: 26, duration: 0.9 }, '-=0.5')
        .from('[data-rv="date"]', { autoAlpha: 0, y: 14, duration: 0.7 }, '-=0.5')
        .from('[data-rv="cd-unit"]', { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.09 }, '-=0.45')
        .from('[data-rv="scroll"]', { autoAlpha: 0, duration: 0.7 }, '-=0.2');
    }, contentRef);
    return () => ctx.revert();
  }, [phase]);

  /* ─────────────────────────────────────────────────────────────────────────── */
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ── Background ─────────────────────────────────────────────────────── */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          filter: opened ? 'blur(8px) brightness(0.35)' : 'brightness(0.52) saturate(0.85)',
          transition: 'filter 1.2s ease',
        }}
      />
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(13,21,29,0.55) 0%, rgba(13,21,29,0.1) 40%, rgba(13,21,29,0.75) 100%)' }}
      />

      <AmbientParticles />
      {phase < P.ENTERED && <CornerOrnaments />}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/*   ENVELOPE SCENE  (phases 0 – 3)                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {phase < P.ENTERED && (
        <div
          ref={sceneRef}
          className="relative z-10 flex flex-col items-center"
          style={{ perspective: '1400px', perspectiveOrigin: 'center center' }}
        >
          {/* ── Envelope ──────────────────────────────────────────────────── */}
          <div
            ref={envRef}
            id="envelope"
            className="relative cursor-pointer select-none"
            style={{
              width: 'min(500px, 92vw)',
              height: 'min(320px, 59vw)',
              filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.85)) drop-shadow(0 8px 20px rgba(0,0,0,0.6))',
            }}
            onClick={handleOpen}
            role="button"
            aria-label="Open wedding envelope"
          >
            {/* Interior cream lining (visible when opening) */}
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(148deg, #f7f0e6 0%, #ebdecb 100%)' }}
            />

            {/* Fold-crease lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 500 320" preserveAspectRatio="none" style={{ opacity: 0.35 }}>
              <line x1="0" y1="320" x2="250" y2="160" stroke="#9a8060" strokeWidth="0.6" strokeDasharray="4 3" />
              <line x1="500" y1="320" x2="250" y2="160" stroke="#9a8060" strokeWidth="0.6" strokeDasharray="4 3" />
              <line x1="0" y1="0" x2="250" y2="160" stroke="#9a8060" strokeWidth="0.6" strokeDasharray="4 3" />
              <line x1="500" y1="0" x2="250" y2="160" stroke="#9a8060" strokeWidth="0.6" strokeDasharray="4 3" />
            </svg>

            {/* Monogram watermark on interior */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.07 }}>
              <span className="font-script text-[#EAF6FD]" style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}>
                {couple.monogram}
              </span>
            </div>

            {/* ─── Envelope fold overlays (Rich Royal Navy Blue Paper) ─── */}
            {/* Base envelope paper background */}
            <div className="absolute inset-0" style={{ background: '#0b2647' }} />

            {/* Bottom V-fold */}
            <div className="absolute inset-x-0 bottom-0 z-[8] pointer-events-none"
              style={{
                height: '60%',
                background: 'linear-gradient(175deg, #0c1d4a 0%, #091f3a 100%)',
                clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
              }}
            />

            {/* Left fold */}
            <div className="absolute inset-y-0 left-0 z-[8] pointer-events-none"
              style={{
                width: '51%',
                background: 'linear-gradient(255deg, #0d2d54 0%, #081e38 100%)',
                clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
              }}
            />

            {/* Right fold */}
            <div className="absolute inset-y-0 right-0 z-[8] pointer-events-none"
              style={{
                width: '51%',
                background: 'linear-gradient(105deg, #0d2d54 0%, #081e38 100%)',
                clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)',
              }}
            />

            {/* Crisp Seam Line SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-[12]" viewBox="0 0 500 320" preserveAspectRatio="none">
              <line x1="0" y1="0" x2="250" y2="198" stroke="#051324" strokeWidth="1.5" opacity="0.75" />
              <line x1="500" y1="0" x2="250" y2="198" stroke="#051324" strokeWidth="1.5" opacity="0.75" />
              <line x1="0" y1="0" x2="250" y2="198" stroke="#1d4573" strokeWidth="0.8" opacity="0.4" />
              <line x1="500" y1="0" x2="250" y2="198" stroke="#1d4573" strokeWidth="0.8" opacity="0.4" />
            </svg>

            {/* ─── Top flap (3-D hinge) ─── */}
            <div
              ref={flapRef}
              className="absolute inset-x-0 top-0 z-[20] pointer-events-none"
              style={{
                height: '62%',
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
                filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.65))',
              }}
            >
              {/* Flap front face (Royal Navy Blue) */}
              <div className="absolute inset-0"
                style={{
                  background: 'linear-gradient(195deg, #0e3057 0%, #0a2342 70%, #081b33 100%)',
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                  backfaceVisibility: 'hidden',
                }}
              />
              {/* Flap subtle paper sheen */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                  background: 'linear-gradient(175deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
                  backfaceVisibility: 'hidden',
                }}
              />

              {/* Flap edge highlight stroke */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 198" preserveAspectRatio="none">
                <polyline points="0,0 250,198 500,0" fill="none" stroke="#1a4675" strokeWidth="1" opacity="0.6" />
                <polyline points="0,0 250,198 500,0" fill="none" stroke="#041221" strokeWidth="1.5" opacity="0.8" />
              </svg>

              {/* Realistic Gold Wax Seal */}
              <WaxSeal sealRef={sealRef} isIdle={phase === P.IDLE} />
            </div>

            {/* Subtle paper edge highlight */}
            <div className="absolute inset-0 z-[25] pointer-events-none"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            />
          </div>

          {/* ── Tap to open prompt ────────────────────────────────────────── */}
          {phase === P.IDLE && (
            <div className="mt-9 flex flex-col items-center gap-3 cursor-pointer select-none" onClick={handleOpen}>
              <p className="font-cinzel uppercase text-[#C8E9F6]"
                style={{
                  fontSize: 'clamp(0.53rem, 1.1vw, 0.63rem)',
                  letterSpacing: '0.5em',
                  animation: 'pulse-opacity 2.2s ease-in-out infinite',
                }}>
                Tap to Open
              </p>
              <div style={{ animation: 'bounce-down 1.8s ease-in-out infinite' }}>
                <svg viewBox="0 0 24 12" fill="none" stroke="#EAF6FD" strokeWidth="1.2"
                  strokeLinecap="round" style={{ width: '26px', height: '13px' }}>
                  <path d="M2 2 L12 10 L22 2" />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/*   MAIN HERO CONTENT  (phase = ENTERED)                            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {phase === P.ENTERED && (
        <div
          ref={contentRef}
          className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-7 px-6 text-center"
        >
          {/* 3-D sparkle canvas */}
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <Canvas className="h-full w-full" dpr={[1, 1.8]}
              camera={{ position: [0, 0, 5.5], fov: 38 }}
              gl={{ antialias: true, alpha: true }}>
              <ambientLight intensity={0.4} color="#C8E9F6" />
              <HeroFigure />
            </Canvas>
          </div>

          <p data-rv="eyebrow" className="font-cinzel uppercase text-[#C8E9F6]"
            style={{ fontSize: 'clamp(0.58rem, 1.2vw, 0.72rem)', letterSpacing: '0.35em' }}>
            {weddingDateDisplay.weekday}&nbsp;·&nbsp;{venue.name}, {venue.area}
          </p>

          <h1 data-rv="names" className="font-script text-[#EFEFEF] leading-tight"
            style={{ fontSize: 'clamp(3.5rem, 9.5vw, 5.6rem)' }}>
            {couple.groom}
            <span className="inline-block font-script italic text-[#C8E9F6]"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)', margin: '0 clamp(0.5rem, 1.4vw, 1.1rem)' }}>
              &amp;
            </span>
            {couple.bride}
          </h1>

          <p data-rv="date" className="font-serif italic text-[#dce9f7] tracking-widest"
            style={{ fontSize: 'clamp(0.95rem, 2.3vw, 1.25rem)' }}>
            {weddingDateDisplay.full}
          </p>

          <div className="flex gap-3 sm:gap-5">
            {UNITS.map((u) => (
              <div key={u.key} data-rv="cd-unit">
                <CountdownUnit value={countdown[u.key]} label={u.label} />
              </div>
            ))}
          </div>

          <div data-rv="scroll" className="mt-5 flex flex-col items-center gap-2 text-[#C8E9F6]">
            <span className="font-cinzel tracking-[0.3em] uppercase" style={{ fontSize: '0.65rem' }}>
              Scroll
            </span>
            <span className="h-10 w-px animate-pulse bg-[#EAF6FD]" />
          </div>
        </div>
      )}
    </section>
  );
}
