import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Ring, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

type PlanetType = "sun" | "saturn" | "earth" | "mars" | "nebula";

interface PlanetMeshProps {
  type: PlanetType;
}

const SunMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.y -= 0.001;
      coronaRef.current.rotation.z += 0.0005;
    }
  });

  return (
    <group>
      {/* Sun core */}
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#FDB813"
          emissive="#FF6B00"
          emissiveIntensity={0.8}
          distort={0.3}
          speed={2}
          roughness={0.2}
        />
      </Sphere>
      {/* Corona glow */}
      <Sphere ref={coronaRef} args={[1.8, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>
      {/* Outer glow */}
      <Sphere args={[2.2, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#FF8C00"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </Sphere>
      {/* Point light for glow effect */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#FFA500" distance={10} />
    </group>
  );
};

const SaturnMesh = () => {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.003;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.001;
    }
  });

  return (
    <group rotation={[0.4, 0, 0.2]}>
      {/* Saturn body */}
      <Sphere ref={planetRef} args={[1.2, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#E4A46B"
          roughness={0.8}
          metalness={0.1}
        />
      </Sphere>
      {/* Saturn rings */}
      <Ring
        ref={ringRef}
        args={[1.6, 2.8, 64]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <meshBasicMaterial
          color="#C4A484"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </Ring>
      {/* Inner ring */}
      <Ring
        args={[1.4, 1.55, 64]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <meshBasicMaterial
          color="#8B7355"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </Ring>
    </group>
  );
};

const EarthMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group>
      {/* Earth */}
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#1E90FF"
          roughness={0.7}
          metalness={0.1}
        />
      </Sphere>
      {/* Clouds layer */}
      <Sphere ref={cloudsRef} args={[1.52, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.25}
        />
      </Sphere>
      {/* Atmosphere glow */}
      <Sphere ref={glowRef} args={[1.7, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#00BFFF"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
};

const MarsMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Mars */}
      <Sphere ref={meshRef} args={[1.4, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#CD5C5C"
          roughness={0.9}
          metalness={0.1}
          distort={0.15}
          speed={1}
        />
      </Sphere>
      {/* Thin atmosphere */}
      <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#FF6347"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
};

const NebulaMesh = () => {
  const groupRef = useRef<THREE.Group>(null);
  const nebula1Ref = useRef<THREE.Mesh>(null);
  const nebula2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
    if (nebula1Ref.current) {
      nebula1Ref.current.rotation.z += 0.002;
    }
    if (nebula2Ref.current) {
      nebula2Ref.current.rotation.z -= 0.0015;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nebula cloud 1 */}
      <Sphere ref={nebula1Ref} args={[2, 32, 32]} position={[0.5, 0, 0]}>
        <MeshDistortMaterial
          color="#FF69B4"
          transparent
          opacity={0.3}
          distort={0.6}
          speed={1.5}
        />
      </Sphere>
      {/* Nebula cloud 2 */}
      <Sphere ref={nebula2Ref} args={[1.8, 32, 32]} position={[-0.5, 0.3, 0]}>
        <MeshDistortMaterial
          color="#00CED1"
          transparent
          opacity={0.25}
          distort={0.5}
          speed={2}
        />
      </Sphere>
      {/* Nebula cloud 3 */}
      <Sphere args={[1.5, 32, 32]} position={[0, -0.3, 0.5]}>
        <MeshDistortMaterial
          color="#9370DB"
          transparent
          opacity={0.2}
          distort={0.4}
          speed={1}
        />
      </Sphere>
      {/* Stars */}
      <Stars radius={5} depth={2} count={200} factor={2} saturation={0} fade speed={0.5} />
    </group>
  );
};

const PlanetMesh = ({ type }: PlanetMeshProps) => {
  switch (type) {
    case "sun":
      return <SunMesh />;
    case "saturn":
      return <SaturnMesh />;
    case "earth":
      return <EarthMesh />;
    case "mars":
      return <MarsMesh />;
    case "nebula":
      return <NebulaMesh />;
    default:
      return <EarthMesh />;
  }
};

interface Planet3DProps {
  type: PlanetType;
  className?: string;
}

const Planet3D = ({ type, className = "" }: Planet3DProps) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <PlanetMesh type={type} />
      </Canvas>
    </div>
  );
};

export default Planet3D;
