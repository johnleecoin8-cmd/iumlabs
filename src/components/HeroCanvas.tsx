import { useRef, useMemo, Component, ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ── Error Boundary ──────────────────────────── */
class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/* ── Glowing Orb ─────────────────────────────── */
const GlowOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useMemo(() => {
    const handler = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.3 + mouse.current.y * 0.15;
      meshRef.current.rotation.y = t * 0.08 + mouse.current.x * 0.15;
      meshRef.current.rotation.z = Math.cos(t * 0.15) * 0.1;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = Math.sin(t * 0.2) * 0.3 + mouse.current.y * 0.15;
      wireRef.current.rotation.y = t * 0.08 + mouse.current.x * 0.15;
      wireRef.current.rotation.z = Math.cos(t * 0.15) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <group position={[1.5, 0.2, 0]}>
        {/* Solid inner orb — emissive for bloom pickup */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.4, 3]} />
          <meshStandardMaterial
            color="#1a3a8a"
            emissive="#2050cc"
            emissiveIntensity={1.8}
            toneMapped={false}
            roughness={0.15}
            metalness={0.95}
            transparent
            opacity={0.25}
          />
        </mesh>

        {/* Wireframe overlay */}
        <mesh ref={wireRef}>
          <icosahedronGeometry args={[1.42, 3]} />
          <meshStandardMaterial
            color="#4080ff"
            emissive="#4080ff"
            emissiveIntensity={2.5}
            toneMapped={false}
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Outer glow ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.8, 2.0, 64]} />
          <meshStandardMaterial
            color="#3060dd"
            emissive="#3060dd"
            emissiveIntensity={2}
            toneMapped={false}
            transparent
            opacity={0.08}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
};

/* ── Floating Particles ──────────────────────── */
const ParticleField = ({ count = 800 }: { count?: number }) => {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 25;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

/* ── Scene ────────────────────────────────────── */
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#4080ff" />
      <pointLight position={[-5, -3, 3]} intensity={0.3} color="#2050aa" />

      <GlowOrb />
      <ParticleField />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
          intensity={1.2}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
};

/* ── Canvas Wrapper ───────────────────────────── */
const HeroCanvas = () => {
  return (
    <WebGLErrorBoundary fallback={<div className="absolute inset-0 bg-black" />}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <Scene />
      </Canvas>
    </WebGLErrorBoundary>
  );
};

export default HeroCanvas;
