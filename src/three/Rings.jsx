import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';

const METAL_PLATINUM = {
  color: '#e8f4f8',
  metalness: 0.98,
  roughness: 0.08,
  envMapIntensity: 2.5,
  emissive: '#EAF6FD',
  emissiveIntensity: 0.05,
};

const METAL_ROSE_GOLD = {
  color: '#f5e0d8',
  metalness: 0.96,
  roughness: 0.10,
  envMapIntensity: 2.3,
  emissive: '#FFE4E1',
  emissiveIntensity: 0.04,
};

const DIAMOND_MAT = {
  color: '#ffffff',
  emissive: '#B8E0F6',
  emissiveIntensity: 0.4,
  roughness: 0.02,
  metalness: 0.05,
  transparent: true,
  opacity: 0.95,
  envMapIntensity: 3.0,
};

/**
 * Rings — two interlocked wedding bands with enhanced realism,
 * featuring a brilliant diamond and subtle surface details.
 */
export default function Rings({ scrollRef }) {
  const groupRef = useRef();
  const ringA = useRef();
  const ringB = useRef();
  const diamondRef = useRef();
  const innerRingA = useRef();
  const innerRingB = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scroll = scrollRef?.current ?? 0;
    if (groupRef.current) {
      const targetY = t * 0.06 + state.pointer.x * 0.2 + scroll * 0.3;
      const targetX = -state.pointer.y * 0.12 - scroll * 0.08;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.03);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.03);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, scroll * 0.3, 0.04);
    }
    if (ringA.current) ringA.current.rotation.z = t * (0.12 + scroll * 0.2);
    if (ringB.current) ringB.current.rotation.z = -t * (0.10 + scroll * 0.15);
    if (diamondRef.current) {
      diamondRef.current.rotation.y = t * 0.6;
      diamondRef.current.position.y = 0.95 + Math.sin(t * 2) * 0.02;
    }
    if (innerRingA.current) innerRingA.current.rotation.z = t * 0.08;
    if (innerRingB.current) innerRingB.current.rotation.z = -t * 0.06;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, 0.1, 0]}>
        <Environment preset="studio" />
        
        {/* Ring A (Groom) - Platinum */}
        <group ref={ringA} position={[-0.42, 0, 0]} rotation={[Math.PI / 2.4, 0, 0]}>
          {/* Main ring body */}
          <mesh>
            <torusGeometry args={[1, 0.095, 64, 128]} />
            <meshStandardMaterial {...METAL_PLATINUM} />
          </mesh>
          {/* Inner detail ring */}
          <mesh ref={innerRingA}>
            <torusGeometry args={[0.92, 0.02, 32, 64]} />
            <meshStandardMaterial {...METAL_PLATINUM} metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Subtle surface shine */}
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[1.02, 0.005, 16, 32]} />
            <meshStandardMaterial 
              color="#ffffff" 
              metalness={1.0} 
              roughness={0.0} 
              emissive="#ffffff" 
              emissiveIntensity={0.08}
            />
          </mesh>
        </group>

        {/* Ring B (Bride) - Rose Gold */}
        <group ref={ringB} position={[0.42, 0, 0.1]} rotation={[Math.PI / 2.2, 0.3, 0]}>
          {/* Main ring body */}
          <mesh>
            <torusGeometry args={[1, 0.095, 64, 128]} />
            <meshStandardMaterial {...METAL_ROSE_GOLD} />
          </mesh>
          {/* Inner detail ring */}
          <mesh ref={innerRingB}>
            <torusGeometry args={[0.92, 0.02, 32, 64]} />
            <meshStandardMaterial {...METAL_ROSE_GOLD} metalness={0.93} roughness={0.18} />
          </mesh>
          {/* Subtle surface shine */}
          <mesh rotation={[0, 0, -Math.PI / 6]}>
            <torusGeometry args={[1.02, 0.005, 16, 32]} />
            <meshStandardMaterial 
              color="#fff5ee" 
              metalness={1.0} 
              roughness={0.0} 
              emissive="#fff5ee" 
              emissiveIntensity={0.06}
            />
          </mesh>
        </group>

        {/* Enhanced 3D Diamond Gem */}
        <group ref={diamondRef} position={[0.42, 0.95, 0.1]}>
          {/* Main diamond */}
          <mesh>
            <octahedronGeometry args={[0.22, 0]} />
            <meshStandardMaterial {...DIAMOND_MAT} />
          </mesh>
          {/* Inner glow */}
          <mesh scale={0.7}>
            <octahedronGeometry args={[0.22, 0]} />
            <meshStandardMaterial 
              color="#ffffff" 
              emissive="#ffffff" 
              emissiveIntensity={0.5} 
              transparent 
              opacity={0.15}
            />
          </mesh>
          {/* Sparkles */}
          <Sparkles count={10} scale={0.6} size={1.5} speed={0.4} color="#ffffff" opacity={0.5} />
          <Sparkles count={5} scale={0.4} size={1.0} speed={0.3} color="#EAF6FD" opacity={0.4} />
        </group>

        {/* Couple Monogram A · E */}
        <Text
          position={[0, -1.9, 0]}
          fontSize={0.46}
          color="#C8E9F6"
          letterSpacing={0.28}
          anchorX="center"
          anchorY="middle"
        >
          A · E
        </Text>
      </group>
    </Float>
  );
}
