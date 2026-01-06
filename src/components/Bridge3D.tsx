import { useRef, useMemo, Suspense, Component, ReactNode, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Error boundary for WebGL issues
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

interface BridgeMeshProps {
  glitchState: {
    active: boolean;
    offsetX: number;
    offsetY: number;
    rgbSplit: number;
    scaleX: number;
    opacity: number;
    isHeavy: boolean;
  };
}

const BridgeMesh = ({ glitchState }: BridgeMeshProps) => {
  const groupRef = useRef<THREE.Group>(null);

  // Slow rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  // Create bridge geometry
  const { mainEdges, innerEdges } = useMemo(() => {
    const shape = new THREE.Shape();
    
    const w = 4.2;
    const h = 2.0;
    const r = 0.12;
    const sideCurve = 0.3;
    const pillarWidth = 0.8;
    const archRadius = (w - pillarWidth * 2) / 2;
    
    shape.moveTo(-w/2 + r, h);
    shape.lineTo(w/2 - r, h);
    shape.quadraticCurveTo(w/2, h, w/2, h - r);
    shape.quadraticCurveTo(w/2 - sideCurve, h/2, w/2, r);
    shape.quadraticCurveTo(w/2, 0, w/2 - r, 0);
    shape.lineTo(w/2 - pillarWidth, 0);
    shape.absarc(0, 0, archRadius, 0, Math.PI, false);
    shape.lineTo(-w/2 + r, 0);
    shape.quadraticCurveTo(-w/2, 0, -w/2, r);
    shape.quadraticCurveTo(-w/2 + sideCurve, h/2, -w/2, h - r);
    shape.quadraticCurveTo(-w/2, h, -w/2 + r, h);
    
    const extrudeSettings = {
      steps: 1,
      depth: 0.35,
      bevelEnabled: false,
    };
    
    const mainGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const mainEdgesGeom = new THREE.EdgesGeometry(mainGeometry, 15);
    
    const innerSettings = { ...extrudeSettings, depth: 0.2 };
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
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <group 
        ref={groupRef} 
        position={[0, -0.5, 0]} 
        scale={[glitchState.scaleX * 1.2, 1.2, 1.2]}
      >
        {/* Main cyan wireframe */}
        <lineSegments 
          geometry={mainEdges} 
          position={[
            glitchState.active ? glitchState.offsetX : 0, 
            glitchState.active ? glitchState.offsetY : 0, 
            -0.175
          ]}
        >
          <lineBasicMaterial 
            color={cyanColor} 
            transparent 
            opacity={glitchState.active ? glitchState.opacity * 0.95 : 0.95}
            linewidth={2}
          />
        </lineSegments>

        {/* Magenta RGB split layer */}
        <lineSegments 
          geometry={mainEdges} 
          position={[
            glitchState.active ? glitchState.rgbSplit * 0.9 + 0.06 : 0.03, 
            glitchState.active ? -glitchState.rgbSplit * 0.7 : 0.015, 
            -0.18
          ]}
        >
          <lineBasicMaterial 
            color={magentaColor} 
            transparent 
            opacity={glitchState.active ? 0.55 + Math.random() * 0.35 : 0.55}
            linewidth={1}
          />
        </lineSegments>

        {/* Yellow/Green layer during glitch */}
        {glitchState.active && (
          <lineSegments 
            geometry={mainEdges} 
            position={[
              -glitchState.rgbSplit * 0.8 - 0.05, 
              glitchState.rgbSplit * 0.5, 
              -0.185
            ]}
          >
            <lineBasicMaterial 
              color={glitchState.isHeavy ? yellowColor : greenColor} 
              transparent 
              opacity={glitchState.isHeavy ? 0.65 : 0.4}
              linewidth={1}
            />
          </lineSegments>
        )}

        {/* White highlight layer */}
        <lineSegments 
          geometry={innerEdges} 
          position={[
            glitchState.active ? -glitchState.offsetX * 0.8 : 0, 
            glitchState.active ? glitchState.offsetY * 0.6 : 0, 
            -0.1
          ]}
        >
          <lineBasicMaterial 
            color={whiteColor} 
            transparent 
            opacity={glitchState.active ? 0.35 + Math.random() * 0.35 : 0.3}
            linewidth={1}
          />
        </lineSegments>

        {/* Extra glitch layer during heavy glitch */}
        {glitchState.isHeavy && (
          <lineSegments 
            geometry={mainEdges} 
            position={[
              (Math.random() - 0.5) * 1.4, 
              (Math.random() - 0.5) * 0.9, 
              -0.19
            ]}
          >
            <lineBasicMaterial 
              color={cyanColor} 
              transparent 
              opacity={0.35 + Math.random() * 0.3}
              linewidth={1}
            />
          </lineSegments>
        )}
      </group>
    </Float>
  );
};

// Floating particles around the bridge
const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const count = 100;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial
        color="#00FFFF"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

interface Bridge3DProps {
  className?: string;
}

const Bridge3D = ({ className = "" }: Bridge3DProps) => {
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const [glitchState, setGlitchState] = useState({
    active: false,
    offsetX: 0,
    offsetY: 0,
    rgbSplit: 0,
    scaleX: 1,
    opacity: 1,
    isHeavy: false,
  });

  // WebGL support check
  useEffect(() => {
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

  // Glitch effect
  useEffect(() => {
    const triggerGlitch = () => {
      const isHeavy = Math.random() < 0.1;
      
      const baseOffsetX = isHeavy ? 1.4 : 0.9;
      const baseOffsetY = isHeavy ? 0.9 : 0.6;
      const baseRgbSplit = isHeavy ? 0.7 : 0.45;
      
      setGlitchState({
        active: true,
        offsetX: (Math.random() - 0.5) * baseOffsetX,
        offsetY: (Math.random() - 0.5) * baseOffsetY,
        rgbSplit: Math.random() * baseRgbSplit + 0.2,
        scaleX: isHeavy ? 0.88 + Math.random() * 0.24 : 0.94 + Math.random() * 0.12,
        opacity: isHeavy ? 0.25 + Math.random() * 0.75 : 0.45 + Math.random() * 0.55,
        isHeavy,
      });

      const glitchCount = Math.floor(Math.random() * 3) + 2;
      let count = 0;
      
      const rapidGlitch = setInterval(() => {
        count++;
        if (count < glitchCount) {
          const flickerHeavy = Math.random() < 0.2;
          setGlitchState({
            active: true,
            offsetX: (Math.random() - 0.5) * (flickerHeavy ? 1.6 : 0.8),
            offsetY: (Math.random() - 0.5) * (flickerHeavy ? 1.1 : 0.5),
            rgbSplit: Math.random() * (flickerHeavy ? 0.9 : 0.55) + 0.15,
            scaleX: flickerHeavy ? 0.83 + Math.random() * 0.34 : 0.91 + Math.random() * 0.18,
            opacity: flickerHeavy ? 0.08 + Math.random() * 0.92 : 0.38 + Math.random() * 0.62,
            isHeavy: flickerHeavy,
          });
        } else {
          clearInterval(rapidGlitch);
          setTimeout(() => {
            setGlitchState({ 
              active: false, 
              offsetX: 0, 
              offsetY: 0, 
              rgbSplit: 0, 
              scaleX: 1, 
              opacity: 1, 
              isHeavy: false 
            });
          }, 40 + Math.random() * 80);
        }
      }, 40 + Math.random() * 70);
    };

    const glitchInterval = setInterval(() => {
      triggerGlitch();
    }, 4000 + Math.random() * 4000);

    setTimeout(triggerGlitch, 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  const Fallback = (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <div className="text-cyan-400/30 text-6xl font-light">⬢</div>
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
            <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={40} />
            <ambientLight intensity={0.4} />
            <pointLight position={[0, 0, 5]} intensity={0.5} color="#00FFFF" />
            <pointLight position={[3, 2, 4]} intensity={0.3} color="#FF00FF" />
            <pointLight position={[-3, -2, 4]} intensity={0.2} color="#00FF88" />
            <FloatingParticles />
            <BridgeMesh glitchState={glitchState} />
          </Canvas>
        </Suspense>
      </WebGLErrorBoundary>
    </div>
  );
};

export default Bridge3D;