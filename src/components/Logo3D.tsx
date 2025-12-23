import { useMemo, useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const HologramLogo = () => {
  const [glitchState, setGlitchState] = useState({
    active: false,
    offsetX: 0,
    offsetY: 0,
    rgbSplit: 0,
    scaleX: 1,
    opacity: 1,
    isHeavy: false,
  });

  // Dramatic glitch trigger
  useEffect(() => {
    const triggerGlitch = () => {
      // 8% chance for heavy glitch
      const isHeavy = Math.random() < 0.08;
      
      const baseOffsetX = isHeavy ? 1.2 : 0.8;
      const baseOffsetY = isHeavy ? 0.8 : 0.5;
      const baseRgbSplit = isHeavy ? 0.6 : 0.4;
      
      setGlitchState({
        active: true,
        offsetX: (Math.random() - 0.5) * baseOffsetX,
        offsetY: (Math.random() - 0.5) * baseOffsetY,
        rgbSplit: Math.random() * baseRgbSplit + 0.15,
        scaleX: isHeavy ? 0.9 + Math.random() * 0.2 : 0.95 + Math.random() * 0.1,
        opacity: isHeavy ? 0.3 + Math.random() * 0.7 : 0.5 + Math.random() * 0.5,
        isHeavy,
      });

      // More rapid glitches: 3-8 times
      const glitchCount = Math.floor(Math.random() * 6) + 3;
      let count = 0;
      
      const rapidGlitch = setInterval(() => {
        count++;
        if (count < glitchCount) {
          const flickerHeavy = Math.random() < 0.15;
          setGlitchState({
            active: true,
            offsetX: (Math.random() - 0.5) * (flickerHeavy ? 1.5 : 0.7),
            offsetY: (Math.random() - 0.5) * (flickerHeavy ? 1.0 : 0.4),
            rgbSplit: Math.random() * (flickerHeavy ? 0.8 : 0.5) + 0.1,
            scaleX: flickerHeavy ? 0.85 + Math.random() * 0.3 : 0.92 + Math.random() * 0.16,
            opacity: flickerHeavy ? 0.1 + Math.random() * 0.9 : 0.4 + Math.random() * 0.6,
            isHeavy: flickerHeavy,
          });
        } else {
          clearInterval(rapidGlitch);
          setTimeout(() => {
            setGlitchState({ active: false, offsetX: 0, offsetY: 0, rgbSplit: 0, scaleX: 1, opacity: 1, isHeavy: false });
          }, 30 + Math.random() * 70);
        }
      }, 35 + Math.random() * 60);
    };

    // More frequent: 1-2.5 seconds
    const glitchInterval = setInterval(() => {
      triggerGlitch();
    }, 1000 + Math.random() * 1500);

    setTimeout(triggerGlitch, 500);

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

  const yellowColor = "#FFFF00";
  const greenColor = "#00FF88";

  return (
    <group position={[0, -1.0, 0]} scale={[glitchState.scaleX, 1, 1]}>
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
          opacity={glitchState.active ? glitchState.opacity * 0.9 : 0.9}
          linewidth={2}
        />
      </lineSegments>

      {/* Magenta RGB split layer - stronger offset */}
      <lineSegments 
        geometry={mainEdges} 
        position={[
          glitchState.active ? glitchState.rgbSplit * 0.8 + 0.05 : 0.025, 
          glitchState.active ? -glitchState.rgbSplit * 0.6 : 0.01, 
          -0.13
        ]}
      >
        <lineBasicMaterial 
          color={magentaColor} 
          transparent 
          opacity={glitchState.active ? 0.5 + Math.random() * 0.4 : 0.5}
          linewidth={1}
        />
      </lineSegments>

      {/* Yellow/Green layer - appears during glitch for extra RGB chaos */}
      {glitchState.active && (
        <lineSegments 
          geometry={mainEdges} 
          position={[
            -glitchState.rgbSplit * 0.7 - 0.04, 
            glitchState.rgbSplit * 0.4, 
            -0.135
          ]}
        >
          <lineBasicMaterial 
            color={glitchState.isHeavy ? yellowColor : greenColor} 
            transparent 
            opacity={glitchState.isHeavy ? 0.6 : 0.35}
            linewidth={1}
          />
        </lineSegments>
      )}

      {/* White highlight layer - follows glitch */}
      <lineSegments 
        geometry={innerEdges} 
        position={[
          glitchState.active ? -glitchState.offsetX * 0.7 : 0, 
          glitchState.active ? glitchState.offsetY * 0.5 : 0, 
          -0.075
        ]}
      >
        <lineBasicMaterial 
          color={whiteColor} 
          transparent 
          opacity={glitchState.active ? 0.3 + Math.random() * 0.4 : 0.25}
          linewidth={1}
        />
      </lineSegments>

      {/* Extra glitch layer during heavy glitch */}
      {glitchState.isHeavy && (
        <lineSegments 
          geometry={mainEdges} 
          position={[
            (Math.random() - 0.5) * 1.2, 
            (Math.random() - 0.5) * 0.8, 
            -0.14
          ]}
        >
          <lineBasicMaterial 
            color={cyanColor} 
            transparent 
            opacity={0.3 + Math.random() * 0.3}
            linewidth={1}
          />
        </lineSegments>
      )}
    </group>
  );
};

// Trigram bar component
const TrigramBar = ({ 
  position, 
  rotation, 
  isBroken, 
  glitchOffset,
  color,
  opacity 
}: { 
  position: [number, number, number]; 
  rotation: number; 
  isBroken: boolean;
  glitchOffset: { x: number; y: number };
  color: string;
  opacity: number;
}) => {
  const geometry = useMemo(() => {
    const barW = 0.6;
    const barH = 0.08;
    const gap = 0.08;
    
    if (isBroken) {
      // Two half bars with gap
      const leftShape = new THREE.Shape();
      leftShape.moveTo(-barW / 2, -barH / 2);
      leftShape.lineTo(-gap / 2, -barH / 2);
      leftShape.lineTo(-gap / 2, barH / 2);
      leftShape.lineTo(-barW / 2, barH / 2);
      leftShape.closePath();
      
      const rightShape = new THREE.Shape();
      rightShape.moveTo(gap / 2, -barH / 2);
      rightShape.lineTo(barW / 2, -barH / 2);
      rightShape.lineTo(barW / 2, barH / 2);
      rightShape.lineTo(gap / 2, barH / 2);
      rightShape.closePath();
      
      const extrudeSettings = { depth: 0.05, bevelEnabled: false };
      const leftGeom = new THREE.ExtrudeGeometry(leftShape, extrudeSettings);
      const rightGeom = new THREE.ExtrudeGeometry(rightShape, extrudeSettings);
      
      return { left: leftGeom, right: rightGeom, single: null };
    } else {
      // Single solid bar
      const shape = new THREE.Shape();
      shape.moveTo(-barW / 2, -barH / 2);
      shape.lineTo(barW / 2, -barH / 2);
      shape.lineTo(barW / 2, barH / 2);
      shape.lineTo(-barW / 2, barH / 2);
      shape.closePath();
      
      const extrudeSettings = { depth: 0.05, bevelEnabled: false };
      return { left: null, right: null, single: new THREE.ExtrudeGeometry(shape, extrudeSettings) };
    }
  }, [isBroken]);

  return (
    <group position={[position[0] + glitchOffset.x, position[1] + glitchOffset.y, position[2]]} rotation={[0, 0, rotation]}>
      {geometry.single ? (
        <mesh geometry={geometry.single}>
          <meshBasicMaterial color={color} transparent opacity={opacity} />
        </mesh>
      ) : (
        <>
          <mesh geometry={geometry.left!}>
            <meshBasicMaterial color={color} transparent opacity={opacity} />
          </mesh>
          <mesh geometry={geometry.right!}>
            <meshBasicMaterial color={color} transparent opacity={opacity} />
          </mesh>
        </>
      )}
    </group>
  );
};

// Trigram (3 bars) component
const Trigram = ({ 
  pattern, 
  position, 
  rotation,
  glitchOffset,
  color,
  opacity
}: { 
  pattern: boolean[]; // true = solid, false = broken
  position: [number, number, number];
  rotation: number;
  glitchOffset: { x: number; y: number };
  color: string;
  opacity: number;
}) => {
  const spacing = 0.14;
  
  return (
    <group position={position} rotation={[0, 0, rotation]}>
      {pattern.map((isSolid, i) => (
        <TrigramBar
          key={i}
          position={[0, (1 - i) * spacing, 0]}
          rotation={0}
          isBroken={!isSolid}
          glitchOffset={glitchOffset}
          color={color}
          opacity={opacity}
        />
      ))}
    </group>
  );
};

// Taegeuk (Korean flag symbol) hologram component with THREE.Shape
const TaegeukHologram = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [glitchState, setGlitchState] = useState({
    active: false,
    offsetX: 0,
    offsetY: 0,
    rgbSplit: 0,
    scaleX: 1,
    opacity: 1,
    isHeavy: false,
    colorSwap: false,
  });

  // Slow rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  // Glitch trigger
  useEffect(() => {
    const triggerGlitch = () => {
      const isHeavy = Math.random() < 0.1;
      const colorSwap = Math.random() < 0.3;
      
      setGlitchState({
        active: true,
        offsetX: (Math.random() - 0.5) * 0.4,
        offsetY: (Math.random() - 0.5) * 0.3,
        rgbSplit: Math.random() * 0.3 + 0.1,
        scaleX: 0.95 + Math.random() * 0.1,
        opacity: 0.6 + Math.random() * 0.4,
        isHeavy,
        colorSwap,
      });

      const glitchCount = Math.floor(Math.random() * 4) + 2;
      let count = 0;
      
      const rapidGlitch = setInterval(() => {
        count++;
        if (count < glitchCount) {
          setGlitchState({
            active: true,
            offsetX: (Math.random() - 0.5) * 0.35,
            offsetY: (Math.random() - 0.5) * 0.25,
            rgbSplit: Math.random() * 0.35 + 0.1,
            scaleX: 0.93 + Math.random() * 0.14,
            opacity: 0.5 + Math.random() * 0.5,
            isHeavy: Math.random() < 0.12,
            colorSwap: Math.random() < 0.35,
          });
        } else {
          clearInterval(rapidGlitch);
          setTimeout(() => {
            setGlitchState({ active: false, offsetX: 0, offsetY: 0, rgbSplit: 0, scaleX: 1, opacity: 1, isHeavy: false, colorSwap: false });
          }, 40 + Math.random() * 60);
        }
      }, 45 + Math.random() * 55);
    };

    const glitchInterval = setInterval(() => {
      triggerGlitch();
    }, 1800 + Math.random() * 2200);

    setTimeout(triggerGlitch, 700);

    return () => clearInterval(glitchInterval);
  }, []);

  // Create Taegeuk shapes with THREE.Shape
  const { redGeometry, blueGeometry, outerRingGeometry } = useMemo(() => {
    const r = 1.2; // Taegeuk radius
    
    // Red Taegeuk (top half - Yang)
    const redShape = new THREE.Shape();
    redShape.moveTo(r, 0);
    redShape.absarc(0, 0, r, 0, Math.PI, false); // Upper semicircle
    redShape.absarc(-r/2, 0, r/2, Math.PI, 0, true); // Left small semicircle (inward)
    redShape.absarc(r/2, 0, r/2, Math.PI, 0, false); // Right small semicircle (outward)
    
    // Blue Taegeuk (bottom half - Yin)
    const blueShape = new THREE.Shape();
    blueShape.moveTo(-r, 0);
    blueShape.absarc(0, 0, r, Math.PI, 2 * Math.PI, false); // Lower semicircle
    blueShape.absarc(r/2, 0, r/2, 0, Math.PI, false); // Right small semicircle (outward)
    blueShape.absarc(-r/2, 0, r/2, 0, Math.PI, true); // Left small semicircle (inward)
    
    // Outer ring
    const outerRingShape = new THREE.Shape();
    outerRingShape.absarc(0, 0, r + 0.08, 0, Math.PI * 2, false);
    const innerHole = new THREE.Path();
    innerHole.absarc(0, 0, r + 0.02, 0, Math.PI * 2, true);
    outerRingShape.holes.push(innerHole);
    
    const extrudeSettings = {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2
    };
    
    const ringExtrudeSettings = {
      depth: 0.05,
      bevelEnabled: false
    };
    
    return {
      redGeometry: new THREE.ExtrudeGeometry(redShape, extrudeSettings),
      blueGeometry: new THREE.ExtrudeGeometry(blueShape, extrudeSettings),
      outerRingGeometry: new THREE.ExtrudeGeometry(outerRingShape, ringExtrudeSettings)
    };
  }, []);

  // Korean flag colors
  const redColor = "#C60C30";
  const blueColor = "#003478";
  const blackColor = "#1a1a1a";
  const whiteColor = "#FFFFFF";
  const goldColor = "#FFD700";

  // Trigram patterns (건곤감리)
  // 건 (Geon/Heaven): ☰ - 3 solid bars
  // 곤 (Gon/Earth): ☷ - 3 broken bars  
  // 감 (Gam/Water): ☵ - broken, solid, broken
  // 리 (Ri/Fire): ☲ - solid, broken, solid
  const trigrams = {
    geon: [true, true, true],      // ☰ top-left
    ri: [true, false, true],       // ☲ top-right
    gam: [false, true, false],     // ☵ bottom-left
    gon: [false, false, false],    // ☷ bottom-right
  };

  const trigramDistance = 1.9;
  const trigramRotation = Math.PI / 4; // 45 degrees

  const glitchOffset = {
    x: glitchState.active ? glitchState.offsetX : 0,
    y: glitchState.active ? glitchState.offsetY : 0,
  };

  const mainOpacity = glitchState.active ? glitchState.opacity : 1;
  const rgbOffset = glitchState.active ? glitchState.rgbSplit * 0.15 : 0;

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[glitchState.scaleX, 1, 1]}>
      {/* Red Taegeuk (Yang) - main */}
      <mesh 
        geometry={redGeometry} 
        position={[glitchOffset.x, glitchOffset.y, -0.05]}
      >
        <meshBasicMaterial 
          color={glitchState.colorSwap ? blueColor : redColor} 
          transparent 
          opacity={mainOpacity * 0.95} 
        />
      </mesh>
      
      {/* Blue Taegeuk (Yin) - main */}
      <mesh 
        geometry={blueGeometry} 
        position={[glitchOffset.x, glitchOffset.y, -0.05]}
      >
        <meshBasicMaterial 
          color={glitchState.colorSwap ? redColor : blueColor} 
          transparent 
          opacity={mainOpacity * 0.95} 
        />
      </mesh>

      {/* Outer ring - white glow */}
      <mesh 
        geometry={outerRingGeometry} 
        position={[glitchOffset.x * 0.5, glitchOffset.y * 0.5, -0.08]}
      >
        <meshBasicMaterial color={whiteColor} transparent opacity={mainOpacity * 0.6} />
      </mesh>

      {/* RGB split layers */}
      <mesh 
        geometry={redGeometry} 
        position={[rgbOffset + 0.03, -rgbOffset, -0.06]}
      >
        <meshBasicMaterial color={redColor} transparent opacity={0.3} />
      </mesh>
      <mesh 
        geometry={blueGeometry} 
        position={[-rgbOffset - 0.03, rgbOffset, -0.06]}
      >
        <meshBasicMaterial color={blueColor} transparent opacity={0.3} />
      </mesh>

      {/* 4 Trigrams (건곤감리) */}
      {/* 건 (Geon/Heaven) - top-left */}
      <Trigram 
        pattern={trigrams.geon}
        position={[-trigramDistance * 0.7, trigramDistance * 0.7, 0]}
        rotation={trigramRotation}
        glitchOffset={{ x: glitchOffset.x * 0.8, y: glitchOffset.y * 0.8 }}
        color={blackColor}
        opacity={mainOpacity * 0.9}
      />
      
      {/* 리 (Ri/Fire) - top-right */}
      <Trigram 
        pattern={trigrams.ri}
        position={[trigramDistance * 0.7, trigramDistance * 0.7, 0]}
        rotation={-trigramRotation}
        glitchOffset={{ x: glitchOffset.x * 0.8, y: glitchOffset.y * 0.8 }}
        color={blackColor}
        opacity={mainOpacity * 0.9}
      />
      
      {/* 감 (Gam/Water) - bottom-left */}
      <Trigram 
        pattern={trigrams.gam}
        position={[-trigramDistance * 0.7, -trigramDistance * 0.7, 0]}
        rotation={-trigramRotation}
        glitchOffset={{ x: glitchOffset.x * 0.8, y: glitchOffset.y * 0.8 }}
        color={blackColor}
        opacity={mainOpacity * 0.9}
      />
      
      {/* 곤 (Gon/Earth) - bottom-right */}
      <Trigram 
        pattern={trigrams.gon}
        position={[trigramDistance * 0.7, -trigramDistance * 0.7, 0]}
        rotation={trigramRotation}
        glitchOffset={{ x: glitchOffset.x * 0.8, y: glitchOffset.y * 0.8 }}
        color={blackColor}
        opacity={mainOpacity * 0.9}
      />

      {/* Heavy glitch gold overlay */}
      {glitchState.isHeavy && (
        <>
          <mesh 
            geometry={redGeometry} 
            position={[(Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.4, -0.04]}
          >
            <meshBasicMaterial color={goldColor} transparent opacity={0.35} />
          </mesh>
          <mesh 
            geometry={blueGeometry} 
            position={[(Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.4, -0.04]}
          >
            <meshBasicMaterial color={whiteColor} transparent opacity={0.25} />
          </mesh>
        </>
      )}
    </group>
  );
};

interface Logo3DProps {
  className?: string;
  variant?: "logo" | "taegeuk";
}

const Logo3D = ({ className = "", variant = "logo" }: Logo3DProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        {variant === "taegeuk" ? (
          <>
            <pointLight position={[0, 0, 4]} intensity={0.4} color="#FFFFFF" />
            <pointLight position={[2, 1, 3]} intensity={0.3} color="#C60C30" />
            <pointLight position={[-2, -1, 3]} intensity={0.3} color="#003478" />
            <TaegeukHologram />
          </>
        ) : (
          <>
            <pointLight position={[0, 0, 4]} intensity={0.4} color="#00FFFF" />
            <pointLight position={[2, 2, 3]} intensity={0.2} color="#FF00FF" />
            <HologramLogo />
          </>
        )}
      </Canvas>
    </div>
  );
};

export default Logo3D;
