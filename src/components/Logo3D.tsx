import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const LogoMesh = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Create the Ium Labs bridge logo shape using Shape and ExtrudeGeometry
  const logoGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Logo dimensions (based on the actual Ium Labs logo - bridge/connection shape)
    const width = 3;
    const height = 1.8;
    const thickness = 0.25;
    const cornerRadius = 0.12;
    
    // Start from bottom-left outer corner
    shape.moveTo(-width/2 + cornerRadius, -height/2);
    
    // Bottom edge
    shape.lineTo(width/2 - cornerRadius, -height/2);
    
    // Bottom-right corner
    shape.quadraticCurveTo(width/2, -height/2, width/2, -height/2 + cornerRadius);
    
    // Right outer edge going up
    shape.lineTo(width/2, height/2 - cornerRadius);
    
    // Top-right corner
    shape.quadraticCurveTo(width/2, height/2, width/2 - cornerRadius, height/2);
    
    // Top edge
    shape.lineTo(-width/2 + cornerRadius, height/2);
    
    // Top-left corner
    shape.quadraticCurveTo(-width/2, height/2, -width/2, height/2 - cornerRadius);
    
    // Left outer edge going down
    shape.lineTo(-width/2, -height/2 + cornerRadius);
    
    // Bottom-left corner
    shape.quadraticCurveTo(-width/2, -height/2, -width/2 + cornerRadius, -height/2);
    
    // Create the inner cutout (arch shape at top, open at bottom)
    const hole = new THREE.Path();
    
    const innerWidth = width - thickness * 2;
    const archCenterY = height/2 - thickness - 0.5;
    const archRadius = innerWidth / 2;
    
    // Start from inner bottom-left
    hole.moveTo(-innerWidth/2, -height/2 + thickness);
    
    // Left inner edge going up to arch
    hole.lineTo(-innerWidth/2, archCenterY);
    
    // The arch (semi-circle at top) - going from left to right
    hole.absarc(0, archCenterY, archRadius, Math.PI, 0, true);
    
    // Right inner edge going down
    hole.lineTo(innerWidth/2, -height/2 + thickness);
    
    // Bottom inner edge
    hole.lineTo(-innerWidth/2, -height/2 + thickness);
    
    shape.holes.push(hole);
    
    const extrudeSettings = {
      steps: 2,
      depth: 0.35,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelOffset: 0,
      bevelSegments: 4
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.35;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main logo mesh */}
      <mesh geometry={logoGeometry} position={[0, 0, -0.175]}>
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.15}
          metalness={0.95}
          emissive="#FFFFFF"
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* Glow effect behind */}
      <mesh position={[0, 0, -0.6]}>
        <planeGeometry args={[4, 2.5]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.04}
        />
      </mesh>

      {/* Outer glow sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.015}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Ambient particles */}
      {[...Array(12)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * 0.9) * 2.2,
            Math.cos(i * 0.7) * 1.5,
            Math.sin(i * 0.5) * 0.6
          ]}
        >
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.35} />
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
        camera={{ position: [0, 0, 5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} />
        <directionalLight position={[-5, -5, 5]} intensity={0.3} />
        <pointLight position={[0, 0, 4]} intensity={0.5} color="#FFFFFF" />
        <LogoMesh />
      </Canvas>
    </div>
  );
};

export default Logo3D;
