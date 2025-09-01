import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import {LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot, ReferenceArea} from "recharts";
import "./LineChart.css";

const dayMap = {1: "L", 2: "M", 3: "M", 4: "J", 5: "V", 6: "S", 7: "D"};

function SessionTooltip({active, payload}) {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value;
  return <div style={{background: "#FFFFFF", color: "#000", padding: "6px 8px", fontSize: 12}}>{val} min</div>;
}

export default function LineChart({data}) {
  const [pinnedIndex, setPinnedIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  if (!data?.sessions?.length) {
    return <div className="chart-error">Aucune donnée disponible</div>;
  }

  // ➜ Axe géométrique numérique (xi = 1..N) + label pour l'axe visible
  const chartData = data.sessions.map((s, i) => ({
    xi: i + 1, // 1..N pour l'axe numérique caché
    label: dayMap[s.day] || s.day, // L M M J V S D pour les ticks visibles
    value: s.sessionLength
  }));
  const N = chartData.length;

  // Padding vertical pour que la courbe ne touche pas les labels
  const yDomain = useMemo(() => {
    const vals = chartData.map((d) => d.value);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const pad = Math.max(5, Math.round((max - min) * 0.15));
    return [min - pad, max + pad];
  }, [chartData]);

  return (
    <div className="line-chart-container">
      <div className="line-title">
        Durée moyenne des
        <br />
        sessions
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={chartData}
          margin={{top: 32, right: 0, left: 0, bottom: 24}} // ligne bord-à-bord
          onMouseMove={(st) => {
            if (typeof st?.activeTooltipIndex === "number") setHoverIndex(st.activeTooltipIndex);
            else setHoverIndex(null);
          }}
          onClick={(st) => {
            // 1) index “live” si dispo
            console.log("Click event:", st); // Debug complet
            // Utiliser activeIndex qui est plus fiable
            let idx = st?.activeIndex !== undefined ? parseInt(st.activeIndex) : null;
            console.log("Setting pinnedIndex to:", idx); // Debug
            // 3) toggle pin
            setPinnedIndex((prev) => (idx == null ? null : prev === idx ? null : idx));
          }}>
          {/* AXE X pour la LIGNE — numérique, caché, padding 0 */}
          <XAxis
            xAxisId="line"
            type="number"
            dataKey="xi"
            domain={[1, N]}
            ticks={Array.from({length: N}, (_, i) => i + 1)}
            padding={{left: 0, right: 0}}
            hide
            allowDecimals={false}
          />

          {/* AXE X pour les LABELS — visible, padding indépendant */}
          <XAxis
            xAxisId="labels"
            type="category"
            dataKey="label"
            tick={{fontSize: 12, fill: "#FFFFFF", opacity: 0.6, fontWeight: 500}}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            padding={{left: 20, right: 20}} // ← Ajuste librement pour les jours
          />

          {/* Axe Y masqué mais utilisé pour le layout */}
          <YAxis hide domain={yDomain} />

          {/* Tooltip sans barre verticale */}
          <Tooltip content={SessionTooltip} cursor={false} />

          {/* Courbe liée à l'axe "line" (géométrie) */}
          <Line
            xAxisId="line"
            type="natural"
            dataKey="value"
            stroke="url(#lineGradient)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{r: 4, stroke: "#FFFFFF", strokeWidth: 5, fill: "#FFFFFF", strokeOpacity: 0.7}}
          />

          {/* Définition du dégradé */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Dot verrouillée au point cliqué */}
          {pinnedIndex != null && (
            <ReferenceDot
              xAxisId="line"
              x={pinnedIndex + 1}
              y={chartData[pinnedIndex].value}
              r={4}
              fill="#FFFFFF"
              stroke="#FFFFFF"
              strokeWidth={5}
              borderRadius={2}
              strokeOpacity={0.5}
              isFront
            />
          )}
        </RechartsLineChart>
      </ResponsiveContainer>

      {/* BANDE ROUGE PLUS FONCÉE (au clic) — via CSS, en dehors du ResponsiveContainer */}
      {pinnedIndex != null && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${(pinnedIndex / (N - 1)) * 100}%`,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.1)",
            pointerEvents: "none",
            zIndex: 1000
          }}
        />
      )}
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
