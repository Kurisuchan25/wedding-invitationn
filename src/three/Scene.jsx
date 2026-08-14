import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, DepthOfField, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import Lights from './Lights';
import Rings from './Rings';
import Particles from './Particles';
import Decor from './Decor';

/**
 * Scene — fixed, full-viewport Three.js canvas that sits behind the Hero & content.
 * Pointer-events are disabled so it never blocks scrolling or taps.
 */
function useScrollProgress() {
  const scrollRef = useRef(0);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      const maxScroll = Math.max(1, docHeight - window.innerHeight);
      scrollRef.current = Math.min(1, Math.max(0, scrollTop / maxScroll));
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  return scrollRef;
}

function CameraFly({ scrollRef }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const original = useMemo(() => camera.position.clone(), [camera.position]);

  useFrame((state) => {
    const scroll = scrollRef.current;
    const t = state.clock.getElapsedTime();
    const z = original.z - scroll * 3.2;
    const y = original.y + Math.sin(t * 0.14) * 0.12 - scroll * 0.6;
    const x = Math.sin(scroll * Math.PI * 0.55 + t * 0.05) * 0.9;
    target.set(x, y, z);
    camera.position.lerp(target, 0.03);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function SceneMotion({ children, scrollRef }) {
  const motionRef = useRef();
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const targetScale = useMemo(() => new THREE.Vector3(1, 1, 1), []);

  useFrame((state) => {
    if (!motionRef.current) return;
    const scroll = scrollRef.current;
    const t = state.clock.getElapsedTime();
    targetPosition.set(
      Math.sin(t * 0.08) * 0.18 + scroll * 0.25,
      Math.sin(t * 0.07) * 0.12 - scroll * 0.45,
      Math.cos(t * 0.08) * 0.12
    );
    motionRef.current.position.lerp(targetPosition, 0.05);
    targetScale.set(0.96 + scroll * 0.1, 0.96 + scroll * 0.1, 0.96 + scroll * 0.1);
    motionRef.current.scale.lerp(targetScale, 0.04);
  });

  return <group ref={motionRef}>{children}</group>;
}

export default function Scene({ className = 'fixed inset-0' }) {
  const scrollRef = useScrollProgress();

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6.5], fov: 42 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
      >
        <color attach="background" args={['#0d2b45']} />
        <fog attach="fog" args={['#0d2b45', 6, 16]} />

        <Suspense fallback={null}>
          <CameraFly scrollRef={scrollRef} />
          <SceneMotion scrollRef={scrollRef}>
            <Lights />
            <Decor scrollRef={scrollRef} />
            <Rings scrollRef={scrollRef} />
            <Particles scrollRef={scrollRef} />
          </SceneMotion>
          <EffectComposer multisampling={4}>
            <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
            <Bloom
              intensity={0.6}
              luminanceThreshold={0.4}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <Noise opacity={0.035} />
            <Vignette eskil={false} offset={0.3} darkness={0.6} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
