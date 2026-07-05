import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import earthTextureUrl from "@/assets/backgrounds/earth-texture.jpg";

/**
 * Korea-first, Asia-wide — a textured Earth (NASA blue marble). Only the top of
 * the globe shows (it sits low, like an earth horizon); no atmosphere haze.
 * Dashed connection lines start at Seoul and reach out to other countries and
 * continents, animating outward.
 */

const R = 1;
const BRAND = "#34d39a";
const BLUE = "#7fb2ff";

type Place = { name: string; lat: number; lon: number };
const SEOUL: Place = { name: "Seoul", lat: 37.5, lon: 127.0 };
// Destinations across countries and continents that Seoul connects out to.
const DESTS: Place[] = [
  { name: "Tokyo", lat: 35.7, lon: 139.7 },
  { name: "Shanghai", lat: 31.2, lon: 121.5 },
  { name: "Taipei", lat: 25.0, lon: 121.5 },
  { name: "Singapore", lat: 1.35, lon: 103.8 },
  { name: "Dubai", lat: 25.2, lon: 55.3 },
  { name: "London", lat: 51.5, lon: -0.13 },
  { name: "New York", lat: 40.7, lon: -74.0 },
  { name: "San Francisco", lat: 37.8, lon: -122.4 },
];

function latLonToVec3(lat: number, lon: number, r = R) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

const Node = ({ place, home = false }: { place: Place; home?: boolean }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => latLonToVec3(place.lat, place.lon, R * 1.01), [place]);
  const color = home ? BRAND : BLUE;
  const quat = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize());
    return q;
  }, [pos]);
  useFrame((state) => {
    if (ringRef.current) {
      const t = (state.clock.elapsedTime * (home ? 0.9 : 0.55) + (home ? 0 : place.lon)) % 1;
      ringRef.current.scale.setScalar(1 + t * (home ? 3.2 : 2.2));
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * (home ? 0.8 : 0.55);
    }
  });
  return (
    <group position={pos} quaternion={quat}>
      <mesh>
        <sphereGeometry args={[home ? 0.03 : 0.017, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh ref={ringRef}>
        <ringGeometry args={[home ? 0.04 : 0.026, home ? 0.056 : 0.038, 40]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    </group>
  );
};

const DashedArc = ({ to, delay }: { to: Place; delay: number }) => {
  const ref = useRef<any>(null);
  const points = useMemo(() => {
    const a = latLonToVec3(SEOUL.lat, SEOUL.lon, R * 1.008);
    const b = latLonToVec3(to.lat, to.lon, R * 1.008);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    const lift = 1 + a.distanceTo(b) * 0.5;
    const ctrl = mid.normalize().multiplyScalar(R * lift);
    return new THREE.QuadraticBezierCurve3(a, ctrl, b).getPoints(64);
  }, [to]);
  useFrame((_, d) => {
    if (ref.current?.material) ref.current.material.dashOffset -= d * 0.4;
  });
  return (
    <Line
      ref={ref}
      points={points}
      color={BLUE}
      lineWidth={1.1}
      transparent
      opacity={0.8}
      dashed
      dashSize={0.06}
      gapSize={0.045}
      dashOffset={delay}
    />
  );
};

const GlobeGroup = ({ active }: { active: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const tex = useLoader(THREE.TextureLoader, earthTextureUrl);
  tex.colorSpace = THREE.SRGBColorSpace;
  useFrame((_, delta) => {
    if (active && group.current) group.current.rotation.y += delta * 0.035;
  });
  return (
    <group ref={group} rotation={[0.12, 2.5, 0]}>
      <mesh>
        <sphereGeometry args={[R, 64, 64]} />
        <meshStandardMaterial map={tex} roughness={0.85} metalness={0.12} emissive="#0a1524" emissiveIntensity={0.28} />
      </mesh>
      {DESTS.map((d, i) => (
        <DashedArc key={`arc-${d.name}`} to={d} delay={i * 0.3} />
      ))}
      {DESTS.map((d) => (
        <Node key={d.name} place={d} />
      ))}
      <Node place={SEOUL} home />
    </group>
  );
};

const GlobeScene = ({ className = "" }: { className?: string }) => {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={wrap} className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3.1], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
        frameloop={active ? "always" : "demand"}
      >
        <ambientLight intensity={0.95} />
        <directionalLight position={[3, 1.5, 3]} intensity={1.6} />
        <Suspense fallback={null}>
          <GlobeGroup active={active} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GlobeScene;
