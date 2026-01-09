import { motion } from 'framer-motion';

const globalPoints = [
  { 
    id: 'korea', 
    label: 'Seoul', 
    sublabel: 'Korea',
    x: 168, y: 58,
    isCenter: true,
    stat: '#1 Altcoin Velocity',
    delay: 0
  },
  { 
    id: 'usa', 
    label: 'New York',
    sublabel: 'USA',
    x: 58, y: 52,
    stat: 'USD Pairs',
    delay: 0.3
  },
  { 
    id: 'eu', 
    label: 'London',
    sublabel: 'EU',
    x: 95, y: 45,
    stat: 'EUR Pairs',
    delay: 0.5
  },
  { 
    id: 'japan', 
    label: 'Tokyo',
    sublabel: 'Japan',
    x: 178, y: 55,
    stat: 'JPY Pairs',
    delay: 0.7
  },
  { 
    id: 'sea', 
    label: 'Singapore',
    sublabel: 'SEA',
    x: 155, y: 82,
    stat: 'Asia Hub',
    delay: 0.9
  }
];

// Simplified but more accurate continent paths for a flat map projection
const continentPaths = {
  // North America
  northAmerica: "M20,35 L25,32 L35,30 L45,28 L55,32 L65,38 L70,45 L72,55 L68,65 L60,72 L50,75 L42,70 L35,62 L28,55 L22,48 L18,42 Z",
  
  // South America
  southAmerica: "M55,78 L62,82 L68,90 L70,100 L68,112 L62,120 L55,125 L48,120 L45,110 L46,98 L50,88 Z",
  
  // Europe
  europe: "M88,32 L95,30 L105,32 L112,38 L108,45 L100,48 L92,52 L85,48 L82,42 L85,36 Z",
  
  // Africa
  africa: "M85,55 L95,52 L108,55 L115,65 L118,80 L115,95 L108,105 L95,110 L85,105 L80,92 L78,78 L80,65 Z",
  
  // Asia (main landmass)
  asia: "M115,28 L130,25 L150,28 L168,32 L180,38 L188,45 L190,55 L185,65 L175,70 L160,72 L145,75 L130,72 L118,65 L112,55 L110,45 L112,35 Z",
  
  // Southeast Asia / Indonesia
  seaIslands: "M150,78 L158,80 L165,85 L170,90 L168,95 L160,92 L152,88 L148,82 Z",
  
  // Australia
  australia: "M160,100 L175,98 L185,102 L188,112 L182,122 L170,125 L158,120 L155,110 L158,102 Z",
  
  // Korea Peninsula (highlighted)
  korea: "M166,52 L170,50 L172,54 L171,60 L168,62 L165,58 Z"
};

const GlobalLiquidityGlobe = () => {
  const koreaPoint = globalPoints.find(p => p.isCenter)!;
  
  // Generate curved path from Korea to each point
  const generateCurvedPath = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const midX = (from.x + to.x) / 2;
    const midY = Math.min(from.y, to.y) - 15 - Math.abs(from.x - to.x) * 0.1;
    return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
  };

  return (
    <div className="relative w-full aspect-[2/1] max-w-[500px] mx-auto">
      <svg
        viewBox="0 0 200 130"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 20px hsl(var(--primary) / 0.15))' }}
      >
        {/* Background subtle gradient */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.03" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Map background */}
        <rect x="0" y="0" width="200" height="130" fill="url(#bgGradient)" />

        {/* Grid lines - latitude */}
        {[25, 45, 65, 85, 105].map((y, i) => (
          <motion.line
            key={`lat-${i}`}
            x1="5"
            y1={y}
            x2="195"
            y2={y}
            stroke="hsl(var(--primary) / 0.08)"
            strokeWidth="0.3"
            strokeDasharray="2 4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: i * 0.1 }}
          />
        ))}
        
        {/* Grid lines - longitude */}
        {[20, 50, 80, 110, 140, 170].map((x, i) => (
          <motion.line
            key={`long-${i}`}
            x1={x}
            y1="10"
            x2={x}
            y2="120"
            stroke="hsl(var(--primary) / 0.08)"
            strokeWidth="0.3"
            strokeDasharray="2 4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: i * 0.1 }}
          />
        ))}

        {/* Continent outlines */}
        {Object.entries(continentPaths).map(([name, path], i) => (
          <motion.path
            key={name}
            d={path}
            fill={name === 'korea' ? 'hsl(var(--primary) / 0.4)' : 'hsl(var(--primary) / 0.12)'}
            stroke={name === 'korea' ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.3)'}
            strokeWidth={name === 'korea' ? '1' : '0.5'}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.3 + i * 0.1 }}
          />
        ))}

        {/* Connection lines from Korea to other points */}
        {globalPoints.filter(p => !p.isCenter).map((point, i) => (
          <motion.path
            key={`line-${point.id}`}
            d={generateCurvedPath(koreaPoint, point)}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1.5, delay: 1.5 + i * 0.2 }}
          />
        ))}

        {/* Animated particles along connection lines */}
        {globalPoints.filter(p => !p.isCenter).map((point, i) => (
          <motion.circle
            key={`particle-${point.id}`}
            r="2"
            fill="hsl(var(--primary))"
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              delay: 2 + i * 0.3,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              path={generateCurvedPath(koreaPoint, point)}
              begin={`${2 + i * 0.3}s`}
            />
          </motion.circle>
        ))}

        {/* Ripple effect from Korea */}
        {[1, 2, 3].map((ring) => (
          <motion.circle
            key={`ripple-${ring}`}
            cx={koreaPoint.x}
            cy={koreaPoint.y}
            r="3"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            initial={{ r: 3, opacity: 0.6 }}
            animate={{ r: 40, opacity: 0 }}
            transition={{
              duration: 3,
              delay: ring * 1,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Global points */}
        {globalPoints.map((point) => (
          <g key={point.id}>
            {/* Outer glow for center */}
            {point.isCenter && (
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="10"
                fill="hsl(var(--primary) / 0.25)"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            
            {/* Pulse ring */}
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={point.isCenter ? 7 : 5}
              fill={point.isCenter ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.6)"}
              filter="url(#glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: point.delay + 1 }}
            />
            
            {/* Center dot */}
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={point.isCenter ? 3 : 2}
              fill="white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: point.delay + 1.2 }}
            />
          </g>
        ))}
      </svg>

      {/* Labels */}
      {globalPoints.map((point) => (
        <motion.div
          key={`label-${point.id}`}
          className={`absolute text-center pointer-events-none ${point.isCenter ? 'z-10' : ''}`}
          style={{
            left: `${(point.x / 200) * 100}%`,
            top: `${(point.y / 130) * 100}%`,
            transform: point.isCenter 
              ? 'translate(-50%, 18px)' 
              : 'translate(-50%, 12px)'
          }}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: point.delay + 1.5 }}
        >
          <div className={`text-[10px] font-medium whitespace-nowrap ${point.isCenter ? 'text-primary' : 'text-muted-foreground'}`}>
            {point.label}
          </div>
          {point.isCenter && (
            <div className="text-[9px] text-primary/80 font-medium mt-0.5 whitespace-nowrap">
              {point.stat}
            </div>
          )}
        </motion.div>
      ))}

      {/* Bottom message */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <p className="text-[11px] text-muted-foreground">
          Liquidity starts in <span className="text-primary font-semibold">Seoul</span>, ripples globally
        </p>
      </motion.div>
    </div>
  );
};

export default GlobalLiquidityGlobe;
