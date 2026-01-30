import React, { useState, useMemo } from 'react';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';

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

// 아시아 국가별 좌표 (SVG viewBox 0-100 기준)
const COUNTRY_POSITIONS: Record<string, { x: number; y: number; name: string }> = {
  KR: { x: 78, y: 28, name: '한국' },
  JP: { x: 88, y: 32, name: '일본' },
  CN: { x: 58, y: 35, name: '중국' },
  TW: { x: 75, y: 48, name: '대만' },
  HK: { x: 68, y: 50, name: '홍콩' },
  SG: { x: 55, y: 78, name: '싱가포르' },
  VN: { x: 60, y: 58, name: '베트남' },
  TH: { x: 50, y: 58, name: '태국' },
  MY: { x: 52, y: 72, name: '말레이시아' },
  ID: { x: 62, y: 85, name: '인도네시아' },
  PH: { x: 75, y: 60, name: '필리핀' },
  IN: { x: 32, y: 48, name: '인도' },
  AE: { x: 15, y: 50, name: 'UAE' },
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
    <div className="relative w-full aspect-[16/9] max-h-[550px] rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/[0.06]">
      {/* SVG 아시아 지도 */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* 배경 그라데이션 */}
          <radialGradient id="mapBgGlow" cx="60%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          
          {/* 노드 글로우 필터 */}
          <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* 연결선 그라데이션 */}
          <linearGradient id="connGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.5" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* 배경 */}
        <rect width="100" height="100" fill="#0A0A0A" />
        <rect width="100" height="100" fill="url(#mapBgGlow)" />

        {/* 그리드 라인 */}
        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(x => (
          <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="100" stroke="white" strokeOpacity="0.03" strokeWidth="0.08" />
        ))}
        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(y => (
          <line key={`h-${y}`} x1="0" y1={y} x2="100" y2={y} stroke="white" strokeOpacity="0.03" strokeWidth="0.08" />
        ))}

        {/* 국가 간 연결선 */}
        {countryNodes.map((node, i) => 
          countryNodes.slice(i + 1).map((target, j) => {
            const isHighlighted = hoveredCountry === node.countryCode || hoveredCountry === target.countryCode;
            const distance = Math.sqrt(Math.pow(node.x - target.x, 2) + Math.pow(node.y - target.y, 2));
            // 가까운 노드끼리만 연결
            if (distance > 35) return null;
            
            return (
              <line
                key={`conn-${i}-${j}`}
                x1={node.x}
                y1={node.y}
                x2={target.x}
                y2={target.y}
                stroke={accentColor}
                strokeOpacity={isHighlighted ? 0.5 : 0.12}
                strokeWidth={isHighlighted ? 0.25 : 0.1}
                className="transition-all duration-300"
              />
            );
          })
        )}

        {/* 국가 노드 */}
        {countryNodes.map((node) => {
          const isHovered = hoveredCountry === node.countryCode;
          const nodeSize = getNodeSize(node.totalFollowers);

          return (
            <g
              key={node.countryCode}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredCountry(node.countryCode)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              {/* 펄스 링 */}
              <circle
                cx={node.x}
                cy={node.y}
                r={nodeSize * 1.8}
                fill="none"
                stroke={accentColor}
                strokeOpacity={isHovered ? 0.4 : 0.1}
                strokeWidth="0.15"
                className={isHovered ? "animate-ping" : ""}
                style={{ animationDuration: '2s' }}
              />

              {/* 글로우 배경 */}
              {isHovered && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeSize * 2.5}
                  fill={accentColor}
                  fillOpacity="0.15"
                />
              )}

              {/* 메인 노드 */}
              <circle
                cx={node.x}
                cy={node.y}
                r={nodeSize}
                fill={isHovered ? accentColor : '#1a1a1a'}
                stroke={accentColor}
                strokeWidth={isHovered ? 0.4 : 0.2}
                filter="url(#nodeGlow)"
                className="transition-all duration-300"
              />

              {/* 국가 코드 */}
              <text
                x={node.x}
                y={node.y + 0.5}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isHovered ? '#000' : '#fff'}
                fontSize={isMobile ? 1.8 : 2.2}
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
                className="pointer-events-none select-none"
              >
                {node.countryCode}
              </text>

              {/* KOL 수 뱃지 */}
              <circle
                cx={node.x + nodeSize * 0.7}
                cy={node.y - nodeSize * 0.7}
                r={1.3}
                fill={accentColor}
              />
              <text
                x={node.x + nodeSize * 0.7}
                y={node.y - nodeSize * 0.7 + 0.3}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#000"
                fontSize={1.1}
                fontWeight="bold"
                className="pointer-events-none select-none"
              >
                {node.kols.length}
              </text>
            </g>
          );
        })}
      </svg>

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
