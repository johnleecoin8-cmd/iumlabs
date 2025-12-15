import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const BridgeMesh = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  // Create suspension cable curve
  const cableCurve = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 50; i++) {
      const t = i / 50;
      const x = (t - 0.5) * 10;
      // Catenary curve for suspension cable
      const y = 0.15 * Math.cosh(x * 0.5) - 0.5;
      points.push(new THREE.Vector3(x, y + 1.5, 0));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  // Vertical cables positions
  const verticalCables = useMemo(() => {
    const cables = [];
    for (let i = -4; i <= 4; i++) {
      if (i !== 0) {
        const x = i * 0.6;
        const topY = 0.15 * Math.cosh(x * 0.5) - 0.5 + 1.5;
        cables.push({ x, topY, bottomY: -0.5 });
      }
    }
    return cables;
  }, []);

  // Particles for flowing light effect
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
    
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 100; i++) {
        positions[i * 3] += 0.02;
        if (positions[i * 3] > 6) {
          positions[i * 3] = -6;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Left Tower */}
      <mesh position={[-2.5, 0.5, 0]}>
        <boxGeometry args={[0.15, 3, 0.15]} />
        <meshBasicMaterial color="#0EA5E9" wireframe transparent opacity={0.8} />
      </mesh>
      <mesh position={[-2.5, 2.2, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshBasicMaterial color="#06B6D4" wireframe transparent opacity={0.9} />
      </mesh>
      
      {/* Right Tower */}
      <mesh position={[2.5, 0.5, 0]}>
        <boxGeometry args={[0.15, 3, 0.15]} />
        <meshBasicMaterial color="#0EA5E9" wireframe transparent opacity={0.8} />
      </mesh>
      <mesh position={[2.5, 2.2, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshBasicMaterial color="#06B6D4" wireframe transparent opacity={0.9} />
      </mesh>
      
      {/* Main Suspension Cable */}
      <mesh>
        <tubeGeometry args={[cableCurve, 64, 0.03, 8, false]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.9} />
      </mesh>
      
      {/* Secondary Cable (lower) */}
      <mesh position={[0, -1.5, 0]}>
        <tubeGeometry args={[
          new THREE.CatmullRomCurve3([
            new THREE.Vector3(-5, 0, 0),
            new THREE.Vector3(-2.5, 0.1, 0),
            new THREE.Vector3(0, 0.15, 0),
            new THREE.Vector3(2.5, 0.1, 0),
            new THREE.Vector3(5, 0, 0),
          ]),
          32, 0.02, 8, false
        ]} />
        <meshBasicMaterial color="#0EA5E9" transparent opacity={0.6} />
      </mesh>

      {/* Vertical Suspension Cables */}
      {verticalCables.map((cable, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([cable.x, cable.topY, 0, cable.x, cable.bottomY, 0])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#0EA5E9" transparent opacity={0.5} />
        </line>
      ))}
      
      {/* Bridge Deck */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[10, 0.08, 0.8]} />
        <meshBasicMaterial color="#0EA5E9" wireframe transparent opacity={0.4} />
      </mesh>
      
      {/* Deck Rails */}
      <mesh position={[0, -0.3, 0.35]}>
        <boxGeometry args={[10, 0.05, 0.02]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, -0.3, -0.35]}>
        <boxGeometry args={[10, 0.05, 0.02]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.5} />
      </mesh>

      {/* Flowing Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#06B6D4"
          size={0.05}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Glow Lights */}
      <pointLight position={[-2.5, 2, 0]} color="#0EA5E9" intensity={1} distance={5} />
      <pointLight position={[2.5, 2, 0]} color="#0EA5E9" intensity={1} distance={5} />
      <pointLight position={[0, 1, 0]} color="#06B6D4" intensity={0.5} distance={4} />
    </group>
  );
};

interface Bridge3DProps {
  className?: string;
}

const Bridge3D = ({ className }: Bridge3DProps) => {
  return (
    <div className={className} style={{ width: '100%', height: '100%', minHeight: '400px' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: "transparent", width: '100%', height: '100%' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <fog attach="fog" args={["#0A0A0B", 5, 15]} />
        <BridgeMesh />
      </Canvas>
    </div>
  );
};

export default Bridge3D;
