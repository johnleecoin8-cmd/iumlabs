import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

const EAST_ASIA_CODES = ["156", "392", "410", "408", "158", "496"];
const KOREA_CODE = "410";

const markers: { name: string; coordinates: [number, number]; isHome?: boolean }[] = [
  { name: "South Korea", coordinates: [127.0, 37.5], isHome: true },
  { name: "Japan", coordinates: [139.7, 36.2] },
  { name: "Taiwan", coordinates: [121.0, 23.7] },
  { name: "China", coordinates: [121.5, 31.2] },
];

const seoulCoords: [number, number] = [127.0, 37.5];
const BLUE = "#3B82F6";
const BLUE_LIGHT = "#60A5FA";

const EastAsiaMap = () => (
  <ComposableMap
    projection="geoMercator"
    projectionConfig={{ center: [130, 30], scale: 1300 }}
    width={700}
    height={520}
    style={{ width: "100%", height: "auto" }}
  >
    <defs>
      <filter id="map-glow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <radialGradient id="map-home-glow">
        <stop offset="0%" stopColor={BLUE} stopOpacity="0.35" />
        <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
      </radialGradient>
    </defs>

    <Geographies geography={GEO_URL}>
      {({ geographies }) =>
        geographies
          .filter((geo) => EAST_ASIA_CODES.includes(geo.id))
          .map((geo) => {
            const isKorea = geo.id === KOREA_CODE;
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={isKorea ? "#16233f" : "#1a1a1c"}
                stroke={isKorea ? "rgba(96,165,250,0.45)" : "#333"}
                strokeWidth={isKorea ? 0.8 : 0.5}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: isKorea ? "#1b2c4f" : "#222" },
                  pressed: { outline: "none" },
                }}
              />
            );
          })
      }
    </Geographies>

    {/* Static base arcs */}
    {markers
      .filter((m) => !m.isHome)
      .map((m) => (
        <Line
          key={`base-${m.name}`}
          from={seoulCoords}
          to={m.coordinates}
          stroke={BLUE}
          strokeWidth={1}
          strokeOpacity={0.15}
        />
      ))}

    {/* Flowing dashed arcs, energy moving out of Seoul */}
    {markers
      .filter((m) => !m.isHome)
      .map((m) => (
        <Line
          key={`flow-${m.name}`}
          from={seoulCoords}
          to={m.coordinates}
          stroke={BLUE_LIGHT}
          strokeWidth={1.4}
          strokeDasharray="5 9"
          strokeOpacity={0.7}
          strokeLinecap="round"
          className="map-arc-flow"
          filter="url(#map-glow)"
        />
      ))}

    {markers.map((m) => (
      <Marker key={m.name} coordinates={m.coordinates}>
        {m.isHome ? (
          <>
            <circle r={46} fill="url(#map-home-glow)" />
            <circle r={20} fill={BLUE} opacity={0.12}>
              <animate attributeName="r" values="20;34;20" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.18;0.04;0.18" dur="3s" repeatCount="indefinite" />
            </circle>
          </>
        ) : (
          <circle r={10} fill={BLUE} opacity={0.1}>
            <animate attributeName="r" values="10;16;10" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.14;0.03;0.14" dur="3s" repeatCount="indefinite" />
          </circle>
        )}
        <circle
          r={m.isHome ? 8 : 5.5}
          fill={m.isHome ? BLUE_LIGHT : BLUE}
          opacity={m.isHome ? 1 : 0.9}
          filter="url(#map-glow)"
        />
        <text
          textAnchor="middle"
          y={m.isHome ? -20 : -12}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: m.isHome ? 14 : 12,
            fontWeight: m.isHome ? 700 : 600,
            fill: m.isHome ? BLUE_LIGHT : "rgba(255,255,255,0.75)",
          }}
        >
          {m.name}
        </text>
        {m.isHome && (
          <text
            textAnchor="middle"
            y={-34}
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 8,
              fontWeight: 500,
              fill: BLUE_LIGHT,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
            }}
          >
            HOME MARKET
          </text>
        )}
      </Marker>
    ))}
  </ComposableMap>
);

export default EastAsiaMap;
