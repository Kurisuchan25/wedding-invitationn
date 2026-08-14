import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import gsap from 'gsap';
import { couple } from '../../utils/weddingData';

function GoldRing() {
  const ringRef = useRef(null);

  useFrame((state, delta) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.y += delta * 0.26;
    ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
  });

  return (
    <group ref={ringRef} position={[0, 0, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.4, 0.16, 48, 180]} />
        <meshStandardMaterial
          color="#d2b15a"
          metalness={0.94}
          roughness={0.2}
          emissive="#30230a"
          emissiveIntensity={0.12}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.08, 0.08, 32, 140]} />
        <meshStandardMaterial color="#f7e5b8" metalness={0.85} roughness={0.22} />
      </mesh>
    </group>
  );
}

function Petal({ position, rotation, scale }) {
  const ref = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z += 0.002;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.45 + position[2]) * 0.05;
    ref.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.28 + position[1]) * 0.03;
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[0.18, 0.46]} />
      <meshStandardMaterial
        color="#f6e8d4"
        transparent
        opacity={0.88}
        side={2}
        roughness={0.55}
      />
    </mesh>
  );
}

function PetalCloud() {
  const petals = useMemo(
    () =>
      Array.from({ length: 12 }, () => ({
        position: [Math.random() * 4 - 2, Math.random() * 2.2 - 1.1, Math.random() * 3 - 1.5],
        rotation: [Math.random() * 0.5 - 0.2, Math.random() * 0.5 - 0.2, Math.random() * Math.PI],
        scale: [0.14 + Math.random() * 0.06, 0.38 + Math.random() * 0.1, 1],
      })),
    []
  );

  return <>{petals.map((petal, index) => <Petal key={index} {...petal} />)}</>;
}

/**
 * Loader — premium cinematic introduction with 3D ring, petals, and warm bloom.
 */
export default function Loader({ onComplete }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const progress = { value: 0 };
    let completionTimeout;
    const timeline = gsap.timeline({
      defaults: { duration: 3.2, ease: 'power2.out' },
      onComplete: () => {
        setPercent(100);
        completionTimeout = window.setTimeout(onComplete, 250);
      },
    });

    timeline.to(progress, {
      value: 100,
      onUpdate: () => setPercent(Math.min(100, Math.round(progress.value))),
    });

    return () => {
      timeline.kill();
      if (completionTimeout) window.clearTimeout(completionTimeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#081326] text-ivory">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_20%),radial-gradient(circle_at_80%_70%,_rgba(241,211,157,0.1),_transparent_18%),linear-gradient(180deg,rgba(10,16,38,1),rgba(5,8,16,0.96))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.06),_transparent_14%)]" />

      <Canvas className="absolute inset-0" dpr={[1, 1.8]} camera={{ position: [0, 0, 5.5], fov: 38 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.18} color="#fff7e0" />
        <directionalLight position={[2.4, 2.8, 2]} intensity={1.1} color="#fff7d8" />
        <directionalLight position={[-1.6, 1.4, -1.8]} intensity={0.35} color="#dfc89e" />
        <GoldRing />
        <PetalCloud />
        <Sparkles count={38} size={1.1} color="#f8e7c6" speed={0.22} noise={0.8} />
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.72} luminanceThreshold={0.18} luminanceSmoothing={0.85} mipmapBlur />
        </EffectComposer>
      </Canvas>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-[#d8bd78]/50 bg-white/10 shadow-[0_0_60px_rgba(216,189,120,0.12)] sm:h-44 sm:w-44">
          <span className="font-display text-4xl tracking-[0.3em] text-gold-gradient sm:text-5xl">
            {couple.monogram}
          </span>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="eyebrow text-gold">Preparing your invitation</p>
          <p className="font-display text-sm text-[#f7e8c5]">{percent}%</p>
        </div>
      </div>
    </div>
  );
}
