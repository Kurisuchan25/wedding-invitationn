import React, { useState, useEffect } from 'react';
import CircleImage from './CircleImage';
import { spotifyPlaylistUrl, weddingPlaylist } from '../../utils/weddingData';

// Moment color badge map
const momentColors = {
  'First Dance':   { bg: 'bg-[#1DB954]/20', text: 'text-[#1DB954]',  border: 'border-[#1DB954]/30' },
  'Ceremony':      { bg: 'bg-rose-500/20',  text: 'text-rose-300',   border: 'border-rose-400/30'  },
  'Reception':     { bg: 'bg-amber-500/20', text: 'text-amber-300',  border: 'border-amber-400/30' },
  'Dinner':        { bg: 'bg-purple-500/20',text: 'text-purple-300', border: 'border-purple-400/30'},
  'Cocktail Hour': { bg: 'bg-sky-500/20',   text: 'text-sky-300',    border: 'border-sky-400/30'   },
  'Send-off':      { bg: 'bg-pink-500/20',  text: 'text-pink-300',   border: 'border-pink-400/30'  },
};

export default function MusicSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="music" className="relative flex flex-col items-center justify-center min-h-screen py-16 sm:py-24 bg-[#dff0f7] overflow-hidden text-[#0a2540] font-sans">
      
      {/* Spotify Signature Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#b8dff0]/60 via-[#dff0f7] to-[#cce8f4] opacity-80 pointer-events-none" />

      {/* Floating Music Notes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['♪', '♫', '♬', '♪', '♫', '♩'].map((note, i) => (
          <span 
            key={i}
            className="absolute text-[#5bafd6] opacity-30 text-2xl sm:text-4xl"
            style={{
              left: `${10 + (i * 15)}%`,
              top: `${20 + (i * 10) % 60}%`,
              animation: `float-particle ${5 + i}s ease-in-out ${i * 0.5}s infinite alternate`
            }}
          >
            {note}
          </span>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6 mx-auto flex flex-col items-center text-center">
        {/* Heading */}
        <div className="inline-block mb-4 sm:mb-8 text-center">
           <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0a2540] mb-2">
             Our Soundtrack
           </h2>
           <p className="text-[#3a6f8f] text-base sm:text-lg max-w-xl mx-auto">
             A collection of songs that define our story. Hit play and spin the record.
           </p>
        </div>
        
        {/* Top Row: Vinyl */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 w-full max-w-5xl mx-auto">
          
          {/* Vinyl Record Side (Purely Visual, Always Spinning) */}
          <div className="relative flex items-center justify-center w-full max-w-[320px] sm:max-w-[450px] aspect-square group mt-4 lg:mt-0">
            {/* Realistic Vinyl Record - Spins Infinitely */}
            <div className="absolute w-[80%] h-[80%] rounded-full bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex items-center justify-center overflow-hidden border-[2px] sm:border-[4px] border-[#181818] animate-[spin_8s_linear_infinite]">
              {/* Grooves */}
              <div className="absolute inset-0 rounded-full opacity-60" style={{ background: 'repeating-radial-gradient(#0a0a0a 0px, #0a0a0a 2px, #181818 3px, #181818 4px)' }} />
              {/* Light Reflection */}
              <div className="absolute inset-0 rounded-full opacity-40 mix-blend-overlay" style={{ background: 'conic-gradient(from 45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 15%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0) 80%)' }} />
              
              {/* Center Label - Spotify Styling */}
              <div className="absolute w-[36%] h-[36%] rounded-full bg-[#1DB954] shadow-[0_0_15px_rgba(0,0,0,0.9)] flex flex-col items-center justify-center relative border-2 border-[#1DB954]">
                 <div className="absolute w-[92%] h-[92%] rounded-full border-[1px] border-[#169442] pointer-events-none" />
                 <div className="flex flex-col items-center justify-between h-[60%] w-full z-10 text-center px-1 text-black">
                   <span className="text-[0.4rem] sm:text-[0.55rem] tracking-[0.2em] font-bold uppercase opacity-90 mt-1">Groom & Bride</span>
                   <span className="font-bold text-[0.5rem] sm:text-xs opacity-90 -mt-1 tracking-wider uppercase">Mixtape</span>
                 </div>
                 <div className="absolute w-[12%] h-[12%] sm:w-[9%] sm:h-[9%] rounded-full bg-[#050505] shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] z-20" />
                 <div className="absolute w-[22%] h-[22%] sm:w-[16%] sm:h-[16%] rounded-full bg-transparent border-[1px] border-black/30 z-10" />
              </div>
            </div>
            
            {/* The Spinning Images */}
            <CircleImage
              ring={{ radiusX: isMobile ? 120 : 180, radiusY: isMobile ? 120 : 180, tilt: true, repeat: 2 }}
              cardWidth={isMobile ? 65 : 90}
              cardHeight={isMobile ? 65 : 90}
              rounded={8}
              style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
            />
          </div>
        </div>

        {/* ── Tracklist ── */}
        <div className="mt-16 sm:mt-24 w-full max-w-3xl">
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-6 text-[#0a2540]">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#5bafd6]/50" />
            <span className="text-[#1a6e9e] text-xs tracking-[0.3em] uppercase font-bold flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
              Our Wedding Playlist
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#5bafd6]/50" />
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-[2rem_1fr_auto] sm:grid-cols-[2rem_1fr_auto_auto] gap-x-4 px-4 pb-3 border-b border-[#5bafd6]/30 text-[#3a6f8f] text-xs tracking-widest uppercase mb-2">
            <span className="text-center">#</span>
            <span>Title</span>
            <span className="hidden sm:block">Moment</span>
            <span>
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/></svg>
            </span>
          </div>

          {/* Track rows */}
          <div className="flex flex-col">
            {weddingPlaylist.map((track, index) => {
              const colors = momentColors[track.moment] || momentColors['Ceremony'];
              const isHovered = hoveredId === track.id;
              return (
                <div
                  key={track.id}
                  onMouseEnter={() => setHoveredId(track.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`group grid grid-cols-[2rem_1fr_auto] sm:grid-cols-[2rem_1fr_auto_auto] gap-x-4 px-4 py-3 rounded-lg transition-all duration-200 cursor-default ${isHovered ? 'bg-[#5bafd6]/15' : ''}`}
                >
                  {/* Number / Note Icon */}
                  <div className="flex items-center justify-center">
                    {isHovered ? (
                      <span className="flex items-end gap-[2px] h-3">
                        {[1,2,3].map((n) => (
                          <span
                            key={n}
                            className={`w-[3px] rounded-full bg-[#1a6e9e] waveform-bar-${n}`}
                            style={{ height: '6px', display: 'block' }}
                          />
                        ))}
                      </span>
                    ) : (
                      <span className="text-[#3a6f8f] text-sm">{index + 1}</span>
                    )}
                  </div>

                  {/* Title + Artist */}
                  <div className="flex flex-col justify-center min-w-0">
                    <span className={`font-semibold text-sm sm:text-base truncate transition-colors ${isHovered ? 'text-[#1a6e9e]' : 'text-[#0a2540]'}`}>
                      {track.title}
                    </span>
                    <span className="text-[#3a6f8f] text-xs sm:text-sm truncate mt-0.5">
                      {track.artist}
                    </span>
                  </div>

                  {/* Moment badge (desktop) */}
                  <div className="hidden sm:flex items-center">
                    <span className={`text-[0.65rem] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                      {track.moment}
                    </span>
                  </div>

                  {/* Spotify icon link placeholder */}
                  <div className="flex items-center justify-end">
                    <svg viewBox="0 0 24 24" className={`w-4 h-4 transition-all duration-200 ${isHovered ? 'fill-[#1a6e9e]' : 'fill-[#5bafd6]/30'}`}>
                      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.73 14.45c-.2.31-.62.41-.93.2-2.53-1.55-5.72-1.9-9.47-1.04-.36.08-.72-.14-.8-.5-.08-.36.14-.72.5-.8 4.1-.94 7.62-.53 10.46 1.2.31.19.41.62.24.94zm1.27-2.78c-.25.39-.76.51-1.15.27-2.9-1.78-7.31-2.3-10.73-1.26-.44.13-.9-.11-1.03-.55-.13-.44.11-.9.55-1.03 3.9-1.18 8.77-.61 12.1 1.42.38.24.5.75.26 1.15zm.1-2.89C15.06 9.13 9.47 8.94 6.18 9.95c-.52.16-1.07-.14-1.23-.66-.16-.52.14-1.07.66-1.23 3.8-1.16 10.12-.93 14.1 1.58.46.27.6.86.33 1.32-.27.46-.85.6-1.31.34z"/>
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <p className="text-center text-[#3a6f8f] text-xs mt-8 italic mb-8">
            ♪ These songs were handpicked to celebrate every moment of our day ♪
          </p>

          <div className="flex justify-center">
            <a 
              href="mailto:wedding@example.com?subject=Song Request"
              className="group inline-flex items-center gap-2 rounded-full border border-[#1a6e9e]/30 bg-[#1a6e9e]/10 px-6 py-2.5 font-body text-xs tracking-widest text-[#1a6e9e] uppercase transition-all hover:bg-[#1a6e9e]/20"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M21 6h-7V3a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-4h7a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM5 4h7v16H5V4zm15 11h-6V8h6v7z"/><circle cx="16" cy="11.5" r="1.5"/></svg>
              Request a Song
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

