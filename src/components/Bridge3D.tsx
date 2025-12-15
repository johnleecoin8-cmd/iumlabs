import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

type BridgeType = 'arch' | 'suspension' | 'abstract' | 'beams' | 'minimal' | 'hero';

interface BridgeMeshProps {
  type: BridgeType;
  color?: string;
  secondaryColor?: string;
}

// Hero Bridge - 대형 히어로 섹션용 브릿지 (매우 밝고 큼)
const HeroBridgeMesh = ({ color = '#3B82F6', secondaryColor = '#60A5FA' }: { color?: string; secondaryColor?: string }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const archCurve = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3, 0, 0),
      new THREE.Vector3(-2, 2, 0),
      new THREE.Vector3(0, 3, 0),
      new THREE.Vector3(2, 2, 0),
      new THREE.Vector3(3, 0, 0),
    ]);
    return curve;
  }, []);

  return (
    <group ref={groupRef} scale={[2.2, 2.2, 2.2]}>
      {/* Main Arch - Very Bright */}
      <mesh>
        <tubeGeometry args={[archCurve, 100, 0.25, 24, false]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={4}
          emissive={color}
          emissiveIntensity={0.8}
        />
      </mesh>
      
      {/* Outer Glow Arch */}
      <mesh>
        <tubeGeometry args={[archCurve, 100, 0.35, 24, false]} />
        <meshStandardMaterial
          color={secondaryColor}
          metalness={0.5}
          roughness={0.5}
          transparent
          opacity={0.25}
          emissive={secondaryColor}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Bridge Deck */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[6.5, 0.15, 1.2]} />
        <meshStandardMaterial
          color={color}
          metalness={0.85}
          roughness={0.15}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Support Pillars */}
      {[-2, -1, 0, 1, 2].map((x, i) => {
        const height = 0.8 + Math.abs(x) * 0.4;
        return (
          <mesh key={i} position={[x, height / 2 + 0.1, 0]}>
            <cylinderGeometry args={[0.08, 0.1, height, 16]} />
            <meshStandardMaterial
              color={color}
              metalness={0.85}
              roughness={0.15}
              emissive={color}
              emissiveIntensity={0.4}
            />
          </mesh>
        );
      })}

      {/* Glowing End Spheres */}
      <mesh position={[-3, 0, 0]}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshStandardMaterial 
          color={secondaryColor} 
          metalness={0.9} 
          roughness={0.1}
          emissive={secondaryColor}
          emissiveIntensity={1.0}
        />
      </mesh>
      <mesh position={[3, 0, 0]}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshStandardMaterial 
          color={secondaryColor} 
          metalness={0.9} 
          roughness={0.1}
          emissive={secondaryColor}
          emissiveIntensity={1.0}
        />
      </mesh>
      
      {/* Top Center Glow Sphere */}
      <mesh position={[0, 3, 0]}>
        <sphereGeometry args={[0.25, 24, 24]} />
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.95} 
          roughness={0.05}
          emissive={color}
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Additional decorative elements */}
      {[-1.5, 1.5].map((x, i) => (
        <mesh key={`ring-${i}`} position={[x, 1.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.05, 16, 32]} />
          <meshStandardMaterial
            color={secondaryColor}
            metalness={0.9}
            roughness={0.1}
            emissive={secondaryColor}
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

// Arch Bridge - 아치형 다리
const ArchBridgeMesh = ({ color = '#3B82F6' }: { color?: string }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });

  const archCurve = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.5, 0, 0),
      new THREE.Vector3(-1.8, 1.5, 0),
      new THREE.Vector3(0, 2.2, 0),
      new THREE.Vector3(1.8, 1.5, 0),
      new THREE.Vector3(2.5, 0, 0),
    ]);
    return curve;
  }, []);

  return (
    <group ref={groupRef} scale={[1.4, 1.4, 1.4]}>
      {/* Main Arch - Thicker */}
      <mesh>
        <tubeGeometry args={[archCurve, 80, 0.2, 20, false]} />
        <meshStandardMaterial
          color={color}
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={3}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
      
      {/* Second Arch (Inner Glow Effect) */}
      <mesh>
        <tubeGeometry args={[archCurve, 80, 0.25, 20, false]} />
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.4}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Bridge Deck */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[5.5, 0.12, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Support Pillars - More Refined */}
      {[-1.8, -0.9, 0, 0.9, 1.8].map((x, i) => {
        const height = 0.5 + Math.abs(x) * 0.3;
        return (
          <mesh key={i} position={[x, height / 2 + 0.1, 0]}>
            <cylinderGeometry args={[0.06, 0.08, height, 12]} />
            <meshStandardMaterial
              color={color}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        );
      })}

      {/* Decorative Spheres at Ends */}
      <mesh position={[-2.5, 0, 0]}>
        <sphereGeometry args={[0.18, 20, 20]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.95} 
          roughness={0.05}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[2.5, 0, 0]}>
        <sphereGeometry args={[0.18, 20, 20]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.95} 
          roughness={0.05}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Top Sphere */}
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.15, 20, 20]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.95} 
          roughness={0.05}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
};

// Beams Bridge - 연결 빔
const BeamsBridgeMesh = ({ color = '#3B82F6', secondaryColor = '#06B6D4' }: { color?: string; secondaryColor?: string }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Horizontal Beams */}
      {[-0.8, 0, 0.8].map((y, i) => (
        <mesh key={`h-${i}`} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 4, 16]} />
          <meshStandardMaterial
            color={i === 1 ? secondaryColor : color}
            metalness={0.85}
            roughness={0.15}
            envMapIntensity={1.5}
          />
        </mesh>
      ))}

      {/* Vertical Connectors */}
      {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
        <mesh key={`v-${i}`} position={[x, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 2, 12]} />
          <meshStandardMaterial
            color={color}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Diagonal Braces */}
      {[-1, 1].map((x, i) => (
        <mesh key={`d-${i}`} position={[x * 0.5, 0, 0]} rotation={[0, 0, x * Math.PI / 6]}>
          <cylinderGeometry args={[0.06, 0.06, 2, 8]} />
          <meshStandardMaterial
            color={secondaryColor}
            metalness={0.75}
            roughness={0.25}
          />
        </mesh>
      ))}

      {/* End Spheres */}
      {[-2, 2].map((x, i) => (
        <mesh key={`s-${i}`} position={[x, 0, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color={secondaryColor}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
};

// Abstract Bridge - 추상적 브릿지
const AbstractBridgeMesh = ({ color = '#6B7280' }: { color?: string }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0015;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
  });

  const waveCurve = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 50; i++) {
      const t = (i / 50) * Math.PI * 2;
      const x = (i / 50) * 4 - 2;
      const y = Math.sin(t) * 0.3;
      points.push(new THREE.Vector3(x, y, 0));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  return (
    <group ref={groupRef} scale={[1.3, 1.3, 1.3]}>
      {/* Wave Bridge */}
      <mesh>
        <tubeGeometry args={[waveCurve, 100, 0.12, 12, false]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      {/* Floating Rings */}
      {[-1.2, 0, 1.2].map((x, i) => (
        <mesh key={i} position={[x, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.3, 0.05, 8, 24]} />
          <meshStandardMaterial
            color={color}
            metalness={0.85}
            roughness={0.15}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Connection Lines */}
      {[-1.2, 0, 1.2].map((x, i) => (
        <mesh key={`line-${i}`} position={[x, 0.25, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
};

// Minimal Bridge - 미니멀 브릿지
const MinimalBridgeMesh = ({ color = '#E5E7EB' }: { color?: string }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
    }
  });

  const simpleCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.5, 0, 0),
      new THREE.Vector3(0, 0.6, 0),
      new THREE.Vector3(1.5, 0, 0),
    ]);
  }, []);

  return (
    <group ref={groupRef} scale={[1.5, 1.5, 1.5]}>
      {/* Simple Arc */}
      <mesh>
        <tubeGeometry args={[simpleCurve, 32, 0.08, 12, false]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* End Dots */}
      <mesh position={[-1.5, 0, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.5, 0, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

// Bridge Mesh Selector
const BridgeMesh = ({ type, color, secondaryColor }: BridgeMeshProps) => {
  switch (type) {
    case 'hero':
      return <HeroBridgeMesh color={color} secondaryColor={secondaryColor} />;
    case 'arch':
      return <ArchBridgeMesh color={color} />;
    case 'beams':
      return <BeamsBridgeMesh color={color} secondaryColor={secondaryColor} />;
    case 'abstract':
      return <AbstractBridgeMesh color={color} />;
    case 'minimal':
      return <MinimalBridgeMesh color={color} />;
    default:
      return <ArchBridgeMesh color={color} />;
  }
};

interface Bridge3DProps {
  type: BridgeType;
  className?: string;
  color?: string;
  secondaryColor?: string;
}

const Bridge3D = ({ type, className = '', color, secondaryColor }: Bridge3DProps) => {
  return (
    <div className={`pointer-events-none ${className}`} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 1, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={2.0} />
        <directionalLight position={[-5, 3, -5]} intensity={1.5} color="#60A5FA" />
        <pointLight position={[0, 5, 6]} intensity={3.0} color="#3B82F6" />
        <pointLight position={[0, -2, 4]} intensity={1.5} color="#06B6D4" />
        <spotLight position={[0, 8, 0]} intensity={2.0} angle={0.5} penumbra={1} color="#ffffff" />
        <BridgeMesh type={type} color={color} secondaryColor={secondaryColor} />
      </Canvas>
    </div>
  );
};

export default Bridge3D;
