import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function SmallRing({ position = [0, 0, 0], scale = 1, speed = 0.1 }: { 
  position?: [number, number, number]; 
  scale?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 1.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.2, 32, 100]} />
      <meshStandardMaterial
        color="#d4d4d4"
        metalness={0.95}
        roughness={0.05}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

function FloatingBridge() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.3;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} scale={1.5}>
        {/* Main bridge arc */}
        <mesh rotation={[0, 0, Math.PI / 6]}>
          <torusGeometry args={[1.2, 0.08, 32, 100, Math.PI]} />
          <meshStandardMaterial
            color="#e8e8e8"
            metalness={0.95}
            roughness={0.05}
            envMapIntensity={2}
          />
        </mesh>
        {/* Secondary arc */}
        <mesh rotation={[Math.PI / 4, 0, -Math.PI / 6]} position={[0.2, 0, 0.1]}>
          <torusGeometry args={[0.8, 0.06, 32, 100, Math.PI]} />
          <meshStandardMaterial
            color="#d0d0d0"
            metalness={0.95}
            roughness={0.05}
            envMapIntensity={2}
          />
        </mesh>
        {/* Small connecting ring */}
        <mesh position={[0.5, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.03, 16, 50]} />
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

interface MetallicElementProps {
  variant?: 'ring' | 'bridge' | 'double';
  className?: string;
}

const MetallicElement = ({ variant = 'ring', className = '' }: MetallicElementProps) => {
  return (
    <div className={`w-full h-full min-h-[200px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-10, -10, -5]} intensity={0.3} color="#ff6b6b" />
          
          {variant === 'ring' && (
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
              <SmallRing scale={1.2} speed={0.15} />
            </Float>
          )}
          
          {variant === 'bridge' && <FloatingBridge />}
          
          {variant === 'double' && (
            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
              <group>
                <SmallRing position={[-0.5, 0, 0]} scale={0.8} speed={0.1} />
                <SmallRing position={[0.5, 0.2, 0.2]} scale={0.6} speed={-0.12} />
              </group>
            </Float>
          )}
          
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MetallicElement;