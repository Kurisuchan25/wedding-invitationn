// Central content source for the invitation.
// Swap copy, dates, and image paths here without touching component logic.

export const couple = {
  bride: 'Bride',
  brideFull: 'Bride',
  groom: 'Groom',
  groomFull: 'Groom',
  monogram: 'G & B',
  hashtag: '#GroomAndBride2026',
};

// ISO string, local time — used by the countdown hook.
export const weddingDateISO = '2026-04-28T15:00:00+08:00';

export const weddingDateDisplay = {
  weekday: 'Tuesday',
  full: 'April 28, 2026',
  short: '04 · 28 · 26',
};

export const venue = {
  name: 'Taal Vista Hotel',
  area: 'Tagaytay, Cavite',
  ceremonyHall: 'The Pavilion, Taal Vista Hotel',
  receptionHall: 'Taal Ballroom, Taal Vista Hotel',
  mapsEmbedSrc:
    'https://www.google.com/maps?q=Taal+Vista+Hotel+Tagaytay&output=embed',
  mapsLink: 'https://maps.google.com/?q=Taal+Vista+Hotel+Tagaytay',
};

export const schedule = [
  { time: '2:00 PM', label: 'Guest Arrival', note: 'Doors open at The Pavilion' },
  { time: '3:00 PM', label: 'Ceremony', note: 'Exchange of vows overlooking Taal Lake' },
  { time: '4:30 PM', label: 'Cocktail Hour', note: 'Photos & refreshments at the terrace' },
  { time: '6:00 PM', label: 'Reception', note: 'Dinner, toasts, and first dance — Taal Ballroom' },
  { time: '11:00 PM', label: 'Send-off', note: 'A cinematic goodbye under the stars' },
];

export const dressCode = {
  title: 'Dusty Blue & Garden Formal',
  description:
    'We would love for you to dress in elegant tones of dusty slate, soft sky, and pale ice blue. Kindly avoid solid white, ivory, and pale blue-white — those are reserved for the bride.',
  palette: ['#EAF6FD', '#C8E9F6', '#C8E9F6', '#dce9f7', '#EFEFEF'],
};

// Timeline entries for the Our Story section.
export const storyTimeline = [
  {
    year: '2019',
    title: 'A Chance Meeting',
    description:
      'The couple met on a rainy afternoon in Manila, sharing an umbrella and a conversation that lasted long after the rain stopped.',
  },
  {
    year: '2021',
    title: 'Becoming Best Friends',
    description:
      'Weekend trips, long calls, and quiet Sunday mornings — what started as friendship slowly became something neither of them wanted to let go of.',
  },
  {
    year: '2023',
    title: 'The Proposal',
    description:
      'On a misty evening overlooking Taal Lake, the proposal was made with the same quiet promise of forever that has grounded them ever since.',
  },
  {
    year: '2026',
    title: 'The Wedding',
    description:
      'Surrounded by family, friends, and the same Tagaytay mist that witnessed their proposal, the couple begin their next chapter.',
  },
];

// Gallery placeholders — replace `src` with real photo paths in /src/assets/images.
// Kept as tonal gradients (using theme color tokens) for now so the layout can be
// reviewed before real photos are dropped in — retheming index.css restyles these too.
export const galleryImages = [
  {
    id: 1,
    alt: 'Groom & Bride, engagement session',
    image: {
      src: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/612d1402-0ad9-4135-3bbc-a30a6a252b00/w=800',
    },
    tone: 'from-gold to-blush',
  },
  {
    id: 2,
    alt: 'Golden hour at the lake',
    image: {
      src: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/6d2ad64a-102d-4eab-0efe-31479e34b500/w=800',
    },
    tone: 'from-gold-deep to-forest',
  },
  {
    id: 3,
    alt: 'Laughing together',
    image: {
      src: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/be854dd1-37aa-4fc7-f569-fdb948109300/w=800',
    },
    tone: 'from-blush to-forest',
  },
  {
    id: 4,
    alt: 'Hands, ring detail',
    image: {
      src: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/51984031-9176-484b-f5e0-4af9a8e9ed00/w=800',
    },
    tone: 'from-gold-light to-blush',
  },
  {
    id: 5,
    alt: 'Walking through the garden',
    image: {
      src: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/34ce1842-4b7a-4d52-0302-38582c341700/w=800',
    },
    tone: 'from-forest-light to-blush',
  },
  {
    id: 6,
    alt: 'Candid, mid-laugh',
    image: {
      src: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/88369c6d-00cc-4ac9-74ca-0f0965e06300/w=800',
    },
    tone: 'from-gold to-forest',
  },
  {
    id: 7,
    alt: 'Misty lake, silhouettes',
    image: {
      src: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/aeaa0756-9647-4f6c-d900-204bd25e4a00/w=800',
    },
    tone: 'from-blush to-forest-light',
  },
  {
    id: 8,
    alt: 'Close, foreheads touching',
    image: {
      src: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/316d1761-fd79-4ca9-b8d4-f2bb20521a00/w=800',
    },
    tone: 'from-gold-deep to-blush',
  },
];

export const musicTrack = {
  title: 'A Thousand Years',
  artist: 'Christina Perri',
  src: '/src/assets/music/wedding-theme.mp3', // drop your mp3 here
};

export const spotifyPlaylistUrl = "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator";

export const weddingPlaylist = [
  { id: 1, title: 'A Thousand Years',        artist: 'Christina Perri',  moment: 'First Dance'   },
  { id: 2, title: 'Perfect',                 artist: 'Ed Sheeran',       moment: 'Ceremony'      },
  { id: 3, title: "Can't Help Falling in Love", artist: 'Elvis Presley', moment: 'Reception'     },
  { id: 4, title: 'All of Me',               artist: 'John Legend',      moment: 'Dinner'        },
  { id: 5, title: 'Thinking Out Loud',       artist: 'Ed Sheeran',       moment: 'Cocktail Hour' },
  { id: 6, title: 'At Last',                 artist: 'Etta James',       moment: 'Send-off'      },
];
