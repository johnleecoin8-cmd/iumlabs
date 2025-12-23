import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const LogoMesh = () => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Create the bridge shape (Ium Labs logo abstraction)
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main bridge arc - central piece */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusGeometry args={[1.2, 0.15, 32, 100, Math.PI]} />
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.3}
          metalness={0.8}
          emissive="#FFFFFF"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Left pillar */}
      <mesh position={[-1.2, -0.5, 0]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.3}
          metalness={0.8}
          emissive="#FFFFFF"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Right pillar */}
      <mesh position={[1.2, -0.5, 0]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.3}
          metalness={0.8}
          emissive="#FFFFFF"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef} position={[0, 0, -0.5]}>
        <torusGeometry args={[1.4, 0.3, 16, 50, Math.PI]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Outer glow sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Ambient particles */}
      {[...Array(20)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * 0.5) * 2,
            Math.cos(i * 0.7) * 1.5,
            Math.sin(i * 0.3) * 1
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
};

interface Logo3DProps {
  className?: string;
}

const Logo3D = ({ className = "" }: Logo3DProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, -5, 5]} intensity={0.5} />
        <pointLight position={[0, 0, 3]} intensity={0.5} color="#FFFFFF" />
        <LogoMesh />
      </Canvas>
    </div>
  );
};

export default Logo3D;
