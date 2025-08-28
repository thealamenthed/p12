import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import {LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot} from "recharts";
import "./LineChart.css";

const dayMap = {1: "L", 2: "M", 3: "M", 4: "J", 5: "V", 6: "S", 7: "D"};

function SessionTooltip({active, payload}) {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value;
  return <div style={{background: "#FFFFFF", padding: "6px 8px", fontSize: 12}}>{val} min</div>;
}

export default function LineChart({data}) {
  const [pinnedIndex, setPinnedIndex] = useState(null);

  if (!data?.sessions?.length) {
    return <div className="chart-error">Aucune donnée disponible</div>;
  }

  const chartData = data.sessions.map((s) => ({
    day: dayMap[s.day] || s.day, // ex: "L","M","M","J","V","S","D"
    sessionLength: s.sessionLength
  }));

  // Domaine Y élargi pour éviter que la ligne touche les lettres
  const yDomain = useMemo(() => {
    const vals = chartData.map((d) => d.sessionLength);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const pad = Math.max(5, Math.round((max - min) * 0.15)); // ~15% de marge
    return [min - pad, max + pad];
  }, [chartData]);

  // Position de la bande foncée (en %) à partir du point épinglé jusqu'à droite
  const splitPct = pinnedIndex != null ? ((pinnedIndex + 0.5) / chartData.length) * 100 : null;

  return (
    <div
      className={`line-chart-container ${pinnedIndex != null ? "clicked" : ""}`}
      style={pinnedIndex != null ? {["--split"]: `${splitPct}%`} : undefined}>
      <div className="line-title">
        Durée moyenne des
        <br />
        sessions
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={chartData}
          margin={{top: 32, right: 16, left: 16, bottom: 24}}
          // Récupère l'index actif fourni par Recharts au clic
          onClick={(state) => {
            const idx = state?.activeIndex !== undefined ? parseInt(state.activeIndex) : null;
            setPinnedIndex((prev) => (idx === null ? null : idx === prev ? null : idx));
          }}
          onMouseLeave={() => {
            // ne rien faire ici, la "pin" garde l'état
          }}>
          <XAxis
            dataKey="day"
            tick={{fontSize: 12, fill: "#FFFFFF", opacity: 0.6, fontWeight: 500}}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            padding={{left: 4, right: 4}}
          />
          {/* Y masqué mais utilisé pour le layout */}
          <YAxis hide domain={yDomain} />

          {/* Pas de barre verticale au survol */}
          <Tooltip content={SessionTooltip} cursor={false} />

          <Line
            type="natural"
            dataKey="sessionLength"
            stroke="#FFFFFF"
            strokeOpacity={0.8}
            strokeWidth={2.5}
            dot={false}
            activeDot={{r: 4, stroke: "#FFFFFF", strokeWidth: 8, fill: "#FFFFFF"}}
          />

          {/* Dot verrouillée quand on a cliqué */}
          {pinnedIndex != null && (
            <ReferenceDot
              x={chartData[pinnedIndex].day} // valeur de l'axe X (catégorie)
              y={chartData[pinnedIndex].sessionLength} // valeur de l'axe Y
              r={4}
              fill="#FFFFFF"
              stroke="#FFFFFF"
              strokeWidth={8}
              isFront={true}
            />
          )}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

LineChart.propTypes = {
  data: PropTypes.shape({
    userId: PropTypes.number,
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.number,
        sessionLength: PropTypes.number
      })
    )
  })
};
