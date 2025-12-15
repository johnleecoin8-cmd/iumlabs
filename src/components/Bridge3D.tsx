import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

type BridgeType = 'arch' | 'suspension' | 'abstract' | 'beams' | 'minimal' | 'hero';

interface BridgeMeshProps {
  type: BridgeType;
  color?: string;
  secondaryColor?: string;
}

// Walking Person Component
const WalkingPerson = ({ color = '#FFE4B5' }: { color?: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Walk across bridge: -2.8 to 2.8, 10 seconds cycle
      const time = state.clock.elapsedTime;
      const cycleTime = 10;
      const progress = (time % cycleTime) / cycleTime;
      const direction = Math.floor(time / cycleTime) % 2 === 0 ? 1 : -1;
      
      const x = direction === 1 
        ? -2.8 + progress * 5.6 
        : 2.8 - progress * 5.6;
      
      groupRef.current.position.x = x;
      groupRef.current.rotation.y = direction === 1 ? 0 : Math.PI;
      
      // Walking animation - leg swing
      const walkCycle = Math.sin(time * 8) * 0.4;
      if (leftLegRef.current) leftLegRef.current.rotation.x = walkCycle;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -walkCycle;
      if (leftArmRef.current) leftArmRef.current.rotation.x = -walkCycle * 0.7;
      if (rightArmRef.current) rightArmRef.current.rotation.x = walkCycle * 0.7;
    }
  });

  const bodyColor = color;
  const clothesColor = '#3B82F6';

  return (
    <group ref={groupRef} position={[0, 0.05, 0]} scale={[0.12, 0.12, 0.12]}>
      {/* Head */}
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>
      
      {/* Body/Torso */}
      <mesh position={[0, 1.1, 0]}>
        <capsuleGeometry args={[0.2, 0.5, 8, 16]} />
        <meshStandardMaterial color={clothesColor} />
      </mesh>
      
      {/* Left Arm */}
      <mesh ref={leftArmRef} position={[-0.3, 1.2, 0]}>
        <capsuleGeometry args={[0.08, 0.4, 4, 8]} />
        <meshStandardMaterial color={clothesColor} />
      </mesh>
      
      {/* Right Arm */}
      <mesh ref={rightArmRef} position={[0.3, 1.2, 0]}>
        <capsuleGeometry args={[0.08, 0.4, 4, 8]} />
        <meshStandardMaterial color={clothesColor} />
      </mesh>
      
      {/* Left Leg */}
      <mesh ref={leftLegRef} position={[-0.12, 0.4, 0]}>
        <capsuleGeometry args={[0.1, 0.5, 4, 8]} />
        <meshStandardMaterial color="#1E3A5F" />
      </mesh>
      
      {/* Right Leg */}
      <mesh ref={rightLegRef} position={[0.12, 0.4, 0]}>
        <capsuleGeometry args={[0.1, 0.5, 4, 8]} />
        <meshStandardMaterial color="#1E3A5F" />
      </mesh>
    </group>
  );
};

// Hero Bridge - 대형 히어로 섹션용 정교한 브릿지
const HeroBridgeMesh = ({ color = '#3B82F6', secondaryColor = '#60A5FA' }: { color?: string; secondaryColor?: string }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  const archCurve = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3, 0.2, 0),
      new THREE.Vector3(-2, 2.2, 0),
      new THREE.Vector3(0, 3.2, 0),
      new THREE.Vector3(2, 2.2, 0),
      new THREE.Vector3(3, 0.2, 0),
    ]);
    return curve;
  }, []);

  // Generate cable positions
  const cablePositions = useMemo(() => {
    const positions: { x: number; topY: number }[] = [];
    for (let i = 1; i <= 6; i++) {
      const x = -2.5 + (i * 5) / 7;
      const t = (x + 3) / 6;
      const topY = Math.sin(t * Math.PI) * 3 + 0.2;
      positions.push({ x, topY });
    }
    return positions;
  }, []);

  return (
    <group ref={groupRef} scale={[2.0, 2.0, 2.0]}>
      {/* Main Arch - Thick and Glowing */}
      <mesh>
        <tubeGeometry args={[archCurve, 120, 0.18, 32, false]} />
        <meshStandardMaterial
          color={color}
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={4}
          emissive={color}
          emissiveIntensity={0.6}
        />
      </mesh>
      
      {/* Outer Glow Arch */}
      <mesh>
        <tubeGeometry args={[archCurve, 120, 0.28, 32, false]} />
        <meshStandardMaterial
          color={secondaryColor}
          metalness={0.5}
          roughness={0.5}
          transparent
          opacity={0.2}
          emissive={secondaryColor}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Bridge Deck - Detailed with segments */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[6.8, 0.12, 1.0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Deck Planks/Segments */}
      {Array.from({ length: 28 }).map((_, i) => (
        <mesh key={`plank-${i}`} position={[-3.2 + i * 0.24, -0.02, 0]}>
          <boxGeometry args={[0.18, 0.02, 0.9]} />
          <meshStandardMaterial
            color="#1E3A5F"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Towers at both ends */}
      {[-3.2, 3.2].map((x, i) => (
        <group key={`tower-${i}`} position={[x, 0, 0]}>
          {/* Main tower pillar */}
          <mesh position={[0, 0.8, -0.35]}>
            <boxGeometry args={[0.25, 1.8, 0.25]} />
            <meshStandardMaterial
              color={color}
              metalness={0.9}
              roughness={0.1}
              emissive={color}
              emissiveIntensity={0.3}
            />
          </mesh>
          <mesh position={[0, 0.8, 0.35]}>
            <boxGeometry args={[0.25, 1.8, 0.25]} />
            <meshStandardMaterial
              color={color}
              metalness={0.9}
              roughness={0.1}
              emissive={color}
              emissiveIntensity={0.3}
            />
          </mesh>
          {/* Tower top crossbeam */}
          <mesh position={[0, 1.75, 0]}>
            <boxGeometry args={[0.3, 0.15, 0.9]} />
            <meshStandardMaterial
              color={color}
              metalness={0.9}
              roughness={0.1}
              emissive={color}
              emissiveIntensity={0.3}
            />
          </mesh>
          {/* Street lamp on tower */}
          <mesh position={[0, 2.1, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial 
              color="#FFFFFF" 
              emissive="#FFE4B5"
              emissiveIntensity={2.0}
            />
          </mesh>
          <pointLight 
            position={[x, 2.3, 0]} 
            intensity={0.5} 
            color="#FFE4B5" 
            distance={3}
          />
        </group>
      ))}

      {/* Suspension Cables from arch to deck */}
      {cablePositions.map((pos, i) => (
        <mesh 
          key={`cable-${i}`} 
          position={[pos.x, (pos.topY - 0.05) / 2, 0]}
          scale={[1, pos.topY + 0.05, 1]}
        >
          <cylinderGeometry args={[0.015, 0.015, 1, 8]} />
          <meshStandardMaterial
            color={secondaryColor}
            metalness={0.8}
            roughness={0.2}
            emissive={secondaryColor}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {/* Railings/Handrails - Two lines on each side */}
      {[-0.42, 0.42].map((z, zi) => (
        <group key={`railing-${zi}`}>
          {/* Top rail */}
          <mesh position={[0, 0.2, z]}>
            <boxGeometry args={[6.4, 0.03, 0.03]} />
            <meshStandardMaterial
              color={secondaryColor}
              metalness={0.85}
              roughness={0.15}
              emissive={secondaryColor}
              emissiveIntensity={0.2}
            />
          </mesh>
          {/* Bottom rail */}
          <mesh position={[0, 0.08, z]}>
            <boxGeometry args={[6.4, 0.02, 0.02]} />
            <meshStandardMaterial
              color={color}
              metalness={0.85}
              roughness={0.15}
            />
          </mesh>
          {/* Vertical railing posts */}
          {Array.from({ length: 17 }).map((_, i) => (
            <mesh key={`post-${zi}-${i}`} position={[-3.0 + i * 0.4, 0.12, z]}>
              <cylinderGeometry args={[0.012, 0.012, 0.28, 8]} />
              <meshStandardMaterial
                color={secondaryColor}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Glowing End Spheres */}
      <mesh position={[-3.4, 0.1, 0]}>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshStandardMaterial 
          color={secondaryColor} 
          metalness={0.95} 
          roughness={0.05}
          emissive={secondaryColor}
          emissiveIntensity={1.0}
        />
      </mesh>
      <mesh position={[3.4, 0.1, 0]}>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshStandardMaterial 
          color={secondaryColor} 
          metalness={0.95} 
          roughness={0.05}
          emissive={secondaryColor}
          emissiveIntensity={1.0}
        />
      </mesh>
      
      {/* Top Center Crown Sphere */}
      <mesh position={[0, 3.2, 0]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.95} 
          roughness={0.05}
          emissive={color}
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Decorative rings on arch */}
      {[-2, -1, 0, 1, 2].map((x, i) => {
        const t = (x + 3) / 6;
        const y = Math.sin(t * Math.PI) * 3 + 0.2;
        return (
          <mesh key={`ring-${i}`} position={[x, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.12, 0.03, 12, 24]} />
            <meshStandardMaterial
              color={secondaryColor}
              metalness={0.9}
              roughness={0.1}
              emissive={secondaryColor}
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}

      {/* Walking Person */}
      <WalkingPerson />
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
        camera={{ position: [0, 2, 10], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} />
        <directionalLight position={[-5, 3, -5]} intensity={1.8} color="#60A5FA" />
        <pointLight position={[0, 5, 6]} intensity={3.5} color="#3B82F6" />
        <pointLight position={[0, -2, 4]} intensity={2.0} color="#06B6D4" />
        <spotLight position={[0, 10, 0]} intensity={2.5} angle={0.6} penumbra={1} color="#ffffff" />
        <BridgeMesh type={type} color={color} secondaryColor={secondaryColor} />
      </Canvas>
    </div>
  );
};

export default Bridge3D;
