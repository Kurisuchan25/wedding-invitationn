# Antonio & Elena — Wedding Invitation

A cinematic, single-page wedding invitation built with React, Vite, Tailwind CSS v4,
Three.js (via React Three Fiber + Drei), and GSAP.

## Stack
- **React 19 + Vite** — app shell
- **Tailwind CSS v4** — styling via `@theme` tokens in `src/index.css` (no config file needed)
- **Three.js / @react-three/fiber / @react-three/drei / @react-three/postprocessing** — the
  floating rings, petals, sparkles, and bloom glow behind the hero
- **GSAP + ScrollTrigger** — loader animation, envelope reveal, and scroll-triggered section reveals

## Getting started
```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Where to plug in real content

| What | Where |
|---|---|
| Couple names, date, venue, schedule, dress code, story timeline | `src/utils/weddingData.js` |
| Gallery & story photos | Currently tonal gradient placeholders. Drop real images in `src/assets/images/`, then swap the `<div className="bg-gradient-to-br ...">` in `src/components/Gallery/Gallery.jsx` and `src/components/Story/Story.jsx` for `<img src={...} />` |
| Background music | Drop an `.mp3` in `src/assets/music/` and update `musicTrack.src` in `weddingData.js` |
| Google Maps embed | `venue.mapsEmbedSrc` in `weddingData.js` — replace with your venue's embed URL |

## Folder structure
```
src/
├── components/
│   ├── Hero/          Envelope gate + full hero with countdown
│   ├── Story/          Scroll-animated timeline
│   ├── EventDetails/   Ceremony/reception, schedule, dress code, map
│   ├── Gallery/        Grid + lightbox
│   ├── MusicPlayer/     Floating play/pause control
│   ├── Navbar/          Scroll-aware nav (appears after envelope opens)
│   ├── Footer/
│   └── Loader/          Monogram seal loading screen
├── three/
│   ├── Scene.jsx        Canvas + camera + bloom/vignette postprocessing
│   ├── Rings.jsx        Interlocked gold rings (signature 3D element)
│   ├── Particles.jsx    Drifting petals + sparkle dust
│   └── Lights.jsx       Warm/cool light rig
├── hooks/
│   └── useCountdown.js
├── utils/
│   └── weddingData.js   All copy & content lives here
├── App.jsx
└── main.jsx
```

## Notes
- No RSVP or guest-submission form is included, per spec.
- `prefers-reduced-motion` is respected globally (see `src/index.css`).
- The 3D scene is `pointer-events-none`, so it never blocks scrolling or taps.
- Gallery/story images are placeholders (tonal gradients) since no photos were supplied —
  swap them for real photos before launch.
