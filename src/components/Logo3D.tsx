import { useMemo, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

const HologramLogo = () => {
  const [glitchState, setGlitchState] = useState({
    active: false,
    offsetX: 0,
    offsetY: 0,
    rgbSplit: 0,
  });

  // Random glitch trigger
  useEffect(() => {
    const triggerGlitch = () => {
      setGlitchState({
        active: true,
        offsetX: (Math.random() - 0.5) * 0.3,
        offsetY: (Math.random() - 0.5) * 0.2,
        rgbSplit: Math.random() * 0.15,
      });

      const glitchCount = Math.floor(Math.random() * 3) + 1;
      let count = 0;
      
      const rapidGlitch = setInterval(() => {
        count++;
        if (count < glitchCount) {
          setGlitchState({
            active: true,
            offsetX: (Math.random() - 0.5) * 0.25,
            offsetY: (Math.random() - 0.5) * 0.15,
            rgbSplit: Math.random() * 0.12,
          });
        } else {
          clearInterval(rapidGlitch);
          setTimeout(() => {
            setGlitchState({ active: false, offsetX: 0, offsetY: 0, rgbSplit: 0 });
          }, 50 + Math.random() * 100);
        }
      }, 50 + Math.random() * 80);
    };

    const glitchInterval = setInterval(() => {
      triggerGlitch();
    }, 2000 + Math.random() * 4000);

    setTimeout(triggerGlitch, 1000);

    return () => clearInterval(glitchInterval);
  }, []);

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
    shape.absarc(0, 0, archRadius, 0, Math.PI, false);
    
    // 8. Left pillar bottom
    shape.lineTo(-w/2 + r, 0);
    
    // 9. Bottom-left corner (rounded)
    shape.quadraticCurveTo(-w/2, 0, -w/2, r);
    
    // 10. Left outer side (CONCAVE curve) - curves inward
    shape.quadraticCurveTo(-w/2 + sideCurve, h/2, -w/2, h - r);
    
    // 11. Top-left corner (rounded) - close the shape
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
    <group position={[0, -1.0, 0]}>
      {/* Main cyan wireframe */}
      <lineSegments 
        geometry={mainEdges} 
        position={[
          glitchState.active ? glitchState.offsetX : 0, 
          glitchState.active ? glitchState.offsetY : 0, 
          -0.125
        ]}
      >
        <lineBasicMaterial 
          color={cyanColor} 
          transparent 
          opacity={glitchState.active ? 0.6 + Math.random() * 0.4 : 0.9}
          linewidth={2}
        />
      </lineSegments>

      {/* Magenta RGB split layer (offset for hologram effect) */}
      <lineSegments 
        geometry={mainEdges} 
        position={[
          glitchState.active ? glitchState.rgbSplit + 0.03 : 0.025, 
          glitchState.active ? -glitchState.rgbSplit * 0.5 : 0.01, 
          -0.13
        ]}
      >
        <lineBasicMaterial 
          color={magentaColor} 
          transparent 
          opacity={glitchState.active ? 0.4 + Math.random() * 0.3 : 0.5}
          linewidth={1}
        />
      </lineSegments>

      {/* White highlight layer */}
      <lineSegments 
        geometry={innerEdges} 
        position={[
          glitchState.active ? -glitchState.offsetX * 0.5 : 0, 
          glitchState.active ? glitchState.offsetY * 0.3 : 0, 
          -0.075
        ]}
      >
        <lineBasicMaterial 
          color={whiteColor} 
          transparent 
          opacity={glitchState.active ? 0.2 + Math.random() * 0.3 : 0.25}
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
