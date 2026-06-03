import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

const EAST_ASIA_CODES = ["156", "392", "410", "408", "158", "496"];

const markers: { name: string; coordinates: [number, number]; isHome?: boolean }[] = [
  { name: "South Korea", coordinates: [127.0, 37.5], isHome: true },
  { name: "Japan", coordinates: [139.7, 36.2] },
  { name: "Taiwan", coordinates: [121.0, 23.7] },
  { name: "China", coordinates: [121.5, 31.2] },
];

const seoulCoords: [number, number] = [127.0, 37.5];
const BLUE = "#3B82F6";

const EastAsiaMap = () => (
  <ComposableMap
    projection="geoMercator"
    projectionConfig={{ center: [128, 31], scale: 1400 }}
    width={700}
    height={500}
    style={{ width: "100%", height: "auto" }}
  >
    <Geographies geography={GEO_URL}>
      {({ geographies }) =>
        geographies
          .filter((geo) => EAST_ASIA_CODES.includes(geo.id))
          .map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#1a1a1a"
              stroke="#333"
              strokeWidth={0.5}
              style={{
                default: { outline: "none" },
                hover: { outline: "none", fill: "#222" },
                pressed: { outline: "none" },
              }}
            />
          ))
      }
    </Geographies>

    {markers
      .filter((m) => !m.isHome)
      .map((m) => (
        <Line
          key={`line-${m.name}`}
          from={seoulCoords}
          to={m.coordinates}
          stroke={BLUE}
          strokeWidth={1}
          strokeDasharray="4 4"
          strokeOpacity={0.25}
        />
      ))}

    {markers.map((m) => (
      <Marker key={m.name} coordinates={m.coordinates}>
        {m.isHome && (
          <circle r={16} fill={BLUE} opacity={0.1}>
            <animate attributeName="r" values="16;26;16" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.12;0.03;0.12" dur="3s" repeatCount="indefinite" />
          </circle>
        )}
        <circle r={m.isHome ? 6 : 4} fill={BLUE} opacity={m.isHome ? 1 : 0.7} />
        <text
          textAnchor="middle"
          y={m.isHome ? -20 : -12}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: m.isHome ? 14 : 12,
            fontWeight: m.isHome ? 700 : 600,
            fill: BLUE,
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
              fill: BLUE,
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
