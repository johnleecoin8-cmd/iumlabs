import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Bridge Tower Component
const BridgeTower = ({ position, height = 4 }: { position: [number, number, number]; height?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <group position={position}>
      {/* Main tower pillar */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[0.3, height, 0.3]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#0066ff"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Tower top accent */}
      <mesh position={[0, height + 0.2, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial 
          color="#0088ff" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#0088ff"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Glow ring at top */}
      <mesh position={[0, height + 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.05, 8, 32]} />
        <meshStandardMaterial 
          color="#00aaff" 
          emissive="#00aaff"
          emissiveIntensity={1}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
};

// Animated Cable Component using mesh tube instead of line
const Cable = ({ 
  start, 
  end, 
  color = "#0088ff",
  delay = 0 
}: { 
  start: [number, number, number]; 
  end: [number, number, number]; 
  color?: string;
  delay?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const tubeGeometry = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(
        (start[0] + end[0]) / 2,
        Math.min(start[1], end[1]) - 0.5,
        (start[2] + end[2]) / 2
      ),
      new THREE.Vector3(...end)
    );
    return new THREE.TubeGeometry(curve, 20, 0.02, 8, false);
  }, [start, end]);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} geometry={tubeGeometry}>
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
};

// Data Particles flowing on the bridge
const DataParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8; // x
      pos[i * 3 + 1] = Math.random() * 0.5 - 0.5; // y (on the bridge deck)
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2; // z
      vel[i] = 0.02 + Math.random() * 0.03;
    }
    
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        posArray[i * 3] += velocities[i];
        
        // Reset particle when it goes off the bridge
        if (posArray[i * 3] > 4) {
          posArray[i * 3] = -4;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        color="#00ddff" 
        size={0.08} 
        transparent 
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

// Bridge Deck
const BridgeDeck = () => {
  return (
    <mesh position={[0, -0.5, 0]} rotation={[0, 0, 0]}>
      <boxGeometry args={[10, 0.15, 1.2]} />
      <meshStandardMaterial 
        color="#0a0a15" 
        metalness={0.6} 
        roughness={0.4}
        emissive="#001133"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

// Water/Reflection plane
const WaterPlane = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = -2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial 
        color="#000820" 
        metalness={0.9} 
        roughness={0.1}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

// Label Component
const BridgeLabel = ({ position, text }: { position: [number, number, number]; text: string }) => {
  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.3}>
      <mesh position={position}>
        <planeGeometry args={[1.5, 0.4]} />
        <meshBasicMaterial color="#0a0a15" transparent opacity={0.8} />
      </mesh>
    </Float>
  );
};

// Main Bridge Scene
const BridgeScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const cablePositions = useMemo(() => {
    const cables: { start: [number, number, number]; end: [number, number, number]; color: string }[] = [];
    
    // Left tower cables
    for (let i = 0; i < 6; i++) {
      cables.push({
        start: [-3, 4, 0],
        end: [-4 + i * 0.5, -0.4, 0],
        color: i % 2 === 0 ? "#0088ff" : "#00aaff"
      });
    }
    
    // Right tower cables
    for (let i = 0; i < 6; i++) {
      cables.push({
        start: [3, 4, 0],
        end: [1 + i * 0.5, -0.4, 0],
        color: i % 2 === 0 ? "#0088ff" : "#00aaff"
      });
    }
    
    return cables;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Towers */}
      <BridgeTower position={[-3, 0, 0]} height={4.5} />
      <BridgeTower position={[3, 0, 0]} height={4.5} />
      
      {/* Bridge Deck */}
      <BridgeDeck />
      
      {/* Cables */}
      {cablePositions.map((cable, i) => (
        <Cable 
          key={i} 
          start={cable.start} 
          end={cable.end} 
          color={cable.color}
          delay={i * 0.3}
        />
      ))}
      
      {/* Main suspension cable */}
      <Cable 
        start={[-5, -0.3, 0]} 
        end={[5, -0.3, 0]} 
        color="#00ddff"
      />
      
      {/* Data Particles */}
      <DataParticles />
      
      {/* Water */}
      <WaterPlane />
      
      {/* Ambient glow spheres */}
      <mesh position={[-3, 5, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#00aaff" transparent opacity={0.5} />
      </mesh>
      <mesh position={[3, 5, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#00aaff" transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

// Main Component
const Bridge3D = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 2, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#0066ff" />
        <pointLight position={[0, -5, 5]} intensity={0.3} color="#00aaff" />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#000510', 8, 25]} />
        
        {/* Bridge */}
        <BridgeScene />
      </Canvas>
    </div>
  );
};

export default Bridge3D;
