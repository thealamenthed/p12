import React from "react";
import PropTypes from "prop-types";
import {RadialBarChart as RechartsRadialBarChart, RadialBar, ResponsiveContainer} from "recharts";
import "./RadialBarChart.css";

/**
 * Composant graphique en barres radiales pour le score quotidien
 * @param {number} props.data - Score de l'utilisateur (entre 0 et 1)
 * @returns {JSX.Element} Graphique en barres radiales
 */
const RadialBarChart = ({data}) => {
  if (data === null || data === undefined) {
    return <div className="chart-error">Aucune donnée disponible</div>;
  }

  // Conversion du score en pourcentage
  const scorePercentage = Math.round(data * 100);

  // Formatage des données pour Recharts
  const chartData = [
    {
      name: "Score",
      value: scorePercentage,
      fill: "#ff6b6b"
    }
  ];

  return (
    <div className="radial-bar-chart-container">
      <div className="score-display">
        <div className="score-percentage">{scorePercentage}%</div>
        <div className="score-label">de votre objectif</div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadialBarChart data={chartData} startAngle={180} endAngle={-180} innerRadius="60%" outerRadius="90%">
          <RadialBar dataKey="value" cornerRadius={10} fill="#ff6b6b" background={{fill: "#f0f0f0"}} />
        </RechartsRadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

RadialBarChart.propTypes = {
  data: PropTypes.number
};

export default RadialBarChart;
