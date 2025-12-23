import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const HologramLogo = () => {
  const groupRef = useRef<THREE.Group>(null);
  
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

      // Multiple rapid glitches
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

    // Initial glitch
    setTimeout(triggerGlitch, 1000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Create edge geometry for wireframe effect
  const { mainEdges, innerEdges } = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Proportions matching the reference image
    const totalWidth = 3.8;
    const totalHeight = 1.8;
    const deckThickness = 0.28;
    const pillarWidth = 0.65;
    const cornerRadius = 0.1;
    
    // Arch parameters - semicircle at bottom
    const innerWidth = totalWidth - pillarWidth * 2;
    const archRadius = innerWidth / 2;
    const archCenterY = 0.15; // Slightly above bottom
    
    // Start from bottom-left corner
    shape.moveTo(-totalWidth/2 + cornerRadius, 0);
    
    // Bottom-left corner (rounded)
    shape.quadraticCurveTo(-totalWidth/2, 0, -totalWidth/2, cornerRadius);
    
    // Left outer edge going up
    shape.lineTo(-totalWidth/2, totalHeight - cornerRadius);
    
    // Top-left corner (rounded)
    shape.quadraticCurveTo(-totalWidth/2, totalHeight, -totalWidth/2 + cornerRadius, totalHeight);
    
    // Top edge (deck top)
    shape.lineTo(totalWidth/2 - cornerRadius, totalHeight);
    
    // Top-right corner (rounded)
    shape.quadraticCurveTo(totalWidth/2, totalHeight, totalWidth/2, totalHeight - cornerRadius);
    
    // Right outer edge going down
    shape.lineTo(totalWidth/2, cornerRadius);
    
    // Bottom-right corner (rounded)
    shape.quadraticCurveTo(totalWidth/2, 0, totalWidth/2 - cornerRadius, 0);
    
    // Right pillar bottom
    shape.lineTo(totalWidth/2 - pillarWidth + cornerRadius, 0);
    shape.quadraticCurveTo(totalWidth/2 - pillarWidth, 0, totalWidth/2 - pillarWidth, cornerRadius);
    
    // Right inner pillar edge with concave curve going up
    const concaveDepth = 0.12;
    shape.bezierCurveTo(
      totalWidth/2 - pillarWidth - concaveDepth, archCenterY + archRadius * 0.5,
      totalWidth/2 - pillarWidth - concaveDepth, archCenterY + archRadius * 0.8,
      totalWidth/2 - pillarWidth, archCenterY + archRadius
    );
    
    // Semicircular arch (opens downward)
    shape.absarc(0, archCenterY, archRadius, 0, Math.PI, false);
    
    // Left inner pillar edge with concave curve going down
    shape.bezierCurveTo(
      -totalWidth/2 + pillarWidth + concaveDepth, archCenterY + archRadius * 0.8,
      -totalWidth/2 + pillarWidth + concaveDepth, archCenterY + archRadius * 0.5,
      -totalWidth/2 + pillarWidth, cornerRadius
    );
    
    // Left pillar bottom
    shape.quadraticCurveTo(-totalWidth/2 + pillarWidth, 0, -totalWidth/2 + pillarWidth - cornerRadius, 0);
    
    // Close the shape
    shape.lineTo(-totalWidth/2 + cornerRadius, 0);
    
    // Inner hole (deck cutout)
    const hole = new THREE.Path();
    const innerMargin = 0.15;
    const holeWidth = innerWidth - innerMargin * 2;
    const holeBottom = archCenterY + archRadius + innerMargin;
    const holeTop = totalHeight - deckThickness;
    const holeCorner = 0.06;
    
    hole.moveTo(-holeWidth/2, holeBottom);
    hole.lineTo(-holeWidth/2, holeTop - holeCorner);
    hole.quadraticCurveTo(-holeWidth/2, holeTop, -holeWidth/2 + holeCorner, holeTop);
    hole.lineTo(holeWidth/2 - holeCorner, holeTop);
    hole.quadraticCurveTo(holeWidth/2, holeTop, holeWidth/2, holeTop - holeCorner);
    hole.lineTo(holeWidth/2, holeBottom);
    hole.lineTo(-holeWidth/2, holeBottom);
    
    shape.holes.push(hole);
    
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

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      // Smooth rotation with subtle wobble
      groupRef.current.rotation.y = Math.sin(time * 0.25) * 0.4;
      groupRef.current.rotation.x = Math.sin(time * 0.15) * 0.08;
      
      // Subtle floating motion - positioned lower
      groupRef.current.position.y = -1.2 + Math.sin(time * 0.5) * 0.05;
    }
  });

  const cyanColor = "#00FFFF";
  const magentaColor = "#FF00FF";
  const whiteColor = "#FFFFFF";

  return (
    <group ref={groupRef}>
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


      {/* Hologram ambient particles */}
      {[...Array(40)].map((_, i) => {
        const baseX = Math.sin(i * 0.5) * 3.2;
        const baseY = Math.cos(i * 0.4) * 2.2;
        const baseZ = Math.sin(i * 0.3) * 1.0;
        const isCyan = i % 2 === 0;
        
        return (
          <mesh
            key={i}
            position={[
              baseX + (glitchState.active ? (Math.random() - 0.5) * 0.2 : 0),
              baseY + (glitchState.active ? (Math.random() - 0.5) * 0.15 : 0),
              baseZ
            ]}
          >
            <sphereGeometry args={[0.015, 6, 6]} />
            <meshBasicMaterial 
              color={isCyan ? cyanColor : magentaColor} 
              transparent 
              opacity={glitchState.active ? 0.3 + Math.random() * 0.5 : 0.4} 
            />
          </mesh>
        );
      })}

      {/* Floating data fragments during glitch */}
      {glitchState.active && [...Array(8)].map((_, i) => (
        <mesh
          key={`glitch-${i}`}
          position={[
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 2.5,
            (Math.random() - 0.5) * 0.5
          ]}
        >
          <boxGeometry args={[0.08, 0.02, 0.01]} />
          <meshBasicMaterial 
            color={i % 2 === 0 ? cyanColor : magentaColor} 
            transparent 
            opacity={0.6} 
          />
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
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 4]} intensity={0.4} color="#00FFFF" />
        <pointLight position={[2, 2, 3]} intensity={0.2} color="#FF00FF" />
        <HologramLogo />
      </Canvas>
    </div>
  );
};

export default Logo3D;
