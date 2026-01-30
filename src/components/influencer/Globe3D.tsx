import React, { useRef, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';
import KOLDetailPanel from './KOLDetailPanel';

export interface KOL {
  name: string;
  handle: string;
  followers: string;
  expertise: string;
  platform: string;
  country?: string;
}

interface Globe3DProps {
  kols: KOL[];
  accentColor?: string;
}

// 위도/경도 → 3D 좌표 변환
const latLngToVector3 = (lat: number, lng: number, radius: number = 1.02): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  return new THREE.Vector3(x, y, z);
};

// 국가별 좌표 (위도, 경도)
const COUNTRY_COORDS: Record<string, { lat: number; lng: number; name: string }> = {
  KR: { lat: 37.5, lng: 127, name: '한국' },
  JP: { lat: 36, lng: 138, name: '일본' },
  CN: { lat: 35, lng: 105, name: '중국' },
  TW: { lat: 25, lng: 121, name: '대만' },
  HK: { lat: 22, lng: 114, name: '홍콩' },
  SG: { lat: 1.3, lng: 103.8, name: '싱가포르' },
  VN: { lat: 16, lng: 108, name: '베트남' },
  TH: { lat: 14, lng: 100, name: '태국' },
  MY: { lat: 3, lng: 102, name: '말레이시아' },
  ID: { lat: -6, lng: 107, name: '인도네시아' },
  PH: { lat: 14.5, lng: 121, name: '필리핀' },
  IN: { lat: 20, lng: 77, name: '인도' },
  AE: { lat: 24, lng: 54, name: 'UAE' },
};

// 국가 마커 컴포넌트
interface CountryMarkerProps {
  countryCode: string;
  position: THREE.Vector3;
  kolCount: number;
  isSelected: boolean;
  isHovered: boolean;
  accentColor: string;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
}

const CountryMarker: React.FC<CountryMarkerProps> = ({
  countryCode,
  position,
  kolCount,
  isSelected,
  isHovered,
  accentColor,
  onClick,
  onHover,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const scale = isHovered || isSelected ? 1.3 : 1;
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <group position={position}>
      {/* 글로우 링 */}
      {(isHovered || isSelected) && (
        <mesh>
          <ringGeometry args={[0.04, 0.06, 32]} />
          <meshBasicMaterial 
            color={accentColor} 
            transparent 
            opacity={0.5} 
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      
      {/* 마커 구체 */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          onHover(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          onHover(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial 
          color={isSelected ? accentColor : isHovered ? accentColor : '#ffffff'} 
        />
      </mesh>

      {/* HTML 라벨 */}
      <Html
        position={[0, 0.06, 0]}
        center
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div 
          className="flex flex-col items-center gap-0.5"
          style={{ 
            opacity: isHovered || isSelected ? 1 : 0.7,
            transform: `scale(${isHovered || isSelected ? 1.1 : 1})`,
            transition: 'all 0.2s ease',
          }}
        >
          <span 
            className="text-[10px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded"
            style={{ 
              border: `1px solid ${isHovered || isSelected ? accentColor : 'rgba(255,255,255,0.3)'}`,
            }}
          >
            {countryCode}
          </span>
          <span 
            className="text-[8px] font-mono px-1 py-0.5 rounded"
            style={{ 
              background: accentColor,
              color: '#000',
            }}
          >
            {kolCount}
          </span>
        </div>
      </Html>
    </group>
  );
};

// 연결선 컴포넌트
const ConnectionLines: React.FC<{
  nodes: { code: string; position: THREE.Vector3 }[];
  selectedCountry: string | null;
  accentColor: string;
}> = ({ nodes, selectedCountry, accentColor }) => {
  const linesRef = useRef<THREE.Group>(null);
  
  return (
    <group ref={linesRef}>
      {nodes.map((node, i) =>
        nodes.slice(i + 1).map((target, j) => {
          const distance = node.position.distanceTo(target.position);
          if (distance > 0.8) return null;

          const isHighlighted = selectedCountry === node.code || selectedCountry === target.code;
          const midPoint = new THREE.Vector3()
            .addVectors(node.position, target.position)
            .multiplyScalar(0.5)
            .multiplyScalar(1.1);

          const curve = new THREE.QuadraticBezierCurve3(
            node.position,
            midPoint,
            target.position
          );
          const points = curve.getPoints(20);

          return (
            <line key={`${i}-${j}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={points.length}
                  array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color={accentColor}
                transparent
                opacity={isHighlighted ? 0.6 : 0.15}
                linewidth={1}
              />
            </line>
          );
        })
      )}
    </group>
  );
};

// 지구본 메쉬
const GlobeMesh: React.FC<{
  isAutoRotating: boolean;
}> = ({ isAutoRotating }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current && isAutoRotating) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <meshBasicMaterial
        color="#0a0a0a"
        wireframe
        transparent
        opacity={0.3}
      />
    </Sphere>
  );
};

// 카메라 컨트롤러
const CameraController: React.FC<{
  targetPosition: THREE.Vector3 | null;
  isZoomed: boolean;
  controlsRef: React.RefObject<any>;
}> = ({ targetPosition, isZoomed, controlsRef }) => {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(2, 1, 2));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  
  useFrame(() => {
    if (isZoomed && targetPosition) {
      // 확대 시 카메라를 해당 국가 방향으로 이동
      const direction = targetPosition.clone().normalize();
      targetCamPos.current.copy(direction.multiplyScalar(2.5));
      targetLookAt.current.copy(targetPosition.clone().multiplyScalar(0.3));
    } else {
      // 기본 뷰 (아시아 중심)
      targetCamPos.current.set(2, 0.8, 1.5);
      targetLookAt.current.set(0, 0, 0);
    }
    
    camera.position.lerp(targetCamPos.current, 0.05);
    
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAt.current, 0.05);
    }
  });
  
  return null;
};

// 메인 씬 컴포넌트
const GlobeScene: React.FC<{
  kolsByCountry: Record<string, KOL[]>;
  selectedCountry: string | null;
  hoveredCountry: string | null;
  accentColor: string;
  onCountryClick: (code: string | null) => void;
  onCountryHover: (code: string | null) => void;
}> = ({ kolsByCountry, selectedCountry, hoveredCountry, accentColor, onCountryClick, onCountryHover }) => {
  const controlsRef = useRef<any>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // 국가 노드 생성
  const countryNodes = Object.entries(kolsByCountry).map(([code, kols]) => {
    const coords = COUNTRY_COORDS[code] || COUNTRY_COORDS.KR;
    const position = latLngToVector3(coords.lat, coords.lng);
    return { code, position, kols, name: coords.name };
  });

  const targetPosition = selectedCountry 
    ? latLngToVector3(
        COUNTRY_COORDS[selectedCountry]?.lat || 37.5, 
        COUNTRY_COORDS[selectedCountry]?.lng || 127
      )
    : null;

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      <GlobeMesh isAutoRotating={isAutoRotating && !selectedCountry} />
      
      <ConnectionLines 
        nodes={countryNodes.map(n => ({ code: n.code, position: n.position }))}
        selectedCountry={selectedCountry || hoveredCountry}
        accentColor={accentColor}
      />
      
      {countryNodes.map((node) => (
        <CountryMarker
          key={node.code}
          countryCode={node.code}
          position={node.position}
          kolCount={node.kols.length}
          isSelected={selectedCountry === node.code}
          isHovered={hoveredCountry === node.code}
          accentColor={accentColor}
          onClick={() => {
            if (selectedCountry === node.code) {
              onCountryClick(null);
              setIsAutoRotating(true);
            } else {
              onCountryClick(node.code);
              setIsAutoRotating(false);
            }
          }}
          onHover={(hovered) => onCountryHover(hovered ? node.code : null)}
        />
      ))}
      
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={false}
        minDistance={1.8}
        maxDistance={5}
        autoRotate={isAutoRotating && !selectedCountry}
        autoRotateSpeed={0.3}
        enableDamping
        dampingFactor={0.05}
      />
      
      <CameraController
        targetPosition={targetPosition}
        isZoomed={!!selectedCountry}
        controlsRef={controlsRef}
      />
    </>
  );
};

// 메인 Globe3D 컴포넌트
const Globe3D: React.FC<Globe3DProps> = ({ kols, accentColor = "#F59E0B" }) => {
  const { isMobile, shouldDisable3D } = useMobileOptimization();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // KOL을 국가별로 그룹화
  const kolsByCountry = React.useMemo(() => {
    const grouped: Record<string, KOL[]> = {};
    kols.forEach(kol => {
      const country = kol.country || 'KR';
      if (!grouped[country]) grouped[country] = [];
      grouped[country].push(kol);
    });
    return grouped;
  }, [kols]);

  const selectedKols = selectedCountry ? kolsByCountry[selectedCountry] || [] : [];
  const selectedCountryName = selectedCountry ? COUNTRY_COORDS[selectedCountry]?.name || selectedCountry : '';

  const handleBack = useCallback(() => {
    setSelectedCountry(null);
  }, []);

  // 모바일에서는 3D 비활성화 (기존 2D 맵 사용 권장)
  if (isMobile || shouldDisable3D) {
    return (
      <div className="relative w-full aspect-square md:aspect-[4/3] max-h-[650px] rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center text-white/50">
          <p className="text-sm">3D 지구본은 데스크톱에서 최적화되어 있습니다.</p>
          <p className="text-xs mt-1">PC에서 확인해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] max-h-[650px] rounded-2xl overflow-hidden border border-white/[0.06]">
      {/* 3D 캔버스 */}
      <Canvas
        camera={{ position: [2, 0.8, 1.5], fov: 45 }}
        style={{ background: '#050505' }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <GlobeScene
            kolsByCountry={kolsByCountry}
            selectedCountry={selectedCountry}
            hoveredCountry={hoveredCountry}
            accentColor={accentColor}
            onCountryClick={setSelectedCountry}
            onCountryHover={setHoveredCountry}
          />
        </Suspense>
      </Canvas>

      {/* 호버 정보 표시 */}
      {hoveredCountry && !selectedCountry && (
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold" style={{ color: accentColor }}>
              {COUNTRY_COORDS[hoveredCountry]?.name}
            </span>
            <span className="text-xs text-white/40 font-mono bg-white/5 px-2 py-0.5 rounded">
              {hoveredCountry}
            </span>
          </div>
          <div className="text-sm text-white/60 mt-1">
            {kolsByCountry[hoveredCountry]?.length || 0} KOLs • Click to explore
          </div>
        </div>
      )}

      {/* 통계 */}
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2.5">
        <div className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">Active Regions</div>
        <div className="text-2xl font-bold font-mono" style={{ color: accentColor }}>
          {Object.keys(kolsByCountry).length}
        </div>
      </div>

      {/* 뒤로가기 버튼 */}
      {selectedCountry && (
        <button
          onClick={handleBack}
          className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/70 hover:bg-black/90 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2 text-sm text-white/80 hover:text-white transition-all"
        >
          <span>←</span>
          <span>Back to Globe</span>
        </button>
      )}

      {/* 안내 텍스트 */}
      {!selectedCountry && (
        <div className="absolute bottom-4 left-4 text-xs text-white/40">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
            Click a region to explore KOLs
          </span>
        </div>
      )}

      {/* KOL 상세 패널 */}
      {selectedCountry && (
        <KOLDetailPanel
          countryCode={selectedCountry}
          countryName={selectedCountryName}
          kols={selectedKols}
          accentColor={accentColor}
          onClose={handleBack}
        />
      )}

      {/* 코너 비네트 */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  );
};

export default Globe3D;
