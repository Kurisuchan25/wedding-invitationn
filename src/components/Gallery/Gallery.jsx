import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import { TextureLoader } from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryImages } from '../../utils/weddingData';

gsap.registerPlugin(ScrollTrigger);

const defaultItems = [
  {
    image: {
      src: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/612d1402-0ad9-4135-3bbc-a30a6a252b00/w=800',
    },
    alt: 'Sunset over water',
  },
  {
    image: {
      src: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/6d2ad64a-102d-4eab-0efe-31479e34b500/w=800',
    },
    alt: 'Forest path',
  },
  {
    image: {
      src: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/be854dd1-37aa-4fc7-f569-fdb948109300/w=800',
    },
    alt: 'Aerial lake view',
  },
  {
    image: {
      src: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/51984031-9176-484b-f5e0-4af9a8e9ed00/w=800',
    },
    alt: 'Golden sunset tree',
  },
  {
    image: {
      src: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/34ce1842-4b7a-4d52-0302-38582c341700/w=800',
    },
    alt: 'Mountain river',
  },
  {
    image: {
      src: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/88369c6d-00cc-4ac9-74ca-0f0965e06300/w=800',
    },
    alt: 'Warm horizon',
  },
  {
    image: {
      src: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/aeaa0756-9647-4f6c-d900-204bd25e4a00/w=800',
    },
    alt: 'Evening forest',
  },
  {
    image: {
      src: 'https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/316d1761-fd79-4ca9-b8d4-f2bb20521a00/w=800',
    },
    alt: 'Sunset silhouette',
  },
];

function GalleryCard({ texture, rotation, position, alt, onClick }) {
  return (
    <group position={position} rotation={rotation} onClick={onClick}>
      <mesh castShadow>
        <planeGeometry args={[3.3, 4.4]} />
        <meshStandardMaterial
          map={texture}
          toneMapped={false}
          metalness={0.05}
          roughness={0.35}
          emissiveIntensity={0.12}
          emissive={0x0a162d}
        />
        <Edges
          scale={1.002}
          threshold={15}
          color="#6da8ff"
          position={[0, 0, 0.01]}
        />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[3.3, 4.4]} />
        <meshStandardMaterial color="#050814" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function GalleryRing({ textures, rotationRef }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    rotationRef.current += delta * 0.05;
    groupRef.current.rotation.y += (rotationRef.current - groupRef.current.rotation.y) * 0.08;
  });

  const radius = 6;
  return (
    <group ref={groupRef}>
      {textures.map((texture, index) => {
        const angle = (index / textures.length) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        return (
          <GalleryCard
            key={String(index)}
            texture={texture}
            position={[x, 0.2, z]}
            rotation={[0, angle + Math.PI, 0]}
            alt={`Gallery image ${index + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              if (window.onGalleryImageClick) window.onGalleryImageClick(index);
            }}
          />
        );
      })}
    </group>
  );
}

function Gallery3D({ items }) {
  const urls = useMemo(() => items.map((item) => item.image?.src).filter(Boolean), [items]);
  const textures = useLoader(TextureLoader, urls);
  const rotationTarget = useRef(0);
  const dragStart = useRef(0);
  const dragging = useRef(false);

  const handlePointerDown = (event) => {
    dragging.current = true;
    dragStart.current = event.clientX;
  };

  const handlePointerMove = (event) => {
    if (!dragging.current) return;
    rotationTarget.current += (event.clientX - dragStart.current) * 0.003;
    dragStart.current = event.clientX;
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  return (
    <div
      className="relative overflow-hidden rounded-[2rem]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ touchAction: 'none' }}
    >
      <Canvas
        shadows
        gl={{ alpha: true }}
        dpr={[1, 2]}
        camera={{ position: [0, 1.8, 12], fov: 32 }}
        style={{ width: '100%', height: '720px', touchAction: 'none', background: 'transparent' }}
      >
        <ambientLight intensity={0.9} />        <directionalLight position={[4, 10, 5]} intensity={1.1} />
        <directionalLight position={[-6, 2, -3]} intensity={0.35} />
        <pointLight position={[0, -2, 5]} intensity={0.3} />

        <Suspense fallback={null}>
          <GalleryRing textures={textures} rotationRef={rotationTarget} />
        </Suspense>
      </Canvas>
      <div className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
        Drag to rotate
      </div>
    </div>
  );
}

export default function Gallery() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-fade]', {
        autoAlpha: 0,
        y: 40,
        scale: 0.98,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const items = useMemo(() => {
    const mapped = galleryImages.map((image) => ({ image: image.image, alt: image.alt }));
    const hasRealImage = mapped.some((item) => item.image?.src);
    if (hasRealImage) {
      return mapped;
    }
    return defaultItems.map((item, index) => ({ ...item, alt: galleryImages[index]?.alt || item.alt }));
  }, []);

  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    window.onGalleryImageClick = (index) => {
      setLightboxIndex(index);
    };
    return () => {
      delete window.onGalleryImageClick;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % items.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, items.length]);

  return (
    <section id="gallery" ref={rootRef} className="relative px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col items-center gap-4 text-center" data-fade>
          <span className="eyebrow text-gold">Gallery</span>
          <h2 className="font-display text-4xl text-ivory sm:text-5xl">Moments Together</h2>
          <span className="hairline w-20" />
        </div>
        <Gallery3D items={items} />
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-[slide-up-fade_0.3s_ease]">
          <button 
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <button 
            onClick={() => setLightboxIndex((i) => (i - 1 + items.length) % items.length)}
            className="absolute left-4 p-4 text-white/50 hover:text-white transition-colors hidden sm:block"
          >
            <svg viewBox="0 0 24 24" className="w-10 h-10 fill-none stroke-current" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="max-w-4xl max-h-[85vh] relative">
            <img 
              src={items[lightboxIndex].image.src} 
              alt={items[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              style={{ animation: 'fade-up 0.4s ease' }}
            />
            <p className="absolute -bottom-10 inset-x-0 text-center text-[#C8E9F6] font-body text-sm">
              {items[lightboxIndex].alt}
            </p>
          </div>

          <button 
            onClick={() => setLightboxIndex((i) => (i + 1) % items.length)}
            className="absolute right-4 p-4 text-white/50 hover:text-white transition-colors hidden sm:block"
          >
            <svg viewBox="0 0 24 24" className="w-10 h-10 fill-none stroke-current" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}