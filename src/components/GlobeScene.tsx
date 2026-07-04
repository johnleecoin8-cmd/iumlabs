import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Korea-first, Asia-wide — rendered as an actual globe. A dotted dark sphere with
 * glowing market nodes (Seoul is home) and arcs radiating out of Seoul to Tokyo,
 * Taipei, and Shanghai. Slowly rotating. The intuitive "we run Korea, we reach
 * across Asia" statement, in 3D instead of a flat map.
 */

const R = 1;
const BRAND = "#34d39a"; // home (Seoul)
const BLUE = "#5b9bff";  // reach

type City = { name: string; lat: number; lon: number; home?: boolean };
const CITIES: City[] = [
  { name: "Seoul", lat: 37.5, lon: 127.0, home: true },
  { name: "Tokyo", lat: 35.7, lon: 139.7 },
  { name: "Taipei", lat: 25.0, lon: 121.5 },
  { name: "Shanghai", lat: 31.2, lon: 121.5 },
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

// soft round sprite for the surface dots
function makeDotTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.45, "rgba(255,255,255,0.7)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

const Dots = () => {
  const geo = useMemo(() => {
    const N = 3000;
    const positions = new Float32Array(N * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rr = Math.sqrt(1 - y * y);
      const th = golden * i;
      positions[i * 3] = Math.cos(th) * rr * R;
      positions[i * 3 + 1] = y * R;
      positions[i * 3 + 2] = Math.sin(th) * rr * R;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);
  const tex = useMemo(makeDotTexture, []);
  return (
    <points geometry={geo}>
      <pointsMaterial
        size={0.028}
        map={tex}
        color="#8fc0ff"
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

const Marker = ({ city }: { city: City }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => latLonToVec3(city.lat, city.lon, R * 1.005), [city]);
  const color = city.home ? BRAND : BLUE;
  // orient the ring flat against the sphere surface
  const quat = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize());
    return q;
  }, [pos]);
  useFrame((state) => {
    if (ringRef.current) {
      const t = (state.clock.elapsedTime * (city.home ? 0.9 : 0.6)) % 1;
      const s = 1 + t * (city.home ? 3.2 : 2.4);
      ringRef.current.scale.setScalar(s);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.7;
    }
  });
  return (
    <group position={pos} quaternion={quat}>
      <mesh>
        <sphereGeometry args={[city.home ? 0.036 : 0.026, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      {/* soft glow halo on the node */}
      <mesh>
        <sphereGeometry args={[city.home ? 0.07 : 0.05, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.28} toneMapped={false} depthWrite={false} />
      </mesh>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.04, 0.058, 40]} />
        <meshBasicMaterial color={color} transparent opacity={0.75} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    </group>
  );
};

const Arc = ({ from, to }: { from: City; to: City }) => {
  const geo = useMemo(() => {
    const a = latLonToVec3(from.lat, from.lon, R);
    const b = latLonToVec3(to.lat, to.lon, R);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    const lift = 1 + a.distanceTo(b) * 0.42;
    const ctrl = mid.normalize().multiplyScalar(R * lift);
    const curve = new THREE.QuadraticBezierCurve3(a, ctrl, b);
    return new THREE.TubeGeometry(curve, 48, 0.0055, 8, false);
  }, [from, to]);
  return (
    <mesh geometry={geo}>
      <meshBasicMaterial color="#8fc0ff" transparent opacity={0.75} toneMapped={false} />
    </mesh>
  );
};

const GlobeGroup = ({ active }: { active: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const seoul = CITIES[0];
  // Rotate only while the section is on screen, so the user always arrives with
  // Asia (Seoul + arcs) facing front, then it slowly drifts.
  useFrame((_, delta) => {
    if (active && group.current) group.current.rotation.y += delta * 0.05;
  });
  return (
    <group ref={group} rotation={[0.28, 2.5, 0.16]}>
      {/* solid body occludes back-facing dots */}
      <mesh>
        <sphereGeometry args={[R * 0.985, 64, 64]} />
        <meshStandardMaterial color="#0c1730" emissive="#123057" emissiveIntensity={0.7} roughness={0.85} metalness={0.15} />
      </mesh>
      <Dots />
      {CITIES.filter((c) => !c.home).map((c) => (
        <Arc key={`arc-${c.name}`} from={seoul} to={c} />
      ))}
      {CITIES.map((c) => (
        <Marker key={c.name} city={c} />
      ))}
    </group>
  );
};

const Atmosphere = () => (
  <group>
    {/* tight bright rim */}
    <mesh>
      <sphereGeometry args={[R * 1.045, 48, 48]} />
      <meshBasicMaterial color="#6aa8ff" transparent opacity={0.22} side={THREE.BackSide} depthWrite={false} />
    </mesh>
    {/* soft outer halo */}
    <mesh>
      <sphereGeometry args={[R * 1.28, 48, 48]} />
      <meshBasicMaterial color={BLUE} transparent opacity={0.12} side={THREE.BackSide} depthWrite={false} />
    </mesh>
  </group>
);

const GlobeScene = ({ className = "" }: { className?: string }) => {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={wrap} className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3.05], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
        frameloop={active ? "always" : "demand"}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 2, 4]} intensity={1.1} />
        <Atmosphere />
        <GlobeGroup active={active} />
      </Canvas>
    </div>
  );
};

export default GlobeScene;
