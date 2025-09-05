import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {RadialBarChart as RChart, RadialBar, ResponsiveContainer, PolarAngleAxis} from "recharts";
import "./RadialBarChart.css";

/**
 * props.data : nombre entre 0 et 1 (score) – ex: 0.12
 */
export default function RadialBarChart({data}) {
  // pas d’early return (stabilité hooks)
  const scorePct = useMemo(() => {
    const n = Number.isFinite(data) ? data : 0;
    const pct = Math.max(0, Math.min(1, n)) * 100;
    return Math.round(pct);
  }, [data]);

  const series = useMemo(() => [{name: "score", value: scorePct}], [scorePct]);

  return (
    <div className="radial-bar-chart-container" style={{position: "relative", width: "100%", height: "100%"}}>
      {/* Centre blanc (sous le texte, au-dessus du chart background) */}
      <div
        className="inner-bg"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 174,
          height: 174,
          background: "#fff",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          pointerEvents: "none"
        }}
      />

      {/* Texte centré au-dessus */}
      <div
        className="score-display"
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          pointerEvents: "none",
          textAlign: "center",
          zIndex: 2
        }}>
        <div>
          <div style={{fontSize: 28, fontWeight: 700, color: "#282d30", lineHeight: 1, marginBottom: 6}}>{scorePct}%</div>
          <div style={{fontSize: 14, color: "#74798c", fontWeight: 600}}>de votre objectif</div>
        </div>
      </div>

      {/* Overlay “no data” sémantique si jamais (ici score 0 = data possible, donc on n’empêche pas l’affichage) */}
      {/* Afficher un message quand data est null/undefined :
       */}
      {data == null && <div className="chart-error">Aucune donnée disponible</div>}
      <ResponsiveContainer width="100%" height="100%">
        <RChart data={series} innerRadius="70%" outerRadius="80%" startAngle={90} endAngle={450}>
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar
            dataKey="value"
            clockWise
            cornerRadius={999}
            fill="#FF0101" // progress rouge
            background={{fill: "#FBFBFB"}} // piste claire
          />
        </RChart>
      </ResponsiveContainer>
    </div>
  );
}

RadialBarChart.propTypes = {
  data: PropTypes.number // ex: 0.12
};
