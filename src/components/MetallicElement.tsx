import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function CryptoBridge({ scale = 1, speed = 0.15 }: { scale?: number; speed?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * speed) * 0.4;
      groupRef.current.rotation.x = Math.cos(t * speed * 0.5) * 0.1;
    }
  });

  // Primary brand color - crimson red
  const primaryColor = "#dc2626";
  const primaryColorLight = "#ef4444";
  const primaryColorDark = "#b91c1c";

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={groupRef} scale={scale}>
        {/* Main bridge arch */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[1.2, 0.1, 32, 100, Math.PI]} />
          <meshStandardMaterial
            color={primaryColor}
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={2}
          />
        </mesh>
        
        {/* Secondary arch - offset */}
        <mesh rotation={[0.3, 0.2, 0.1]} position={[0.1, -0.1, 0.2]}>
          <torusGeometry args={[0.9, 0.08, 32, 100, Math.PI]} />
          <meshStandardMaterial
            color={primaryColorLight}
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={2}
          />
        </mesh>
        
        {/* Third arch - opposite side */}
        <mesh rotation={[-0.2, -0.3, -0.1]} position={[-0.1, 0.1, -0.2]}>
          <torusGeometry args={[0.7, 0.06, 32, 100, Math.PI]} />
          <meshStandardMaterial
            color={primaryColorDark}
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={2}
          />
        </mesh>

        {/* Connecting elements */}
        <mesh position={[0.8, -0.3, 0]} rotation={[Math.PI / 2, 0, 0.3]}>
          <torusGeometry args={[0.12, 0.03, 16, 50]} />
          <meshStandardMaterial color={primaryColor} metalness={0.95} roughness={0.05} />
        </mesh>
        <mesh position={[-0.8, -0.3, 0]} rotation={[Math.PI / 2, 0, -0.3]}>
          <torusGeometry args={[0.12, 0.03, 16, 50]} />
          <meshStandardMaterial color={primaryColor} metalness={0.95} roughness={0.05} />
        </mesh>
      </group>
    </Float>
  );
}

function DoubleBridge({ scale = 1 }: { scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;
    }
  });

  const primaryColor = "#dc2626";
  const primaryColorLight = "#ef4444";

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef} scale={scale}>
        {/* First bridge */}
        <group position={[-0.4, 0, 0]} rotation={[0, 0.3, 0]}>
          <mesh>
            <torusGeometry args={[0.8, 0.08, 32, 100, Math.PI]} />
            <meshStandardMaterial color={primaryColor} metalness={0.9} roughness={0.1} envMapIntensity={2} />
          </mesh>
        </group>
        
        {/* Second bridge - interlocked */}
        <group position={[0.4, 0.2, 0.1]} rotation={[0.5, -0.3, 0.2]}>
          <mesh>
            <torusGeometry args={[0.6, 0.06, 32, 100, Math.PI]} />
            <meshStandardMaterial color={primaryColorLight} metalness={0.9} roughness={0.1} envMapIntensity={2} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function MiniBridge({ scale = 1, speed = 0.2 }: { scale?: number; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * speed;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.7}>
      <mesh ref={meshRef} scale={scale}>
        <torusGeometry args={[1, 0.12, 32, 100, Math.PI]} />
        <meshStandardMaterial
          color="#dc2626"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>
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
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#dc2626" />
          <pointLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
          
          {variant === 'bridge' && <CryptoBridge scale={1.3} />}
          {variant === 'double' && <DoubleBridge scale={1.2} />}
          {variant === 'mini' && <MiniBridge scale={1.4} />}
          
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MetallicElement;