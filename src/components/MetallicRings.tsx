import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function CryptoBridgeHero() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.5;
      groupRef.current.rotation.x = Math.cos(t * 0.1) * 0.15;
      groupRef.current.rotation.z = Math.sin(t * 0.08) * 0.1;
    }
  });

  // Primary brand color - crimson red
  const primaryColor = "#dc2626";
  const primaryColorLight = "#ef4444";
  const primaryColorDark = "#b91c1c";
  const accentColor = "#f87171";

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={groupRef} scale={2.2}>
        {/* Main large bridge arch */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[1.3, 0.12, 48, 128, Math.PI]} />
          <meshStandardMaterial
            color={primaryColor}
            metalness={0.95}
            roughness={0.05}
            envMapIntensity={2.5}
          />
        </mesh>
        
        {/* Secondary arch - tilted */}
        <mesh rotation={[0.4, 0.3, 0.15]} position={[0.15, -0.05, 0.25]}>
          <torusGeometry args={[1.0, 0.1, 48, 128, Math.PI]} />
          <meshStandardMaterial
            color={primaryColorLight}
            metalness={0.95}
            roughness={0.05}
            envMapIntensity={2.5}
          />
        </mesh>
        
        {/* Third arch - opposite tilt */}
        <mesh rotation={[-0.3, -0.4, -0.1]} position={[-0.15, 0.05, -0.25]}>
          <torusGeometry args={[0.8, 0.08, 48, 128, Math.PI]} />
          <meshStandardMaterial
            color={primaryColorDark}
            metalness={0.95}
            roughness={0.05}
            envMapIntensity={2.5}
          />
        </mesh>

        {/* Small accent arch */}
        <mesh rotation={[0.6, 0.1, 0.3]} position={[0.3, 0.2, 0.1]}>
          <torusGeometry args={[0.5, 0.05, 32, 64, Math.PI]} />
          <meshStandardMaterial
            color={accentColor}
            metalness={0.95}
            roughness={0.05}
            envMapIntensity={2}
          />
        </mesh>

        {/* Connecting ring elements */}
        <mesh position={[0.9, -0.4, 0]} rotation={[Math.PI / 2, 0, 0.4]}>
          <torusGeometry args={[0.15, 0.04, 24, 64]} />
          <meshStandardMaterial color={primaryColor} metalness={0.95} roughness={0.05} />
        </mesh>
        <mesh position={[-0.9, -0.4, 0]} rotation={[Math.PI / 2, 0, -0.4]}>
          <torusGeometry args={[0.15, 0.04, 24, 64]} />
          <meshStandardMaterial color={primaryColor} metalness={0.95} roughness={0.05} />
        </mesh>
        <mesh position={[0, 0.5, 0.3]} rotation={[0.5, 0, 0]}>
          <torusGeometry args={[0.1, 0.03, 16, 32]} />
          <meshStandardMaterial color={primaryColorLight} metalness={0.95} roughness={0.05} />
        </mesh>
      </group>
    </Float>
  );
}

const MetallicRings = () => {
  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-10, -10, -5]} intensity={0.6} color="#dc2626" />
          <pointLight position={[5, 5, 5]} intensity={0.4} color="#ffffff" />
          <CryptoBridgeHero />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MetallicRings;