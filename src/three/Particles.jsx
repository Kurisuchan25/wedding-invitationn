import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Petals — soft, flat gold-blush discs that drift upward and sway, like petals
 * caught in the breeze off Taal Lake. Uses a single instanced mesh for performance.
 */
function Petals({ count = 60, speedScale = 1 }) {
  const meshRef = useRef();

  const { dummy, seeds } = useMemo(() => {
    const dummy = new THREE.Object3D();
    const seeds = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 14,
      y: (Math.random() - 0.5) * 10 - 4,
      z: (Math.random() - 0.5) * 8 - 2,
      speed: 0.15 + Math.random() * 0.25,
      swaySpeed: 0.3 + Math.random() * 0.5,
      swayAmount: 0.4 + Math.random() * 0.6,
      rotSpeed: (Math.random() - 0.5) * 0.6,
      scale: 0.05 + Math.random() * 0.06,
      offset: Math.random() * Math.PI * 2,
    }));
    return { dummy, seeds };
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mesh = meshRef.current;
    if (!mesh) return;

    seeds.forEach((seed, i) => {
      const speed = seed.speed * speedScale;
      const swaySpeed = seed.swaySpeed * speedScale;
      const y = ((seed.y + t * speed) % 12) - 6;
      const x = seed.x + Math.sin(t * swaySpeed + seed.offset) * seed.swayAmount;
      const z = seed.z;

      dummy.position.set(x, y, z);
      dummy.rotation.set(t * seed.rotSpeed, t * seed.rotSpeed * 0.7, seed.offset);
      dummy.scale.setScalar(seed.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <circleGeometry args={[1, 6]} />
      <meshStandardMaterial
        color="#8FC9FF"
        emissive="#A2D2FF"
        emissiveIntensity={0.3}
        side={THREE.DoubleSide}
        transparent
        opacity={0.6}
        roughness={0.5}
      />
    </instancedMesh>
  );
}

/**
 * Particles — combines drifting petals with drei's Sparkles for a fine layer
 * of ambient gold dust. This is the atmospheric layer behind the rings.
 */
export default function Particles({ scrollRef }) {
  const scroll = scrollRef?.current ?? 0;
  return (
    <group>
      <Petals count={45} speedScale={1 + scroll * 0.7} />
      <Sparkles
        count={90}
        scale={[12, 8, 6]}
        size={2.4}
        speed={0.25 + scroll * 0.12}
        opacity={0.6 + scroll * 0.18}
        color="#8FC9FF"
        noise={1}
      />
      <Sparkles
        count={40}
        scale={[8, 5, 5]}
        size={1.2}
        speed={0.4 + scroll * 0.08}
        opacity={0.9}
        color="#A2D2FF"
      />
      <Sparkles
        count={30}
        scale={[6, 4, 4]}
        size={0.8}
        speed={0.5 + scroll * 0.06}
        opacity={0.8}
        color="#E5F0FA"
      />
    </group>
  );
}
