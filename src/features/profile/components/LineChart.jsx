import React, {useMemo, useState} from "react";
import {LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot, ReferenceArea} from "recharts";
import "./LineChart.css";

const dayMap = {1: "L", 2: "M", 3: "M", 4: "J", 5: "V", 6: "S", 7: "D"};

// Tooltip simple (fond blanc / texte noir)
function SessionTooltip({active, payload}) {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value;
  return <div style={{background: "#FFFFFF", color: "#000", padding: "6px 8px", fontSize: 12}}>{val} min</div>;
}

export default function LineChart({data}) {
  // HOOKS toujours en haut
  const [pinnedIndex, setPinnedIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  // Sécurise les données (aucun early return)
  const sessions = Array.isArray(data?.sessions) ? data.sessions : [];

  // Dataset : axe géométrique numérique xi = 1..N + label (L..D) pour l'axe visible
  const chartData = useMemo(
    () =>
      sessions.map((s, i) => ({
        xi: i + 1,
        label: dayMap[s.day] || s.day,
        value: s.sessionLength
      })),
    [sessions]
  );

  const N = chartData.length;

  // Domaine Y avec padding pour que la courbe ne touche pas les labels
  const yDomain = useMemo(() => {
    if (!N) return [0, 1]; // domaine non nul par défaut
    const vals = chartData.map((d) => d.value);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const pad = Math.max(5, Math.round((max - min) * 0.15));
    return [min - pad, max + pad];
  }, [chartData, N]);

  const hasPin = typeof pinnedIndex === "number" && pinnedIndex >= 0 && pinnedIndex < N;

  return (
    <div
      className="line-chart-container"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        borderRadius: 5,
        overflow: "hidden",
        background: "#FF0000",
        WebkitTapHighlightColor: "transparent"
      }}
      aria-label="Durée moyenne des sessions">
      {/* Titre overlay */}
      <h3
        className="line-title"
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          margin: 0,
          color: "rgba(255,255,255,0.6)",
          fontSize: 15,
          fontWeight: 500,
          lineHeight: 1.2,
          pointerEvents: "none",
          zIndex: 2
        }}>
        Durée moyenne des
        <br />
        sessions
      </h3>

      {/* Overlay “no data” si vide (n’affecte pas l’ordre des hooks) */}
      {!N && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            color: "#fff",
            opacity: 0.9,
            zIndex: 2,
            pointerEvents: "none",
            fontSize: 14
          }}>
          Aucune donnée disponible
        </div>
      )}

      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={chartData}
          margin={{top: 32, right: 0, left: 0, bottom: 24}} // ligne bord-à-bord
          onMouseMove={(st) => {
            const idx = st?.activeIndex != null ? parseInt(st.activeIndex) : null;
            setHoverIndex(idx);
          }}
          onClick={(st) => {
            console.log("LineChart click:", st);
            let idx = st?.activeIndex != null ? parseInt(st.activeIndex) : null;
            if (idx == null && typeof hoverIndex === "number") idx = hoverIndex;
            console.log("Setting pinnedIndex to:", idx);
            setPinnedIndex((prev) => (idx == null ? null : prev === idx ? null : idx));
          }}>
          {/* AXE X (géométrie) : numérique, caché, padding 0 */}
          <XAxis
            xAxisId="line"
            type="number"
            dataKey="xi"
            domain={[1, Math.max(1, N)]}
            ticks={Array.from({length: N || 1}, (_, i) => i + 1)}
            padding={{left: 0, right: 0}}
            hide
            allowDecimals={false}
          />

          {/* AXE X (labels) : visible, padding indépendant */}
          <XAxis
            xAxisId="labels"
            type="category"
            dataKey="label"
            tick={{fontSize: 12, fill: "#FFFFFF", opacity: 0.6, fontWeight: 500}}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            padding={{left: 18, right: 18}}
          />

          {/* Axe Y masqué */}
          <YAxis hide domain={yDomain} />

          {/* Pas de barre verticale au survol */}
          <Tooltip content={<SessionTooltip />} cursor={false} />
          {/* Bande foncée côté droit à partir du point cliqué */}
          {hasPin && (
            <ReferenceArea
              xAxisId="line"
              x1={pinnedIndex + 0.5}
              x2={(N || 1) + 0.5}
              y1={yDomain[0]}
              y2={yDomain[1]}
              strokeOpacity={0}
              fill="rgba(0,0,0,0.10)"
              isFront={false}
              style={{pointerEvents: "none"}}
            />
          )}

          {/* Courbe */}
          <Line
            xAxisId="line"
            type="natural"
            dataKey="value"
            stroke="#FFFFFF"
            strokeOpacity={0.8}
            strokeWidth={2.5}
            dot={false}
            activeDot={{r: 6, fill: "#FFFFFF", stroke: "none"}} // dot pleine, sans halo
            isAnimationActive={false}
          />

          {/* Dot verrouillée */}
          {hasPin && <ReferenceDot xAxisId="line" x={pinnedIndex + 1} y={chartData[pinnedIndex].value} r={6} fill="#FFFFFF" stroke="none" isFront />}
        </RechartsLineChart>
      </ResponsiveContainer>

      {/* Bande foncée sur clic */}
      {hasPin && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${(pinnedIndex / (N - 1)) * 100}%`,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.3)",
            pointerEvents: "none",
            zIndex: 1
          }}
        />
      )}
    </div>
  );
}
