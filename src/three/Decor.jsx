import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const ORB_CONFIGS = [
  { radius: 2.8, speed: 0.18, height: 1.4, color: '#A2D2FF', size: 0.18, phase: 0 },
  { radius: 3.6, speed: 0.22, height: 0.9, color: '#8FC9FF', size: 0.14, phase: Math.PI * 0.6 },
  { radius: 4.2, speed: 0.14, height: 0.5, color: '#E5F0FA', size: 0.12, phase: Math.PI * 1.1 },
  { radius: 3.2, speed: 0.2, height: -0.8, color: '#BDE0FE', size: 0.16, phase: Math.PI * 1.8 },
];

function FloatingOrbs({ scrollRef }) {
  const orbRefs = useRef([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scroll = scrollRef?.current ?? 0;
    orbRefs.current.forEach((mesh, idx) => {
      if (!mesh) return;
      const cfg = ORB_CONFIGS[idx];
      const angle = t * cfg.speed + cfg.phase + scroll * 0.6;
      mesh.position.set(
        Math.cos(angle) * cfg.radius,
        cfg.height + Math.sin(t * 0.5 + cfg.phase) * 0.15 + scroll * 0.35,
        Math.sin(angle) * cfg.radius
      );
      mesh.rotation.y = t * 0.4 + scroll * 0.2;
    });
  });

  return (
    <group>
      {ORB_CONFIGS.map((cfg, index) => (
        <mesh
          key={index}
          ref={(el) => {
            orbRefs.current[index] = el;
          }}
        >
          <sphereGeometry args={[cfg.size, 64, 64]} />
          <meshPhysicalMaterial
            color={cfg.color}
            emissive={cfg.color}
            emissiveIntensity={0.2}
            roughness={0.15}
            metalness={0.1}
            transmission={0.9}
            thickness={1.2}
            ior={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

const FLOWER_CONFIGS = [
  { position: [-2.8, 0.8, -2.4], scale: 0.45, petalColor: '#E5F0FA', centerColor: '#8FC9FF' },
  { position: [3.2, 0.9, -1.6], scale: 0.55, petalColor: '#A2D2FF', centerColor: '#BDE0FE' },
  { position: [1.9, 0.6, 3.1], scale: 0.5, petalColor: '#BDE0FE', centerColor: '#E5F0FA' },
];

function Flower({ position, scale, petalColor, centerColor, scrollRef }) {
  const flowerRef = useRef();
  const petals = useMemo(
    () => Array.from({ length: 6 }, (_, i) => ({
      angle: (i / 6) * Math.PI * 2,
      offset: Math.sin((i / 6) * Math.PI * 2) * 0.08,
    })),
    []
  );

  useFrame((state) => {
    if (!flowerRef.current) return;
    const t = state.clock.getElapsedTime();
    const scroll = scrollRef?.current ?? 0;
    flowerRef.current.rotation.y = Math.sin(t * 0.5) * 0.25 + scroll * 0.22;
    flowerRef.current.rotation.x = Math.sin(t * 0.27) * 0.08 - scroll * 0.08;
    flowerRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.08 + scroll * 0.18;
    flowerRef.current.position.z = position[2] + scroll * 0.2;
  });

  return (
    <group ref={flowerRef} position={position} scale={[scale, scale, scale]}>
      {petals.map((petal, index) => (
        <mesh
          key={index}
          position={[Math.cos(petal.angle) * 0.28, 0, Math.sin(petal.angle) * 0.28]}
          rotation={[Math.PI / 2.4, 0, petal.angle + petal.offset]}
        >
          <planeGeometry args={[0.32, 0.92, 16, 16]} />
          <meshPhysicalMaterial
            color={petalColor}
            emissive={petalColor}
            emissiveIntensity={0.1}
            roughness={0.4}
            metalness={0.05}
            transmission={0.4}
            thickness={0.1}
            clearcoat={0.3}
            clearcoatRoughness={0.2}
            side={THREE.DoubleSide}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.16, 32, 32]} />
        <meshPhysicalMaterial
          color={centerColor}
          emissive={centerColor}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.3}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  );
}

function FloralClusters({ scrollRef }) {
  return (
    <group>
      {FLOWER_CONFIGS.map((cfg, index) => (
        <Flower key={index} {...cfg} scrollRef={scrollRef} />
      ))}
    </group>
  );
}

function GlowArcs() {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.06;
    groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.08) * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, -0.7, 0]}>
      {[
        { radius: 4.8, tube: 0.015, color: '#A2D2FF', opacity: 0.4, speed: 0.02 },
        { radius: 5.6, tube: 0.02, color: '#8FC9FF', opacity: 0.3, speed: 0.015 },
      ].map((arc, index) => (
        <mesh key={index} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[arc.radius, arc.tube, 32, 200]} />
          <meshPhysicalMaterial
            color={arc.color}
            emissive={arc.color}
            emissiveIntensity={1.5}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={arc.opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Decor({ scrollRef }) {
  return (
    <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.3}>
      <group>
        <GlowArcs />
        <FloatingOrbs scrollRef={scrollRef} />
        <FloralClusters scrollRef={scrollRef} />
      </group>
    </Float>
  );
}

