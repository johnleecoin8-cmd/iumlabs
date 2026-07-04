import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import earthTextureUrl from "@/assets/backgrounds/earth-texture.jpg";

/**
 * Korea-first, Asia-wide — a real textured Earth globe (NASA blue marble). Seoul
 * is the home node, with glowing markers on Tokyo, Taipei, Shanghai. Starts
 * facing East Asia, rotates slowly only while the section is on screen.
 */

const R = 1;
const BRAND = "#34d39a";
const BLUE = "#5b9bff";

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

const Marker = ({ city }: { city: City }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => latLonToVec3(city.lat, city.lon, R * 1.01), [city]);
  const color = city.home ? BRAND : BLUE;
  const quat = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize());
    return q;
  }, [pos]);
  useFrame((state) => {
    if (ringRef.current) {
      const t = (state.clock.elapsedTime * (city.home ? 0.9 : 0.6)) % 1;
      ringRef.current.scale.setScalar(1 + t * (city.home ? 3.4 : 2.6));
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.75;
    }
  });
  return (
    <group position={pos} quaternion={quat}>
      <mesh>
        <sphereGeometry args={[city.home ? 0.032 : 0.022, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[city.home ? 0.07 : 0.05, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} toneMapped={false} depthWrite={false} />
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
    const lift = 1 + a.distanceTo(b) * 0.45;
    const ctrl = mid.normalize().multiplyScalar(R * lift);
    const curve = new THREE.QuadraticBezierCurve3(a, ctrl, b);
    return new THREE.TubeGeometry(curve, 48, 0.005, 8, false);
  }, [from, to]);
  return (
    <mesh geometry={geo}>
      <meshBasicMaterial color="#8fc0ff" transparent opacity={0.75} toneMapped={false} />
    </mesh>
  );
};

const GlobeGroup = ({ active }: { active: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const tex = useLoader(THREE.TextureLoader, earthTextureUrl);
  tex.colorSpace = THREE.SRGBColorSpace;
  const seoul = CITIES[0];
  useFrame((_, delta) => {
    if (active && group.current) group.current.rotation.y += delta * 0.05;
  });
  return (
    <group ref={group} rotation={[0.32, 2.5, 0.16]}>
      <mesh>
        <sphereGeometry args={[R, 64, 64]} />
        <meshStandardMaterial map={tex} roughness={0.82} metalness={0.15} emissive="#0a1830" emissiveIntensity={0.35} />
      </mesh>
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
    <mesh>
      <sphereGeometry args={[R * 1.04, 48, 48]} />
      <meshBasicMaterial color="#6aa8ff" transparent opacity={0.2} side={THREE.BackSide} depthWrite={false} />
    </mesh>
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
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 1.5, 3]} intensity={1.6} />
        <Atmosphere />
        <Suspense fallback={null}>
          <GlobeGroup active={active} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GlobeScene;
