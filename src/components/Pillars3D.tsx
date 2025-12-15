import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Single Pillar Component
const Pillar = ({ position, height, delay }: { position: [number, number, number]; height: number; delay: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation with delay
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 0.8 + delay) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[0.8, 0.8, height, 32]} />
      <meshStandardMaterial
        color="#1a1a1a"
        metalness={0.95}
        roughness={0.05}
        envMapIntensity={2}
      />
      {/* Top cap */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.15, 32]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </mesh>
  );
};

// Multiple Pillars Scene
const PillarsScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation
      groupRef.current.rotation.y += 0.001;
    }
  });

  const pillars = useMemo(() => [
    { position: [-2.5, 0, 0] as [number, number, number], height: 4, delay: 0 },
    { position: [0, 0, 0] as [number, number, number], height: 5, delay: 1 },
    { position: [2.5, 0, 0] as [number, number, number], height: 3.5, delay: 2 },
    { position: [-1.2, 0, -1.5] as [number, number, number], height: 3, delay: 0.5 },
    { position: [1.2, 0, -1.5] as [number, number, number], height: 4.5, delay: 1.5 },
  ], []);

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {pillars.map((pillar, i) => (
        <Pillar key={i} {...pillar} />
      ))}
    </group>
  );
};

interface Pillars3DProps {
  className?: string;
}

const Pillars3D = ({ className = '' }: Pillars3DProps) => {
  return (
    <div className={`pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 2, 10], fov: 35 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#404040" />
        <pointLight position={[0, 5, 5]} intensity={0.8} color="#ffffff" />
        <PillarsScene />
      </Canvas>
    </div>
  );
};

export default Pillars3D;
