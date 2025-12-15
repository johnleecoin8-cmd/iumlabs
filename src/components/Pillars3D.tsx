import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

// ---------- Premium Metallic Pillar ----------

const MetallicPillar = ({ 
  position, 
  height,
  radius = 0.85,
  delay = 0 
}: { 
  position: [number, number, number]; 
  height: number;
  radius?: number;
  delay?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 0.6 + delay) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[radius, radius, height, 64]} />
      <meshStandardMaterial 
        color="#505050"
        metalness={1}
        roughness={0.08}
        envMapIntensity={1.8}
      />
      {/* Top cap with highlight */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[radius * 1.02, radius * 1.02, 0.15, 64]} />
        <meshStandardMaterial color="#707070" metalness={0.95} roughness={0.1} envMapIntensity={2} />
      </mesh>
      {/* Bottom cap */}
      <mesh position={[0, -height / 2, 0]}>
        <cylinderGeometry args={[radius * 1.02, radius * 1.02, 0.15, 64]} />
        <meshStandardMaterial color="#404040" metalness={0.95} roughness={0.12} />
      </mesh>
    </mesh>
  );
};

// ---------- Pillars Scene with Environment ----------

const PillarsScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0015;
    }
  });

  const pillars = useMemo(
    () => [
      { position: [-4, 0, 0] as [number, number, number], height: 6.5, radius: 1.1, delay: 0 },
      { position: [-1.5, 0, 1.5] as [number, number, number], height: 5, radius: 0.9, delay: 0.8 },
      { position: [1.2, 0, 0.5] as [number, number, number], height: 7.5, radius: 1.2, delay: 1.5 },
      { position: [4, 0, -0.5] as [number, number, number], height: 5.5, radius: 1.0, delay: 2.2 },
      { position: [-2.5, 0, -2] as [number, number, number], height: 4, radius: 0.7, delay: 0.4 },
      { position: [2.5, 0, -2.5] as [number, number, number], height: 4.5, radius: 0.75, delay: 1.8 },
    ],
    []
  );

  return (
    <Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.15}>
      <group ref={groupRef} position={[0, -1.5, 0]}>
        {pillars.map((pillar, i) => (
          <MetallicPillar key={i} {...pillar} />
        ))}
      </group>
    </Float>
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
          camera={{ position: [0, 4, 14], fov: 38 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
        >
          {/* HDRI Environment for realistic chrome reflections */}
          <Environment preset="city" />
          
          {/* Enhanced lighting system */}
          <ambientLight intensity={0.4} />
          <spotLight position={[15, 20, 15]} intensity={2} color="#ffffff" angle={0.25} penumbra={0.5} />
          <spotLight position={[-15, 15, 10]} intensity={1.2} color="#a0a0ff" angle={0.3} penumbra={0.3} />
          <pointLight position={[0, 10, 10]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-8, 5, 8]} intensity={0.8} color="#e0e0e0" />
          <pointLight position={[8, 5, 8]} intensity={0.8} color="#e0e0e0" />
          
          <PillarsScene />
        </Canvas>
      ) : (
        <PillarsFallback />
      )}
    </div>
  );
};

export default Pillars3D;
