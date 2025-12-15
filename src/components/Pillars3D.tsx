import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

// ---------- WebGL version (react-three-fiber) ----------

const Pillar = ({ position, height, delay }: { position: [number, number, number]; height: number; delay: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 0.8 + delay) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[0.85, 0.85, height, 48]} />
      <meshStandardMaterial color="#7a7a7a" metalness={0.9} roughness={0.12} envMapIntensity={2.5} />
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.87, 0.87, 0.24, 48]} />
        <meshStandardMaterial color="#9a9a9a" metalness={0.85} roughness={0.18} />
      </mesh>
      <mesh position={[0, -height / 2, 0]}>
        <cylinderGeometry args={[0.87, 0.87, 0.24, 48]} />
        <meshStandardMaterial color="#5f5f5f" metalness={0.85} roughness={0.18} />
      </mesh>
    </mesh>
  );
};

const PillarsScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.002;
  });

  const pillars = useMemo(
    () => [
      { position: [-3, 0, 1] as [number, number, number], height: 5, delay: 0 },
      { position: [0, 0, 0] as [number, number, number], height: 6.5, delay: 1 },
      { position: [3, 0, 1] as [number, number, number], height: 4.5, delay: 2 },
      { position: [-1.5, 0, -2] as [number, number, number], height: 4, delay: 0.5 },
      { position: [1.5, 0, -2] as [number, number, number], height: 5.5, delay: 1.5 },
    ],
    []
  );

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {pillars.map((pillar, i) => (
        <Pillar key={i} {...pillar} />
      ))}
    </group>
  );
};

// ---------- DOM fallback (when WebGL is unavailable) ----------

const PillarsFallback = () => {
  const items = useMemo(
    () => [
      { left: '18%', bottom: '12%', h: 220, delay: 0 },
      { left: '42%', bottom: '10%', h: 280, delay: 0.15 },
      { left: '66%', bottom: '14%', h: 200, delay: 0.3 },
      { left: '33%', bottom: '6%', h: 170, delay: 0.45 },
      { left: '56%', bottom: '6%', h: 240, delay: 0.6 },
    ],
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {items.map((p, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          style={{ left: p.left, bottom: p.bottom }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        >
          <div
            style={{ height: p.h, width: 90 }}
            className="rounded-[999px] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
          >
            <div
              className="h-full w-full rounded-[999px]"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.14) 38%, rgba(255,255,255,0.06) 60%, rgba(0,0,0,0.35) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

interface Pillars3DProps {
  className?: string;
}

const Pillars3D = ({ className = '' }: Pillars3DProps) => {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(!!gl);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  return (
    <div className={`pointer-events-none ${className}`} style={{ width: '100%', height: '100%' }}>
      {hasWebGL ? (
        <Canvas
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
          camera={{ position: [0, 3, 12], fov: 40 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[10, 15, 10]} intensity={2.2} />
          <directionalLight position={[-10, 10, -10]} intensity={1.1} color="#9aa1aa" />
          <pointLight position={[0, 8, 8]} intensity={1.6} color="#ffffff" />
          <pointLight position={[-5, 3, 5]} intensity={0.9} color="#c9c9c9" />
          <pointLight position={[5, 3, 5]} intensity={0.9} color="#c9c9c9" />
          <PillarsScene />
        </Canvas>
      ) : (
        <PillarsFallback />
      )}
    </div>
  );
};

export default Pillars3D;
