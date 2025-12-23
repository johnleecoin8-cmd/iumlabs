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
    
    const totalWidth = 3.2;
    const totalHeight = 2.0;
    const deckHeight = 0.35;
    const pillarWidth = 0.45;
    const archRadius = (totalWidth - pillarWidth * 2) / 2;
    const cornerRadius = 0.08;
    const innerCornerRadius = 0.06;
    
    // Outer shape
    shape.moveTo(-totalWidth/2 + cornerRadius, 0);
    shape.quadraticCurveTo(-totalWidth/2, 0, -totalWidth/2, cornerRadius);
    shape.lineTo(-totalWidth/2, totalHeight - cornerRadius);
    shape.quadraticCurveTo(-totalWidth/2, totalHeight, -totalWidth/2 + cornerRadius, totalHeight);
    shape.lineTo(totalWidth/2 - cornerRadius, totalHeight);
    shape.quadraticCurveTo(totalWidth/2, totalHeight, totalWidth/2, totalHeight - cornerRadius);
    shape.lineTo(totalWidth/2, cornerRadius);
    shape.quadraticCurveTo(totalWidth/2, 0, totalWidth/2 - cornerRadius, 0);
    shape.lineTo(totalWidth/2 - pillarWidth + cornerRadius, 0);
    shape.quadraticCurveTo(totalWidth/2 - pillarWidth, 0, totalWidth/2 - pillarWidth, innerCornerRadius);
    shape.lineTo(totalWidth/2 - pillarWidth, archRadius * 0.2);
    shape.absarc(0, archRadius * 0.2, archRadius, 0, Math.PI, false);
    shape.lineTo(-totalWidth/2 + pillarWidth, innerCornerRadius);
    shape.quadraticCurveTo(-totalWidth/2 + pillarWidth, 0, -totalWidth/2 + pillarWidth - cornerRadius, 0);
    shape.lineTo(-totalWidth/2 + cornerRadius, 0);
    
    // Inner hole
    const hole = new THREE.Path();
    const innerGap = 0.12;
    const holeWidth = totalWidth - pillarWidth * 2 - innerGap * 2;
    const holeTop = totalHeight - deckHeight;
    const holeArchTop = archRadius * 0.2 + archRadius - innerGap;
    
    hole.moveTo(-holeWidth/2, holeArchTop);
    hole.lineTo(-holeWidth/2, holeTop - innerCornerRadius);
    hole.quadraticCurveTo(-holeWidth/2, holeTop, -holeWidth/2 + innerCornerRadius, holeTop);
    hole.lineTo(holeWidth/2 - innerCornerRadius, holeTop);
    hole.quadraticCurveTo(holeWidth/2, holeTop, holeWidth/2, holeTop - innerCornerRadius);
    hole.lineTo(holeWidth/2, holeArchTop);
    const innerArchRadius = archRadius - innerGap - 0.1;
    hole.absarc(0, archRadius * 0.2, innerArchRadius, 0, Math.PI, false);
    
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
      groupRef.current.position.y = -0.4 + Math.sin(time * 0.5) * 0.05;
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

      {/* Inner glow mesh (semi-transparent fill) */}
      <mesh position={[0, 0, -0.125]}>
        <planeGeometry args={[3.4, 2.2]} />
        <meshBasicMaterial
          color={cyanColor}
          transparent
          opacity={glitchState.active ? 0.02 + Math.random() * 0.03 : 0.025}
        />
      </mesh>


      {/* Outer glow */}
      <mesh position={[0, 0, -0.3]}>
        <planeGeometry args={[4.5, 3]} />
        <meshBasicMaterial
          color={cyanColor}
          transparent
          opacity={0.015}
        />
      </mesh>

      {/* Hologram ambient particles */}
      {[...Array(20)].map((_, i) => {
        const baseX = Math.sin(i * 0.8) * 2.5;
        const baseY = Math.cos(i * 0.6) * 1.8;
        const baseZ = Math.sin(i * 0.4) * 0.8;
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
