import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function RSVP() {
  const rootRef = useRef(null);
  const [formState, setFormState] = useState('idle'); // idle, submitting, success
  const [formData, setFormData] = useState({
    name: '',
    attending: 'yes',
    guests: '1',
    dietary: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(rootRef.current, {
        autoAlpha: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 85%',
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      
      // Fire confetti
      const confettiColors = ['#EAF6FD', '#C8E9F6', '#A9D8EF', '#f8fdff'];
      const container = rootRef.current;
      
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'absolute w-2 h-2 rounded-sm';
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.left = `${50 + (Math.random() * 40 - 20)}%`;
        confetti.style.top = '50%';
        confetti.style.zIndex = '50';
        
        // Randomize animation duration and delay
        const duration = 0.8 + Math.random() * 0.5;
        const delay = Math.random() * 0.2;
        
        confetti.style.animation = `confetti ${duration}s ease-out ${delay}s forwards`;
        
        // Random horizontal drift
        const drift = (Math.random() - 0.5) * 200;
        gsap.to(confetti, { x: drift, duration: duration, ease: 'power1.out' });
        
        container.appendChild(confetti);
        
        // Cleanup
        setTimeout(() => {
          if (container.contains(confetti)) {
            container.removeChild(confetti);
          }
        }, (duration + delay) * 1000 + 100);
      }
    }, 1500);
  };

  return (
    <section id="rsvp" ref={rootRef} className="relative py-24 sm:py-32 px-6 overflow-hidden bg-ink">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-light/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">Will You Join Us?</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-ivory">RSVP</h2>
          <div className="mt-4 flex justify-center items-center gap-3">
            <span className="h-px w-12 bg-gold/40" />
            <span className="font-body text-[10px] tracking-widest text-gold-light uppercase">Kindly reply by March 28</span>
            <span className="h-px w-12 bg-gold/40" />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-forest/20 backdrop-blur-md shadow-2xl p-6 sm:p-10">
          <div className="pointer-events-none absolute inset-2 rounded-xl border border-gold/10" />
          
          {formState === 'success' ? (
            <div className="relative z-10 flex flex-col items-center justify-center py-12 text-center" style={{ animation: 'fade-up 0.5s ease-out' }}>
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-6 border border-gold/40 text-gold">
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="font-display text-3xl text-ivory mb-2">Thank You!</h3>
              <p className="text-gold-light font-body text-sm max-w-sm mx-auto">
                {formData.attending === 'yes' 
                  ? "We're overjoyed that you'll be joining us. We can't wait to celebrate together!" 
                  : "We're so sorry you won't be able to make it. You will be missed!"}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label htmlFor="name" className="block font-body text-xs tracking-widest text-gold-light uppercase">
                  Full Name(s)
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-ink/50 border border-gold/30 rounded-none px-4 py-3 text-ivory placeholder-ivory-dim/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  placeholder="e.g. Jane Doe & John Smith"
                />
              </div>

              {/* Attendance Toggle */}
              <div className="space-y-2">
                <label className="block font-body text-xs tracking-widest text-gold-light uppercase">
                  Will you attend?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`cursor-pointer flex items-center justify-center py-3 border ${formData.attending === 'yes' ? 'bg-gold/20 border-gold text-ivory' : 'bg-ink/50 border-gold/30 text-ivory-dim'} transition-colors`}>
                    <input 
                      type="radio" 
                      name="attending" 
                      value="yes" 
                      checked={formData.attending === 'yes'}
                      onChange={() => setFormData({...formData, attending: 'yes'})}
                      className="sr-only" 
                    />
                    <span className="font-body text-sm tracking-wider uppercase">Joyfully Accept</span>
                  </label>
                  <label className={`cursor-pointer flex items-center justify-center py-3 border ${formData.attending === 'no' ? 'bg-gold/20 border-gold text-ivory' : 'bg-ink/50 border-gold/30 text-ivory-dim'} transition-colors`}>
                    <input 
                      type="radio" 
                      name="attending" 
                      value="no" 
                      checked={formData.attending === 'no'}
                      onChange={() => setFormData({...formData, attending: 'no'})}
                      className="sr-only" 
                    />
                    <span className="font-body text-sm tracking-wider uppercase">Regretfully Decline</span>
                  </label>
                </div>
              </div>

              {/* Number of Guests (Only if attending) */}
              {formData.attending === 'yes' && (
                <div className="space-y-2" style={{ animation: 'fade-up 0.3s ease-out' }}>
                  <label htmlFor="guests" className="block font-body text-xs tracking-widest text-gold-light uppercase">
                    Total Number of Guests
                  </label>
                  <select
                    id="guests"
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    className="w-full bg-ink/50 border border-gold/30 rounded-none px-4 py-3 text-ivory focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23C8E9F6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em 1.5em' }}
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num} className="bg-ink text-ivory">{num}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Dietary Restrictions */}
              {formData.attending === 'yes' && (
                <div className="space-y-2" style={{ animation: 'fade-up 0.4s ease-out' }}>
                  <label htmlFor="dietary" className="block font-body text-xs tracking-widest text-gold-light uppercase">
                    Dietary Requirements & Message
                  </label>
                  <textarea
                    id="dietary"
                    rows="3"
                    value={formData.dietary}
                    onChange={(e) => setFormData({...formData, dietary: e.target.value})}
                    className="w-full bg-ink/50 border border-gold/30 rounded-none px-4 py-3 text-ivory placeholder-ivory-dim/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-none"
                    placeholder="Any allergies, or just a note for the couple..."
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full relative overflow-hidden group bg-gold text-ink font-body font-semibold text-sm tracking-widest uppercase py-4 mt-4 transition-all duration-300 disabled:opacity-70 disabled:cursor-wait"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {formState === 'submitting' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-ink" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send RSVP"
                  )}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
