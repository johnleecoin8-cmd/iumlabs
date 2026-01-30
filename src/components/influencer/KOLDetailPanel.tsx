import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import type { KOL } from './Globe3D';

interface KOLDetailPanelProps {
  countryCode: string;
  countryName: string;
  kols: KOL[];
  accentColor: string;
  onClose: () => void;
}

const KOLDetailPanel: React.FC<KOLDetailPanelProps> = ({
  countryCode,
  countryName,
  kols,
  accentColor,
  onClose,
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent pt-16 pb-4 px-4 animate-in slide-in-from-bottom duration-300">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ 
              background: `${accentColor}20`,
              border: `2px solid ${accentColor}`,
              color: accentColor,
            }}
          >
            {countryCode}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{countryName}</h3>
            <p className="text-xs text-white/50">{kols.length} Verified KOLs</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-white/60" />
        </button>
      </div>

      {/* KOL 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-[200px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
        {kols.map((kol, idx) => {
          const isTelegram = kol.platform === 'telegram';
          const avatarUrl = isTelegram 
            ? `https://unavatar.io/telegram/${kol.handle.replace('@', '')}`
            : `https://unavatar.io/twitter/${kol.handle.replace('@', '')}`;
          const fallbackUrl = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(kol.name)}&backgroundColor=0a0a0a`;
          const profileUrl = isTelegram 
            ? `https://t.me/${kol.handle.replace('@', '')}`
            : `https://x.com/${kol.handle.replace('@', '')}`;
          const platformColor = isTelegram ? '#0088cc' : accentColor;

          return (
            <a
              key={idx}
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all"
            >
              {/* 아바타 */}
              <div className="relative mb-2">
                <img
                  src={avatarUrl}
                  alt={kol.name}
                  className="w-12 h-12 rounded-full object-cover border-2"
                  style={{ borderColor: `${platformColor}50` }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackUrl;
                  }}
                />
                {/* 플랫폼 뱃지 */}
                <div 
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold"
                  style={{ background: platformColor, color: isTelegram ? '#fff' : '#000' }}
                >
                  {isTelegram ? 'TG' : 'X'}
                </div>
              </div>

              {/* 정보 */}
              <div className="text-center">
                <div className="text-xs font-medium text-white truncate max-w-[80px]">
                  {kol.name}
                </div>
                <div className="text-[10px] text-white/40 truncate max-w-[80px]">
                  {kol.handle}
                </div>
                <div className="mt-1 flex items-center justify-center gap-1">
                  <span className="text-[10px] font-mono" style={{ color: platformColor }}>
                    {kol.followers}
                  </span>
                </div>
              </div>

              {/* 호버 시 외부 링크 아이콘 */}
              <ExternalLink 
                className="w-3 h-3 text-white/30 group-hover:text-white/60 mt-1 transition-colors" 
              />
            </a>
          );
        })}
      </div>

      {/* 하단 팁 */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
        <span>Click on a profile to visit their page</span>
        <span className="font-mono" style={{ color: accentColor }}>
          {kols.reduce((sum, k) => {
            const num = parseFloat(k.followers.replace(/[KMB+,]/g, ''));
            const multiplier = k.followers.includes('M') ? 1000 : k.followers.includes('K') ? 1 : 0.001;
            return sum + (num * multiplier);
          }, 0).toFixed(1)}M+ Reach
        </span>
      </div>
    </div>
  );
};

export default KOLDetailPanel;
