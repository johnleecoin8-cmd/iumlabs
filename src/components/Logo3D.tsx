import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

const HologramLogo = () => {

  // Create edge geometry for wireframe effect
  const { mainEdges, innerEdges } = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Proportions matching the reference image exactly
    const w = 3.8;       // Total width
    const h = 1.8;       // Total height
    const r = 0.1;       // Corner radius
    const sideCurve = 0.25; // How much the outer sides curve inward (concave)
    const pillarWidth = 0.7;
    const archRadius = (w - pillarWidth * 2) / 2;
    
    // 1. Start at top-left (after corner radius)
    shape.moveTo(-w/2 + r, h);
    
    // 2. Top edge (deck top) - straight line
    shape.lineTo(w/2 - r, h);
    
    // 3. Top-right corner (rounded)
    shape.quadraticCurveTo(w/2, h, w/2, h - r);
    
    // 4. Right outer side (CONCAVE curve) - curves inward
    shape.quadraticCurveTo(w/2 - sideCurve, h/2, w/2, r);
    
    // 5. Bottom-right corner (rounded)
    shape.quadraticCurveTo(w/2, 0, w/2 - r, 0);
    
    // 6. Right pillar bottom - go directly to arch start point
    shape.lineTo(w/2 - pillarWidth, 0);
    
    // 7. Semicircular arch (opens downward from y=0)
    // archRadius = w/2 - pillarWidth, so the arc connects directly
    shape.absarc(0, 0, archRadius, 0, Math.PI, false);
    
    // 8. Left pillar bottom
    shape.lineTo(-w/2 + r, 0);
    
    // 13. Bottom-left corner (rounded)
    shape.quadraticCurveTo(-w/2, 0, -w/2, r);
    
    // 14. Left outer side (CONCAVE curve) - curves inward
    shape.quadraticCurveTo(-w/2 + sideCurve, h/2, -w/2, h - r);
    
    // 15. Top-left corner (rounded) - close the shape
    shape.quadraticCurveTo(-w/2, h, -w/2 + r, h);
    
    const extrudeSettings = {
      steps: 1,
      depth: 0.25,
      bevelEnabled: false,
    };
    
    const mainGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const mainEdgesGeom = new THREE.EdgesGeometry(mainGeometry, 15);
    
    // Create inner wireframe geometry (slightly smaller)
    const innerSettings = { ...extrudeSettings, depth: 0.15 };
    const innerGeometry = new THREE.ExtrudeGeometry(shape, innerSettings);
    const innerEdgesGeom = new THREE.EdgesGeometry(innerGeometry, 15);
    
    return { mainEdges: mainEdgesGeom, innerEdges: innerEdgesGeom };
  }, []);


  const cyanColor = "#00FFFF";
  const magentaColor = "#FF00FF";
  const whiteColor = "#FFFFFF";

  return (
    <group position={[0, -0.5, 0]}>
      {/* Main cyan wireframe */}
      <lineSegments 
        geometry={mainEdges} 
        position={[0, 0, -0.125]}
      >
        <lineBasicMaterial 
          color={cyanColor} 
          transparent 
          opacity={0.9}
          linewidth={2}
        />
      </lineSegments>

      {/* Magenta RGB split layer (offset for hologram effect) */}
      <lineSegments 
        geometry={mainEdges} 
        position={[0.025, 0.01, -0.13]}
      >
        <lineBasicMaterial 
          color={magentaColor} 
          transparent 
          opacity={0.5}
          linewidth={1}
        />
      </lineSegments>

      {/* White highlight layer */}
      <lineSegments 
        geometry={innerEdges} 
        position={[0, 0, -0.075]}
      >
        <lineBasicMaterial 
          color={whiteColor} 
          transparent 
          opacity={0.25}
          linewidth={1}
        />
      </lineSegments>
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
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 4]} intensity={0.4} color="#00FFFF" />
        <pointLight position={[2, 2, 3]} intensity={0.2} color="#FF00FF" />
        <HologramLogo />
      </Canvas>
    </div>
  );
};

export default Logo3D;
