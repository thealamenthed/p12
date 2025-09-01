import React from "react";
import PropTypes from "prop-types";
import {RadialBarChart as RChart, RadialBar, ResponsiveContainer, PolarAngleAxis} from "recharts";
import "./RadialBarChart.css";

export default function RadialBarChart({data}) {
  if (data == null) {
    return <div className="chart-error">Aucune donnée disponible</div>;
  }

  const scorePct = Math.round(data * 100);
  const series = [{name: "score", value: scorePct}];

  return (
    <div className="radial-bar-chart-container">
      {/* Cercle blanc au centre */}
      <div className="inner-bg"></div>

      {/* Texte centré */}
      <div className="score-display">
        <div className="score-percentage">{scorePct}%</div>
        <div className="score-label">de votre objectif</div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <RChart data={series} innerRadius="70%" outerRadius="80%" startAngle={90} endAngle={450}>
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" clockWise cornerRadius={999} fill="#FF0101" background={{fill: "#FBFBFB"}} />
        </RChart>
      </ResponsiveContainer>
    </div>
  );
}

RadialBarChart.propTypes = {
  data: PropTypes.number
};
