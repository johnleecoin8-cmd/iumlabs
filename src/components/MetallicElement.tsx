import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

// Bridge Arc Component - represents CryptoBridge brand
function BridgeArc({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0], speed = 0.1 }: { 
  position?: [number, number, number]; 
  scale?: number;
  rotation?: [number, number, number];
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} rotation={rotation}>
      <torusGeometry args={[1, 0.12, 32, 100, Math.PI]} />
      <meshStandardMaterial
        color="#e8e8e8"
        metalness={0.95}
        roughness={0.05}
        envMapIntensity={2}
      />
    </mesh>
  );
}

// Main Bridge Structure
function FloatingBridge() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.2;
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.08;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} scale={1.3}>
        {/* Main bridge arc */}
        <BridgeArc rotation={[0, 0, Math.PI / 8]} />
        
        {/* Secondary smaller arc */}
        <mesh position={[0.3, -0.2, 0.1]} rotation={[Math.PI / 6, 0, -Math.PI / 10]} scale={0.6}>
          <torusGeometry args={[1, 0.1, 32, 100, Math.PI]} />
          <meshStandardMaterial
            color="#d0d0d0"
            metalness={0.95}
            roughness={0.05}
            envMapIntensity={2}
          />
        </mesh>

        {/* Small connector ring */}
        <mesh position={[0.6, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.15}>
          <torusGeometry args={[1, 0.25, 16, 50]} />
          <meshStandardMaterial
            color="#c0c0c0"
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Double Bridge variant
function DoubleBridge() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        <BridgeArc position={[-0.4, 0, 0]} scale={0.7} rotation={[0, 0, Math.PI / 6]} speed={0.08} />
        <BridgeArc position={[0.4, 0.15, 0.2]} scale={0.5} rotation={[Math.PI / 4, 0, -Math.PI / 8]} speed={-0.1} />
      </group>
    </Float>
  );
}

// Mini Bridge for smaller placements
function MiniBridge() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={groupRef} scale={0.9}>
        <BridgeArc rotation={[0, 0, Math.PI / 5]} />
      </group>
    </Float>
  );
}

interface MetallicElementProps {
  variant?: 'bridge' | 'double' | 'mini';
  className?: string;
}

const MetallicElement = ({ variant = 'bridge', className = '' }: MetallicElementProps) => {
  return (
    <div className={`w-full h-full min-h-[200px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-10, -10, -5]} intensity={0.3} color="#ff6b6b" />
          
          {variant === 'bridge' && <FloatingBridge />}
          {variant === 'double' && <DoubleBridge />}
          {variant === 'mini' && <MiniBridge />}
          
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MetallicElement;