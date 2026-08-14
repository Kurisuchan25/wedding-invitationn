import { couple, weddingDateDisplay, venue } from '../../utils/weddingData';

export default function Footer() {
  const shareText = `Join us at our wedding! ${couple.groom} & ${couple.bride} — ${weddingDateDisplay.full}`;
  const shareUrl = window.location.href;

  const handleShareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <footer className="relative overflow-hidden bg-ink pt-24 pb-16 text-center sm:px-10">
      {/* Decorative top flourish */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C8E9F6]/30 to-transparent" />
      <div className="absolute top-0 inset-x-0 flex justify-center">
        <div className="w-16 h-[2px] bg-[#C8E9F6]" />
      </div>

      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 relative z-10">
        
        {/* Large Monogram */}
        <span className="font-script text-[6rem] sm:text-[8rem] leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#EAF6FD] to-[#A9D8EF] opacity-90 drop-shadow-[0_0_20px_rgba(200,233,246,0.2)]" style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.5))' }}>
          {couple.monogram}
        </span>
        
        <p className="font-display text-2xl italic text-[#C8E9F6] mb-4">
          We can&rsquo;t wait to celebrate with you.
        </p>

        {/* Share buttons */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button onClick={handleShareWhatsApp} className="flex items-center justify-center w-10 h-10 rounded-full border border-[#C8E9F6]/20 hover:border-[#C8E9F6]/60 hover:bg-[#C8E9F6]/10 transition-colors text-[#C8E9F6]" title="Share on WhatsApp">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          </button>
          <button onClick={handleCopyLink} className="flex items-center justify-center w-10 h-10 rounded-full border border-[#C8E9F6]/20 hover:border-[#C8E9F6]/60 hover:bg-[#C8E9F6]/10 transition-colors text-[#C8E9F6]" title="Copy Link">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
          </button>
        </div>
        
        <span className="hairline w-24 mb-2" />
        
        <p className="eyebrow text-[#A9D8EF] font-semibold">
          {weddingDateDisplay.full} · {venue.name}, {venue.area}
        </p>
        <p className="text-xs text-[#C8E9F6]/70 mt-1">{couple.hashtag}</p>
        
        <div className="mt-8 pt-6 border-t border-white/5 w-full flex justify-center items-center">
          <p className="text-[10px] text-[#C8E9F6]/40 flex items-center gap-1 uppercase tracking-widest">
            Made with <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current text-[#C8E9F6]/60"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </p>
        </div>
      </div>
    </footer>
  );
}
