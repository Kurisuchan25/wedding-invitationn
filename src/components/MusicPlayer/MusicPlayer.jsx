import { useEffect, useRef, useState } from 'react';
import { musicTrack } from '../../utils/weddingData';

/**
 * MusicPlayer — a small floating disc, bottom-right, that toggles the
 * background track. Drop an mp3 at `musicTrack.src` (see utils/weddingData.js)
 * to activate it; until then it stays visible but simply won't have audio to play.
 */
export default function MusicPlayer({ visible }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleError = () => setReady(false);
    audio.addEventListener('error', handleError);
    return () => audio.removeEventListener('error', handleError);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || !ready) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => setReady(false));
    }
    setPlaying((p) => !p);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      <audio ref={audioRef} src={musicTrack.src} loop preload="none" />

      {playing && (
        <span className="hidden rounded-full bg-forest/60 px-3 py-1 font-display text-xs italic text-ivory-dim backdrop-blur-sm sm:inline-block">
          {musicTrack.title}
        </span>
      )}

      <button
        onClick={toggle}
        disabled={!ready}
        aria-label={playing ? 'Pause music' : 'Play music'}
        className={`relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-forest/60 backdrop-blur-sm transition-transform hover:scale-105 disabled:opacity-40 ${playing ? 'animate-[spin_8s_linear_infinite]' : ''
          }`}
      >
        <span className="absolute inset-1 rounded-full border border-gold-deep/40" />
        {playing ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-gold-light">
            <rect x="6" y="5" width="4" height="14" />
            <rect x="14" y="5" width="4" height="14" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-gold-light">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  );
}
