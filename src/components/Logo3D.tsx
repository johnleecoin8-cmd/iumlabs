import { useMemo, useState, useEffect, Suspense, Component, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

// Error boundary to catch WebGL context issues
class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('WebGL Error:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface HologramLogoProps {
  immediate?: boolean;
}

const HologramLogo = ({ immediate = false }: HologramLogoProps) => {
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
    const triggerGlitch = (forceHeavy = false) => {
      // Immediate mode: 40% heavy glitch, normal: 8%
      const isHeavy = forceHeavy || (immediate ? Math.random() < 0.4 : Math.random() < 0.08);
      
      // Stronger effects for immediate mode
      const intensity = immediate ? 1.5 : 1;
      const baseOffsetX = (isHeavy ? 1.2 : 0.8) * intensity;
      const baseOffsetY = (isHeavy ? 0.8 : 0.5) * intensity;
      const baseRgbSplit = (isHeavy ? 0.6 : 0.4) * intensity;
      
      setGlitchState({
        active: true,
        offsetX: (Math.random() - 0.5) * baseOffsetX,
        offsetY: (Math.random() - 0.5) * baseOffsetY,
        rgbSplit: Math.random() * baseRgbSplit + 0.15,
        scaleX: isHeavy ? 0.9 + Math.random() * 0.2 : 0.95 + Math.random() * 0.1,
        opacity: isHeavy ? 0.3 + Math.random() * 0.7 : 0.5 + Math.random() * 0.5,
        isHeavy,
      });

      // More glitches in immediate mode: 4-8 times, normal: 2-4
      const glitchCount = immediate ? Math.floor(Math.random() * 5) + 4 : Math.floor(Math.random() * 3) + 2;
      let count = 0;
      
      // Faster interval in immediate mode
      const intervalTime = immediate ? 25 + Math.random() * 40 : 35 + Math.random() * 60;
      
      const rapidGlitch = setInterval(() => {
        count++;
        if (count < glitchCount) {
          const flickerHeavy = immediate ? Math.random() < 0.3 : Math.random() < 0.15;
          setGlitchState({
            active: true,
            offsetX: (Math.random() - 0.5) * (flickerHeavy ? 1.5 : 0.7) * intensity,
            offsetY: (Math.random() - 0.5) * (flickerHeavy ? 1.0 : 0.4) * intensity,
            rgbSplit: Math.random() * (flickerHeavy ? 0.8 : 0.5) * intensity + 0.1,
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
      }, intervalTime);
    };

    if (immediate) {
      // Immediate mode: trigger glitch right away and rapidly
      triggerGlitch(true);
      const rapidInterval = setInterval(() => triggerGlitch(), 120 + Math.random() * 80);
      return () => clearInterval(rapidInterval);
    }

    // Normal mode: less frequent, 3-6 seconds
    const glitchInterval = setInterval(() => {
      triggerGlitch();
    }, 3000 + Math.random() * 3000);

    setTimeout(triggerGlitch, 1500);

    return () => clearInterval(glitchInterval);
  }, [immediate]);

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

interface Logo3DProps {
  className?: string;
  immediate?: boolean;
}

const Logo3D = ({ className = "", immediate = false }: Logo3DProps) => {
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  useEffect(() => {
    // Check WebGL support on mount
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setIsWebGLSupported(false);
      }
    } catch {
      setIsWebGLSupported(false);
    }
  }, []);

  // Fallback component when WebGL is not available
  const Fallback = (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <div className="text-cyan-400/50 text-xs">⬢</div>
    </div>
  );

  if (!isWebGLSupported) {
    return Fallback;
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <WebGLErrorBoundary fallback={Fallback}>
        <Suspense fallback={Fallback}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 38 }}
            gl={{ 
              antialias: true, 
              alpha: true,
              failIfMajorPerformanceCaveat: true,
              powerPreference: "low-power"
            }}
            style={{ background: "transparent" }}
            onCreated={({ gl }) => {
              gl.domElement.addEventListener('webglcontextlost', (e) => {
                e.preventDefault();
                console.warn('WebGL context lost');
              }, false);
            }}
          >
            <ambientLight intensity={0.3} />
            <pointLight position={[0, 0, 4]} intensity={0.4} color="#00FFFF" />
            <pointLight position={[2, 2, 3]} intensity={0.2} color="#FF00FF" />
            <HologramLogo immediate={immediate} />
          </Canvas>
        </Suspense>
      </WebGLErrorBoundary>
    </div>
  );
};

export default Logo3D;
