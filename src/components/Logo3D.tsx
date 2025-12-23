import { useMemo, useState, useEffect, useRef } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Line } from "@react-three/drei";
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

// Taegeuk (Korean flag symbol) hologram component
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
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  // Glitch trigger
  useEffect(() => {
    const triggerGlitch = () => {
      const isHeavy = Math.random() < 0.1;
      const colorSwap = Math.random() < 0.3;
      
      setGlitchState({
        active: true,
        offsetX: (Math.random() - 0.5) * 0.6,
        offsetY: (Math.random() - 0.5) * 0.4,
        rgbSplit: Math.random() * 0.4 + 0.1,
        scaleX: 0.95 + Math.random() * 0.1,
        opacity: 0.5 + Math.random() * 0.5,
        isHeavy,
        colorSwap,
      });

      const glitchCount = Math.floor(Math.random() * 5) + 2;
      let count = 0;
      
      const rapidGlitch = setInterval(() => {
        count++;
        if (count < glitchCount) {
          setGlitchState({
            active: true,
            offsetX: (Math.random() - 0.5) * 0.5,
            offsetY: (Math.random() - 0.5) * 0.3,
            rgbSplit: Math.random() * 0.5 + 0.1,
            scaleX: 0.92 + Math.random() * 0.16,
            opacity: 0.4 + Math.random() * 0.6,
            isHeavy: Math.random() < 0.15,
            colorSwap: Math.random() < 0.4,
          });
        } else {
          clearInterval(rapidGlitch);
          setTimeout(() => {
            setGlitchState({ active: false, offsetX: 0, offsetY: 0, rgbSplit: 0, scaleX: 1, opacity: 1, isHeavy: false, colorSwap: false });
          }, 40 + Math.random() * 60);
        }
      }, 40 + Math.random() * 50);
    };

    const glitchInterval = setInterval(() => {
      triggerGlitch();
    }, 1500 + Math.random() * 2000);

    setTimeout(triggerGlitch, 800);

    return () => clearInterval(glitchInterval);
  }, []);

  // Create Taegeuk points
  const { outerCirclePoints, sCurvePoints, topDotPoints, bottomDotPoints } = useMemo(() => {
    const radius = 1.8;
    const segments = 64;
    
    // Outer circle points
    const circlePoints: [number, number, number][] = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      circlePoints.push([Math.cos(angle) * radius, Math.sin(angle) * radius, 0]);
    }
    
    // S-curve points
    const sPoints: [number, number, number][] = [];
    for (let i = 0; i <= 32; i++) {
      const t = i / 32;
      const y = (t - 0.5) * radius * 2;
      const x = Math.sin(t * Math.PI) * (radius / 2);
      sPoints.push([x, y, 0]);
    }
    
    // Top dot points
    const topPoints: [number, number, number][] = [];
    for (let i = 0; i <= 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      topPoints.push([Math.cos(angle) * (radius / 4), Math.sin(angle) * (radius / 4) + radius / 2, 0]);
    }
    
    // Bottom dot points
    const bottomPoints: [number, number, number][] = [];
    for (let i = 0; i <= 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      bottomPoints.push([Math.cos(angle) * (radius / 4), Math.sin(angle) * (radius / 4) - radius / 2, 0]);
    }
    
    return { outerCirclePoints: circlePoints, sCurvePoints: sPoints, topDotPoints: topPoints, bottomDotPoints: bottomPoints };
  }, []);

  // Korean flag colors
  const redColor = "#C60C30";
  const blueColor = "#003478";
  const whiteColor = "#FFFFFF";
  const goldColor = "#FFD700";

  const topColor = glitchState.colorSwap ? redColor : blueColor;
  const bottomColor = glitchState.colorSwap ? blueColor : redColor;

  const offsetCircle = (points: [number, number, number][], ox: number, oy: number, oz: number): [number, number, number][] => {
    return points.map(([x, y, z]) => [x + ox, y + oy, z + oz]);
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[glitchState.scaleX, 1, 1]}>
      {/* Main outer circle - white */}
      <Line
        points={offsetCircle(outerCirclePoints, glitchState.active ? glitchState.offsetX : 0, glitchState.active ? glitchState.offsetY : 0, 0)}
        color={whiteColor}
        lineWidth={2}
        transparent
        opacity={glitchState.active ? glitchState.opacity * 0.9 : 0.85}
      />

      {/* RGB split - red layer */}
      <Line
        points={offsetCircle(outerCirclePoints, glitchState.active ? glitchState.rgbSplit * 0.5 : 0.02, glitchState.active ? -glitchState.rgbSplit * 0.3 : 0, -0.01)}
        color={redColor}
        lineWidth={1}
        transparent
        opacity={glitchState.active ? 0.6 : 0.4}
      />

      {/* RGB split - blue layer */}
      <Line
        points={offsetCircle(outerCirclePoints, glitchState.active ? -glitchState.rgbSplit * 0.5 : -0.02, glitchState.active ? glitchState.rgbSplit * 0.3 : 0, -0.02)}
        color={blueColor}
        lineWidth={1}
        transparent
        opacity={glitchState.active ? 0.6 : 0.4}
      />

      {/* S-curve divider */}
      <Line
        points={offsetCircle(sCurvePoints, glitchState.active ? glitchState.offsetX * 0.5 : 0, glitchState.active ? glitchState.offsetY * 0.5 : 0, 0.01)}
        color={whiteColor}
        lineWidth={2}
        transparent
        opacity={glitchState.active ? glitchState.opacity : 0.7}
      />

      {/* Top dot (Yin - blue area) */}
      <Line
        points={offsetCircle(topDotPoints, glitchState.active ? glitchState.offsetX * 0.7 : 0, glitchState.active ? glitchState.offsetY * 0.7 : 0, 0.02)}
        color={topColor}
        lineWidth={2}
        transparent
        opacity={glitchState.active ? glitchState.opacity * 0.95 : 0.9}
      />

      {/* Bottom dot (Yang - red area) */}
      <Line
        points={offsetCircle(bottomDotPoints, glitchState.active ? glitchState.offsetX * 0.7 : 0, glitchState.active ? glitchState.offsetY * 0.7 : 0, 0.02)}
        color={bottomColor}
        lineWidth={2}
        transparent
        opacity={glitchState.active ? glitchState.opacity * 0.95 : 0.9}
      />

      {/* Glitch gold layer during heavy glitch */}
      {glitchState.isHeavy && (
        <>
          <Line
            points={offsetCircle(outerCirclePoints, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.5, -0.03)}
            color={goldColor}
            lineWidth={1}
            transparent
            opacity={0.4 + Math.random() * 0.3}
          />
          <Line
            points={offsetCircle(sCurvePoints, (Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.4, 0.03)}
            color={goldColor}
            lineWidth={1}
            transparent
            opacity={0.5 + Math.random() * 0.3}
          />
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
