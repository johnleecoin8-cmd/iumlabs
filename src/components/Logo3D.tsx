import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const LogoMesh = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Create the Ium Labs bridge logo shape using Shape and ExtrudeGeometry
  const logoGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Logo dimensions - Ium Labs bridge logo
    // Structure: flat top deck, two pillars, semi-circular arch opening at bottom
    const totalWidth = 3.2;
    const totalHeight = 2.0;
    const deckHeight = 0.35; // top deck thickness
    const pillarWidth = 0.45; // width of each pillar
    const archRadius = (totalWidth - pillarWidth * 2) / 2; // radius of the bottom arch
    const cornerRadius = 0.08;
    const innerCornerRadius = 0.06;
    
    // Outer shape - start from bottom-left pillar, going clockwise
    // Bottom-left corner of left pillar
    shape.moveTo(-totalWidth/2 + cornerRadius, 0);
    shape.quadraticCurveTo(-totalWidth/2, 0, -totalWidth/2, cornerRadius);
    
    // Left outer edge going up
    shape.lineTo(-totalWidth/2, totalHeight - cornerRadius);
    
    // Top-left corner
    shape.quadraticCurveTo(-totalWidth/2, totalHeight, -totalWidth/2 + cornerRadius, totalHeight);
    
    // Top edge
    shape.lineTo(totalWidth/2 - cornerRadius, totalHeight);
    
    // Top-right corner
    shape.quadraticCurveTo(totalWidth/2, totalHeight, totalWidth/2, totalHeight - cornerRadius);
    
    // Right outer edge going down
    shape.lineTo(totalWidth/2, cornerRadius);
    
    // Bottom-right corner of right pillar
    shape.quadraticCurveTo(totalWidth/2, 0, totalWidth/2 - cornerRadius, 0);
    
    // Bottom edge of right pillar
    shape.lineTo(totalWidth/2 - pillarWidth + cornerRadius, 0);
    
    // Inner bottom-right corner (going into arch)
    shape.quadraticCurveTo(totalWidth/2 - pillarWidth, 0, totalWidth/2 - pillarWidth, innerCornerRadius);
    
    // Right pillar inner edge going up slightly then arch
    shape.lineTo(totalWidth/2 - pillarWidth, archRadius * 0.2);
    
    // Semi-circular arch at bottom (opening downward) - from right to left
    shape.absarc(0, archRadius * 0.2, archRadius, 0, Math.PI, false);
    
    // Left pillar inner edge going down
    shape.lineTo(-totalWidth/2 + pillarWidth, innerCornerRadius);
    
    // Inner bottom-left corner
    shape.quadraticCurveTo(-totalWidth/2 + pillarWidth, 0, -totalWidth/2 + pillarWidth - cornerRadius, 0);
    
    // Bottom edge of left pillar back to start
    shape.lineTo(-totalWidth/2 + cornerRadius, 0);
    
    // Create inner cutout hole for the space between deck and arch
    const hole = new THREE.Path();
    const innerGap = 0.12; // gap between deck and top of arch
    const holeWidth = totalWidth - pillarWidth * 2 - innerGap * 2;
    const holeTop = totalHeight - deckHeight;
    const holeArchTop = archRadius * 0.2 + archRadius - innerGap;
    
    // Inner rectangular space + top of arch
    // Start from bottom-left of hole (above arch)
    hole.moveTo(-holeWidth/2, holeArchTop);
    
    // Left edge going up
    hole.lineTo(-holeWidth/2, holeTop - innerCornerRadius);
    
    // Top-left corner
    hole.quadraticCurveTo(-holeWidth/2, holeTop, -holeWidth/2 + innerCornerRadius, holeTop);
    
    // Top edge
    hole.lineTo(holeWidth/2 - innerCornerRadius, holeTop);
    
    // Top-right corner
    hole.quadraticCurveTo(holeWidth/2, holeTop, holeWidth/2, holeTop - innerCornerRadius);
    
    // Right edge going down
    hole.lineTo(holeWidth/2, holeArchTop);
    
    // Arc connecting right to left (inner part of arch - smaller arc)
    const innerArchRadius = archRadius - innerGap - 0.1;
    hole.absarc(0, archRadius * 0.2, innerArchRadius, 0, Math.PI, false);
    
    shape.holes.push(hole);
    
    const extrudeSettings = {
      steps: 2,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 5
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
