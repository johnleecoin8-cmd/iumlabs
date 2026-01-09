import { motion } from 'framer-motion';

const globalPoints = [
  { 
    id: 'korea', 
    label: 'Seoul', 
    sublabel: 'Korea',
    x: 156, y: 85,
    isCenter: true,
    stat: '#1 Altcoin Velocity',
    delay: 0
  },
  { 
    id: 'usa', 
    label: 'New York',
    sublabel: 'USA',
    x: 45, y: 75,
    stat: 'USD Pairs',
    delay: 0.3
  },
  { 
    id: 'eu', 
    label: 'London',
    sublabel: 'EU',
    x: 95, y: 65,
    stat: 'EUR Pairs',
    delay: 0.5
  },
  { 
    id: 'japan', 
    label: 'Tokyo',
    sublabel: 'Japan',
    x: 168, y: 80,
    stat: 'JPY Pairs',
    delay: 0.7
  },
  { 
    id: 'sea', 
    label: 'Singapore',
    sublabel: 'SEA',
    x: 148, y: 115,
    stat: 'Asia Hub',
    delay: 0.9
  }
];

const GlobalLiquidityGlobe = () => {
  const koreaPoint = globalPoints.find(p => p.isCenter)!;
  
  // Generate curved path from Korea to each point
  const generateCurvedPath = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2 - 30; // Curve upward
    return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
  };

  return (
    <div className="relative w-full aspect-[2/1] max-w-[500px] mx-auto">
      <svg
        viewBox="0 0 200 150"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 20px hsl(var(--primary) / 0.2))' }}
      >
        {/* Grid lines - latitude */}
        {[30, 50, 70, 90, 110, 130].map((y, i) => (
          <motion.ellipse
            key={`lat-${i}`}
            cx="100"
            cy={y}
            rx={80 - Math.abs(75 - y) * 0.8}
            ry="8"
            fill="none"
            stroke="hsl(var(--primary) / 0.1)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: i * 0.1 }}
          />
        ))}
        
        {/* Grid lines - longitude */}
        {[40, 70, 100, 130, 160].map((x, i) => (
          <motion.path
            key={`long-${i}`}
            d={`M ${x} 30 Q ${x + (x > 100 ? 10 : -10)} 75 ${x} 130`}
            fill="none"
            stroke="hsl(var(--primary) / 0.1)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: i * 0.1 }}
          />
        ))}

        {/* Simplified continent outlines */}
        <motion.path
          d="M 30 65 Q 45 55 60 60 L 55 85 Q 40 95 35 80 Z"
          fill="hsl(var(--primary) / 0.08)"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.path
          d="M 85 55 Q 100 50 115 55 L 110 90 Q 95 100 85 85 Z"
          fill="hsl(var(--primary) / 0.08)"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        <motion.path
          d="M 140 70 Q 175 60 180 85 L 170 110 Q 145 120 140 100 Z"
          fill="hsl(var(--primary) / 0.08)"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />

        {/* Connection lines from Korea to other points */}
        {globalPoints.filter(p => !p.isCenter).map((point, i) => (
          <motion.path
            key={`line-${point.id}`}
            d={generateCurvedPath(koreaPoint, point)}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            strokeDasharray="4 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, delay: 1 + i * 0.2 }}
          />
        ))}

        {/* Ripple effect from Korea */}
        {[1, 2, 3].map((ring) => (
          <motion.circle
            key={`ripple-${ring}`}
            cx={koreaPoint.x}
            cy={koreaPoint.y}
            r="5"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            initial={{ r: 5, opacity: 0.8 }}
            animate={{ r: 50, opacity: 0 }}
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
                r="8"
                fill="hsl(var(--primary) / 0.3)"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            
            {/* Pulse animation */}
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={point.isCenter ? 6 : 4}
              fill={point.isCenter ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.7)"}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: point.delay + 0.5 }}
            />
            
            {/* Center dot */}
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={point.isCenter ? 3 : 2}
              fill="white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: point.delay + 0.7 }}
            />
          </g>
        ))}

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* Labels */}
      {globalPoints.map((point) => (
        <motion.div
          key={`label-${point.id}`}
          className={`absolute text-center ${point.isCenter ? 'z-10' : ''}`}
          style={{
            left: `${(point.x / 200) * 100}%`,
            top: `${(point.y / 150) * 100}%`,
            transform: point.isCenter 
              ? 'translate(-50%, 20px)' 
              : 'translate(-50%, 15px)'
          }}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: point.delay + 1 }}
        >
          <div className={`text-xs font-medium ${point.isCenter ? 'text-primary' : 'text-muted-foreground'}`}>
            {point.label}
          </div>
          {point.isCenter && (
            <div className="text-[10px] text-primary/70 font-medium mt-0.5">
              {point.stat}
            </div>
          )}
        </motion.div>
      ))}

      {/* Center highlight message */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <p className="text-xs text-muted-foreground">
          Liquidity starts in <span className="text-primary font-semibold">Seoul</span>, ripples globally
        </p>
      </motion.div>
    </div>
  );
};

export default GlobalLiquidityGlobe;
