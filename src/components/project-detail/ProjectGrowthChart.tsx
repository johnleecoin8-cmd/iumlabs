import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { ProjectMetric } from "@/data/projectsData";

interface ProjectGrowthChartProps {
  metrics: ProjectMetric[];
  glowColor?: string;
}

// Parse numeric value from metric string like "$2M", "150+", "340%", "50K+"
const parseMetricValue = (value: string): number | null => {
  const cleaned = value.replace(/[+,]/g, "");
  const match = cleaned.match(/([\d.]+)\s*([KMBkmb%])?/);
  if (!match) return null;

  let num = parseFloat(match[1]);
  const unit = match[2]?.toUpperCase();

  if (unit === "K") num *= 1000;
  else if (unit === "M") num *= 1000000;
  else if (unit === "B") num *= 1000000000;

  return num;
};

// Format large numbers back to readable form
const formatValue = (value: number): string => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toFixed(0);
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A1A] border border-white/20 rounded-lg px-3 py-2 text-xs">
        <p className="text-white/60 mb-1">{payload[0].payload.label}</p>
        <p className="text-white font-semibold">{payload[0].payload.original}</p>
      </div>
    );
  }
  return null;
};

const ProjectGrowthChart = ({ metrics, glowColor = "#3b82f6" }: ProjectGrowthChartProps) => {
  // Filter metrics that have parseable numeric values
  const chartData = metrics
    .map((m) => {
      const numericValue = parseMetricValue(m.value);
      if (numericValue === null || numericValue === 0) return null;
      return {
        label: m.label,
        value: numericValue,
        original: m.value,
      };
    })
    .filter(Boolean) as Array<{ label: string; value: number; original: string }>;

  if (chartData.length === 0) return null;

  // Normalize values to percentage of max for visual balance
  const maxValue = Math.max(...chartData.map((d) => d.value));
  const normalizedData = chartData.map((d) => ({
    ...d,
    normalized: (d.value / maxValue) * 100,
    displayValue: formatValue(d.value),
  }));

  return (
    <motion.div
      className="mt-6 md:mt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs md:text-sm text-white/50 uppercase tracking-wider font-medium">
          Impact Overview
        </h3>
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: glowColor }}
          />
          <span className="text-[10px] text-white/30 font-mono">RESULTS</span>
        </div>
      </div>

      {/* Chart Container */}
      <div className="bg-[#1A1A1A] rounded-xl p-4 md:p-6 border border-white/10">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={normalizedData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            barCategoryGap="25%"
          >
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
              interval={0}
            />
            <YAxis hide />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Bar dataKey="normalized" radius={[6, 6, 0, 0]} maxBarSize={60}>
              {normalizedData.map((_, index) => (
                <Cell
                  key={index}
                  fill={glowColor}
                  fillOpacity={0.7 + (index * 0.1) / normalizedData.length}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Value labels below chart */}
        <div className="grid gap-2 mt-3" style={{ gridTemplateColumns: `repeat(${normalizedData.length}, 1fr)` }}>
          {normalizedData.map((d, i) => (
            <div key={i} className="text-center">
              <span
                className="text-sm md:text-base font-bold"
                style={{ color: glowColor }}
              >
                {d.original}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectGrowthChart;
