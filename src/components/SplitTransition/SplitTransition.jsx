import { useState, useEffect } from 'react';

export default function SplitTransition() {
  const [stage, setStage] = useState('initial'); // 'initial' | 'line-in' | 'text-in' | 'text-out' | 'split'

  useEffect(() => {
    // 1. Line In: Horizontal line expands from center
    const timer1 = setTimeout(() => setStage('line-in'), 100);

    // 2. Text In: Cursive and Serif Wedding Text enters
    const timer2 = setTimeout(() => setStage('text-in'), 600);

    // 3. Text Out: Elegant fade/zoom out before split
    const timer3 = setTimeout(() => setStage('text-out'), 3000);

    // 4. Split Exit: Top & Bottom panel reveal together with the line
    const timer4 = setTimeout(() => setStage('split'), 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  if (stage === 'done') return null;

  const isLineIn = stage !== 'initial';
  const isTextIn = stage === 'text-in';
  const isSplit = stage === 'split';
  const isTextOut = stage === 'text-out' || isSplit;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col overflow-hidden">
      {/* Top Panel - Silver Accent Line sa ilalim */}
      <div
        onTransitionEnd={() => stage === 'split' && setStage('done')}
        className={`w-full h-1/2 bg-gradient-to-b from-[#030a16] via-[#071325] to-[#0d1e36] relative transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] origin-top ${
          isSplit ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* Top Half Silver-White Line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-100 to-transparent shadow-[0_0_12px_rgba(255,255,255,0.9)] transition-all duration-1000 ease-out ${
            isLineIn ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
        />
      </div>

      {/* Bottom Panel - Silver Accent Line sa itaas */}
      <div
        className={`w-full h-1/2 bg-gradient-to-t from-[#030a16] via-[#071325] to-[#0d1e36] relative transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] origin-bottom ${
          isSplit ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* Bottom Half Silver-White Line */}
        <div
          className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-100 to-transparent shadow-[0_0_12px_rgba(255,255,255,0.9)] transition-all duration-1000 ease-out ${
            isLineIn ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
        />
      </div>

      {/* Wedding Typography Content */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center z-10 transition-all duration-700 ease-in-out px-4 ${
          isTextOut
            ? 'opacity-0 scale-95 -translate-y-4 blur-sm'
            : 'opacity-100 scale-100 translate-y-0'
        }`}
      >
        {/* Luxury Silver Monogram / Crest */}
        <div
          className={`w-14 h-14 mb-3 rounded-full border border-slate-200/60 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.25)] bg-white/5 backdrop-blur-sm transition-all duration-1000 ${
            isTextIn ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-45'
          }`}
        >
          <span className="text-slate-100 text-xl font-serif italic" style={{ fontFamily: "'Great Vibes', cursive" }}>
            W
          </span>
        </div>

        {/* Elegant Calligraphy Subtitle (Silver White) */}
        <p
          style={{ fontFamily: "'Great Vibes', cursive" }}
          className={`text-slate-200 text-2xl sm:text-3xl font-normal transition-all duration-700 delay-200 ${
            isTextIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          You Are Cordially Invited To The
        </p>

        {/* Classic Roman Serif Main Title (Metallic Platinum / Silver Gradient) */}
        <h1
          style={{ fontFamily: "'Cinzel', serif" }}
          className={`text-3xl sm:text-6xl font-semibold tracking-[0.2em] my-2 transition-all duration-1000 delay-400 uppercase bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(255,255,255,0.4)] ${
            isTextIn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
          }`}
        >
          Wedding Invitation
        </h1>

        {/* Date / Location Accent Line (Silver Accent) */}
        <p
          style={{ fontFamily: "'Playfair Display', serif" }}
          className={`text-slate-300/80 text-xs sm:text-sm tracking-[0.3em] uppercase italic transition-all duration-700 delay-500 mt-1 ${
            isTextIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          ✦ Save The Date ✦
        </p>
      </div>
    </div>
  );
}