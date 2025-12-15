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
        color="#4a4a4a"
        metalness={0.9}
        roughness={0.1}
        envMapIntensity={2}
      />
      {/* Top cap */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.2, 32]} />
        <meshStandardMaterial
          color="#5a5a5a"
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>
      {/* Bottom cap */}
      <mesh position={[0, -height / 2, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.2, 32]} />
        <meshStandardMaterial
          color="#5a5a5a"
          metalness={0.85}
          roughness={0.15}
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
      groupRef.current.rotation.y += 0.002;
    }
  });

  const pillars = useMemo(() => [
    { position: [-3, 0, 1] as [number, number, number], height: 5, delay: 0 },
    { position: [0, 0, 0] as [number, number, number], height: 6.5, delay: 1 },
    { position: [3, 0, 1] as [number, number, number], height: 4.5, delay: 2 },
    { position: [-1.5, 0, -2] as [number, number, number], height: 4, delay: 0.5 },
    { position: [1.5, 0, -2] as [number, number, number], height: 5.5, delay: 1.5 },
  ], []);

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
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
        camera={{ position: [0, 3, 12], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        {/* Stronger lighting for visibility */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 15, 10]} intensity={2} />
        <directionalLight position={[-10, 10, -10]} intensity={1} color="#666666" />
        <pointLight position={[0, 8, 8]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, 3, 5]} intensity={0.8} color="#888888" />
        <pointLight position={[5, 3, 5]} intensity={0.8} color="#888888" />
        <PillarsScene />
      </Canvas>
    </div>
  );
};

export default Pillars3D;
