import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const BridgeMesh = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const pillarHeight = 1.8;
  const pillarWidth = 0.4;
  const archRadius = 1.2;
  const bridgeWidth = 0.3;

  // Create arch curve
  const archCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-archRadius, 0, 0),
    new THREE.Vector3(-archRadius * 0.7, archRadius * 0.8, 0),
    new THREE.Vector3(0, archRadius, 0),
    new THREE.Vector3(archRadius * 0.7, archRadius * 0.8, 0),
    new THREE.Vector3(archRadius, 0, 0),
  ]);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} scale={1.2}>
        {/* Left Pillar */}
        <mesh position={[-archRadius, -pillarHeight / 2, 0]}>
          <boxGeometry args={[pillarWidth, pillarHeight, bridgeWidth]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1}
          />
        </mesh>

        {/* Right Pillar */}
        <mesh position={[archRadius, -pillarHeight / 2, 0]}>
          <boxGeometry args={[pillarWidth, pillarHeight, bridgeWidth]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1}
          />
        </mesh>

        {/* Arch */}
        <mesh>
          <tubeGeometry args={[archCurve, 50, 0.15, 16, false]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1}
          />
        </mesh>

        {/* Top Platform */}
        <mesh position={[0, archRadius + 0.15, 0]}>
          <boxGeometry args={[archRadius * 2 + pillarWidth, 0.15, bridgeWidth]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1}
          />
        </mesh>

        {/* Small decorative elements on top */}
        <mesh position={[-archRadius * 0.5, archRadius + 0.35, 0]}>
          <boxGeometry args={[0.1, 0.3, 0.1]} />
          <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[archRadius * 0.5, archRadius + 0.35, 0]}>
          <boxGeometry args={[0.1, 0.3, 0.1]} />
          <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
};

const Bridge3D = () => {
  return (
    <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-[#0A0A0A] via-[#0f0f1a] to-[#1a1a2e]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#4a9eff" />
        <pointLight position={[0, 2, 3]} intensity={0.5} color="#ffffff" />
        
        <BridgeMesh />
      </Canvas>
    </div>
  );
};

export default Bridge3D;
