import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer} from "recharts";
import "./RadarChart.css";

/**
 * props.data = {
 *   kind: { 1:"cardio", 2:"energy", 3:"endurance", 4:"strength", 5:"speed", 6:"intensity" },
 *   data: [{ value:number, kind:number }, ...]
 * }
 */
const LABELS = {
  intensity: "Intensité",
  speed: "Vitesse",
  strength: "Force",
  endurance: "Endurance",
  energy: "Énergie",
  cardio: "Cardio"
};

// ordre horaire comme la maquette (haut -> droite -> bas -> gauche)
const ORDER = ["intensity", "speed", "strength", "endurance", "energy", "cardio"];

// offset dédié pour “Endurance” (descendre car trop haut)
const ENDURANCE_DY = 8;

export default function RadarChart({data}) {
  if (!data || !data.data || !data.kind) {
    return <div className="chart-error">Aucune donnée disponible</div>;
  }

  // map + ordre imposé
  const raw = data.data.map((d) => {
    const key = data.kind[d.kind];
    return {key, subject: LABELS[key] ?? key, value: d.value};
  });

  const chartData = ORDER.map((k) => raw.find((r) => r?.key === k)).filter(Boolean);

  // max “propre” pour les anneaux (multiple de 10)
  const max = useMemo(() => {
    const m = Math.max(...chartData.map((d) => d.value));
    return Math.ceil(m / 10) * 10 || 100; // fallback
  }, [chartData]);

  // Tick renderer: remonte uniquement “Endurance”
  const renderAngleTick = ({payload, x, y, textAnchor}) => {
    const label = payload?.value;
    const dy = label === "Endurance" ? ENDURANCE_DY : 0;
    return (
      <text x={x} y={y} dy={dy} textAnchor={textAnchor} fill="#FFFFFF" fontSize={14} fontWeight={600}>
        {label}
      </text>
    );
  };

  return (
    <div className="radar-chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={chartData} outerRadius="70%" margin={{top: 16, right: 16, bottom: 16, left: 16}}>
          <PolarGrid gridType="polygon" radialLines={false} stroke="rgba(255,255,255,0.8)" />

          <PolarAngleAxis dataKey="subject" tick={renderAngleTick} />

          <PolarRadiusAxis
            domain={[0, max]}
            tickCount={6} // 5 anneaux
            tick={false}
            axisLine={false}
            angle={90}
          />

          <Radar dataKey="value" stroke="transparent" fill="#FF0101" fillOpacity={0.6} />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}

RadarChart.propTypes = {
  data: PropTypes.shape({
    kind: PropTypes.object.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number.isRequired,
        kind: PropTypes.number.isRequired
      })
    ).isRequired
  })
};
