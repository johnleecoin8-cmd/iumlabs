import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment, Float } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.8}>
        <torusKnotGeometry args={[1, 0.35, 128, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={0.5}
          chromaticAberration={0.5}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#c0c0c0"
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

function InterlockingRings() {
  const group1Ref = useRef<THREE.Group>(null);
  const group2Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group1Ref.current) {
      group1Ref.current.rotation.x = Math.sin(t * 0.3) * 0.2;
      group1Ref.current.rotation.y = t * 0.1;
    }
    if (group2Ref.current) {
      group2Ref.current.rotation.x = Math.cos(t * 0.3) * 0.2 + Math.PI / 2;
      group2Ref.current.rotation.y = -t * 0.1;
    }
  });

  const ringMaterial = (
    <meshStandardMaterial
      color="#d4d4d4"
      metalness={0.95}
      roughness={0.05}
      envMapIntensity={1.5}
    />
  );

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group scale={2}>
        <group ref={group1Ref}>
          <mesh>
            <torusGeometry args={[1, 0.15, 32, 100]} />
            {ringMaterial}
          </mesh>
        </group>
        <group ref={group2Ref} position={[0.3, 0, 0]}>
          <mesh>
            <torusGeometry args={[0.8, 0.12, 32, 100]} />
            {ringMaterial}
          </mesh>
        </group>
      </group>
    </Float>
  );
}

const MetallicRings = () => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff6b6b" />
          <InterlockingRings />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MetallicRings;