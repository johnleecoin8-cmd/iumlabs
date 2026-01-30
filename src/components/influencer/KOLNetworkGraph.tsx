import React, { useState, useMemo } from 'react';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';
import asiaGlobeMap from '@/assets/maps/asia-globe.png';

interface KOL {
  name: string;
  handle: string;
  followers: string;
  expertise: string;
  platform: string;
  country?: string; // 국가 코드: KR, JP, CN, SG, VN, TH, ID, PH, MY, TW, HK, IN, AE
}

interface KOLNetworkGraphProps {
  kols: KOL[];
  accentColor?: string;
}

// 구체 지도 이미지에 맞춘 국가별 좌표 (%)
// 구체 중심: 약 50%, 50% / 아시아가 중심-우측에 위치
const COUNTRY_POSITIONS: Record<string, { x: number; y: number; name: string }> = {
  KR: { x: 68, y: 32, name: '한국' },
  JP: { x: 76, y: 35, name: '일본' },
  CN: { x: 54, y: 42, name: '중국' },
  TW: { x: 66, y: 48, name: '대만' },
  HK: { x: 60, y: 52, name: '홍콩' },
  SG: { x: 52, y: 72, name: '싱가포르' },
  VN: { x: 56, y: 58, name: '베트남' },
  TH: { x: 48, y: 56, name: '태국' },
  MY: { x: 50, y: 68, name: '말레이시아' },
  ID: { x: 58, y: 78, name: '인도네시아' },
  PH: { x: 68, y: 58, name: '필리핀' },
  IN: { x: 36, y: 50, name: '인도' },
  AE: { x: 22, y: 48, name: 'UAE' },
};

const KOLNetworkGraph: React.FC<KOLNetworkGraphProps> = ({ kols, accentColor = "#F59E0B" }) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const { isMobile } = useMobileOptimization();

  // 국가별로 KOL 그룹화
  const kolsByCountry = useMemo(() => {
    const grouped: Record<string, KOL[]> = {};
    kols.forEach(kol => {
      const country = kol.country || 'KR'; // 기본값 한국
      if (!grouped[country]) grouped[country] = [];
      grouped[country].push(kol);
    });
    return grouped;
  }, [kols]);

  // 국가별 노드 데이터 생성
  const countryNodes = useMemo(() => {
    return Object.entries(kolsByCountry).map(([countryCode, countryKols]) => {
      const pos = COUNTRY_POSITIONS[countryCode] || COUNTRY_POSITIONS.KR;
      return {
        countryCode,
        countryName: pos.name,
        x: pos.x,
        y: pos.y,
        kols: countryKols,
        totalFollowers: countryKols.reduce((sum, k) => {
          const num = parseFloat(k.followers.replace(/[KMB,]/g, ''));
          const multiplier = k.followers.includes('M') ? 1000000 : k.followers.includes('K') ? 1000 : 1;
          return sum + (num * multiplier);
        }, 0),
      };
    });
  }, [kolsByCountry]);

  const getNodeSize = (totalFollowers: number) => {
    if (totalFollowers >= 5000000) return isMobile ? 3.5 : 4.5;
    if (totalFollowers >= 1000000) return isMobile ? 3 : 4;
    if (totalFollowers >= 500000) return isMobile ? 2.5 : 3.5;
    return isMobile ? 2 : 3;
  };

  const hoveredCountryData = hoveredCountry ? kolsByCountry[hoveredCountry] : null;
  const hoveredPos = hoveredCountry ? COUNTRY_POSITIONS[hoveredCountry] : null;

  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] max-h-[650px] rounded-2xl overflow-hidden border border-white/[0.06]">
      {/* 구체 지도 배경 이미지 */}
      <div className="absolute inset-0">
        <img 
          src={asiaGlobeMap} 
          alt="Asia Globe Map" 
          className="w-full h-full object-contain"
          style={{ 
            filter: 'brightness(0.7) saturate(0.8)',
          }}
        />
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 국가 노드들 */}
      <div className="absolute inset-0">
        {countryNodes.map((node) => {
          const isHovered = hoveredCountry === node.countryCode;
          const nodeSize = getNodeSize(node.totalFollowers);
          const sizePx = isMobile ? nodeSize * 8 : nodeSize * 10;

          return (
            <div
              key={node.countryCode}
              className="absolute cursor-pointer transition-all duration-300"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onMouseEnter={() => setHoveredCountry(node.countryCode)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              {/* 펄스 링 */}
              <div
                className={`absolute rounded-full border transition-all duration-300 ${isHovered ? 'animate-ping' : ''}`}
                style={{
                  width: sizePx * 2,
                  height: sizePx * 2,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderColor: isHovered ? accentColor : `${accentColor}40`,
                  animationDuration: '2s',
                }}
              />

              {/* 글로우 배경 */}
              {isHovered && (
                <div
                  className="absolute rounded-full transition-all duration-300"
                  style={{
                    width: sizePx * 3,
                    height: sizePx * 3,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
                  }}
                />
              )}

              {/* 메인 노드 */}
              <div
                className="relative rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
                style={{
                  width: sizePx,
                  height: sizePx,
                  background: isHovered ? accentColor : 'rgba(26, 26, 26, 0.95)',
                  border: `2px solid ${accentColor}`,
                  boxShadow: isHovered 
                    ? `0 0 20px ${accentColor}80, 0 0 40px ${accentColor}40` 
                    : `0 0 10px ${accentColor}30`,
                }}
              >
                {/* 국가 코드 */}
                <span
                  className="font-bold text-center pointer-events-none select-none"
                  style={{
                    fontSize: isMobile ? '10px' : '12px',
                    color: isHovered ? '#000' : '#fff',
                  }}
                >
                  {node.countryCode}
                </span>

                {/* KOL 수 뱃지 */}
                <div
                  className="absolute flex items-center justify-center rounded-full text-black font-bold"
                  style={{
                    width: isMobile ? 14 : 18,
                    height: isMobile ? 14 : 18,
                    fontSize: isMobile ? '8px' : '10px',
                    background: accentColor,
                    top: -4,
                    right: -4,
                  }}
                >
                  {node.kols.length}
                </div>
              </div>
            </div>
          );
        })}

        {/* 연결선 SVG 오버레이 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {countryNodes.map((node, i) => 
            countryNodes.slice(i + 1).map((target, j) => {
              const isHighlighted = hoveredCountry === node.countryCode || hoveredCountry === target.countryCode;
              const distance = Math.sqrt(Math.pow(node.x - target.x, 2) + Math.pow(node.y - target.y, 2));
              if (distance > 30) return null;
              
              return (
                <line
                  key={`conn-${i}-${j}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke={accentColor}
                  strokeOpacity={isHighlighted ? 0.6 : 0.15}
                  strokeWidth={isHighlighted ? 2 : 1}
                  className="transition-all duration-300"
                />
              );
            })
          )}
        </svg>
      </div>

      {/* 호버 툴팁 */}
      {hoveredCountry && hoveredCountryData && hoveredPos && (
        <div 
          className="absolute z-50 pointer-events-none"
          style={{
            left: `${hoveredPos.x}%`,
            top: `${hoveredPos.y}%`,
            transform: hoveredPos.y > 60 ? 'translate(-50%, calc(-100% - 20px))' : 'translate(-50%, 30px)',
          }}
        >
          <div className="bg-black/95 backdrop-blur-md border border-white/10 rounded-xl p-4 min-w-[260px] max-w-[320px] shadow-2xl">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
              <span className="text-lg font-bold" style={{ color: accentColor }}>
                {hoveredPos.name}
              </span>
              <span className="text-xs text-white/40 font-mono bg-white/5 px-2 py-0.5 rounded">
                {hoveredCountry}
              </span>
            </div>

            <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
              {hoveredCountryData.map((kol, idx) => {
                const isTelegram = kol.platform === 'telegram';
                const avatarUrl = isTelegram 
                  ? `https://unavatar.io/telegram/${kol.handle.replace('@', '')}`
                  : `https://unavatar.io/twitter/${kol.handle.replace('@', '')}`;
                const nodeColor = isTelegram ? '#0088cc' : accentColor;

                return (
                  <div 
                    key={idx}
                    className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5"
                  >
                    <img
                      src={avatarUrl}
                      alt={kol.name}
                      className="w-8 h-8 rounded-full object-cover border"
                      style={{ borderColor: `${nodeColor}50` }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(kol.name)}&backgroundColor=0a0a0a`;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white truncate">{kol.name}</div>
                      <div className="text-xs text-white/40 truncate">{kol.handle}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono font-medium" style={{ color: nodeColor }}>{kol.followers}</div>
                      <div className="text-[10px] text-white/30">{kol.expertise}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 pt-2 border-t border-white/10 flex justify-between text-xs">
              <span className="text-white/40">Total KOLs</span>
              <span className="font-mono font-semibold" style={{ color: accentColor }}>
                {hoveredCountryData.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 범례 */}
      <div className="absolute bottom-4 left-4 flex items-center gap-4 text-xs text-white/40">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full border" style={{ borderColor: accentColor, background: '#1a1a1a' }} />
          <span>KOL Network</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-[1px]" style={{ background: accentColor, opacity: 0.4 }} />
          <span>Connection</span>
        </div>
      </div>

      {/* 통계 */}
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2.5">
        <div className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">Active Regions</div>
        <div className="text-2xl font-bold font-mono" style={{ color: accentColor }}>
          {countryNodes.length}
        </div>
      </div>

      {/* 코너 비네트 */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 60% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)',
        }}
      />
    </div>
  );
};

export default KOLNetworkGraph;
