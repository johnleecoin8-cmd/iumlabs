import { useRef, useMemo, Component, ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Error boundary for WebGL
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

/* ── Particle Network ─────────────────────────── */
const PARTICLE_COUNT = 120;
const SPREAD = 8;
const CONNECTION_DIST = 2.2;

const ParticleNetwork = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Generate initial positions
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * SPREAD * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
      pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD * 0.5;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return { positions: pos, velocities: vel };
  }, []);

  // Line geometry for connections
  const linePositions = useMemo(
    () => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6),
    []
  );
  const lineColors = useMemo(
    () => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6),
    []
  );

  // Track mouse
  const handlePointerMove = useMemo(
    () => (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    },
    []
  );

  useMemo(() => {
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [handlePointerMove]);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    // Move particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      arr[ix] += velocities[ix];
      arr[ix + 1] += velocities[ix + 1];
      arr[ix + 2] += velocities[ix + 2];

      // Mouse influence
      const dx = mouse.current.x * viewport.width * 0.5 - arr[ix];
      const dy = mouse.current.y * viewport.height * 0.5 - arr[ix + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        arr[ix] += dx * 0.002;
        arr[ix + 1] += dy * 0.002;
      }

      // Wrap around
      if (arr[ix] > SPREAD) arr[ix] = -SPREAD;
      if (arr[ix] < -SPREAD) arr[ix] = SPREAD;
      if (arr[ix + 1] > SPREAD * 0.5) arr[ix + 1] = -SPREAD * 0.5;
      if (arr[ix + 1] < -SPREAD * 0.5) arr[ix + 1] = SPREAD * 0.5;
    }
    posAttr.needsUpdate = true;

    // Build connections
    let lineIdx = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = arr[i * 3] - arr[j * 3];
        const dy = arr[i * 3 + 1] - arr[j * 3 + 1];
        const dz = arr[i * 3 + 2] - arr[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < CONNECTION_DIST) {
          const alpha = 1 - d / CONNECTION_DIST;
          linePositions[lineIdx * 6] = arr[i * 3];
          linePositions[lineIdx * 6 + 1] = arr[i * 3 + 1];
          linePositions[lineIdx * 6 + 2] = arr[i * 3 + 2];
          linePositions[lineIdx * 6 + 3] = arr[j * 3];
          linePositions[lineIdx * 6 + 4] = arr[j * 3 + 1];
          linePositions[lineIdx * 6 + 5] = arr[j * 3 + 2];
          const c = alpha * 0.15;
          lineColors[lineIdx * 6] = c;
          lineColors[lineIdx * 6 + 1] = c;
          lineColors[lineIdx * 6 + 2] = c * 1.5;
          lineColors[lineIdx * 6 + 3] = c;
          lineColors[lineIdx * 6 + 4] = c;
          lineColors[lineIdx * 6 + 5] = c * 1.5;
          lineIdx++;
        }
      }
    }

    const lineGeo = linesRef.current.geometry;
    const lPos = lineGeo.attributes.position as THREE.BufferAttribute;
    const lCol = lineGeo.attributes.color as THREE.BufferAttribute;
    (lPos.array as Float32Array).set(linePositions.subarray(0, lineIdx * 6));
    (lCol.array as Float32Array).set(lineColors.subarray(0, lineIdx * 6));
    lineGeo.setDrawRange(0, lineIdx * 2);
    lPos.needsUpdate = true;
    lCol.needsUpdate = true;

    // Gentle global rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    linesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#ffffff"
          transparent
          opacity={0.4}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT * PARTICLE_COUNT}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={PARTICLE_COUNT * PARTICLE_COUNT}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.6} depthWrite={false} />
      </lineSegments>
    </group>
  );
};

/* ── Canvas Wrapper ───────────────────────────── */
const HeroCanvas = () => {
  return (
    <WebGLErrorBoundary fallback={<div className="absolute inset-0 bg-black" />}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}
      >
        <ParticleNetwork />
      </Canvas>
    </WebGLErrorBoundary>
  );
};

export default HeroCanvas;
