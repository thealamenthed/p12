import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine} from "recharts";
import "./BarChart.css";

// Composant de tooltip personnalisé
const CustomTooltip = ({active, payload}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#E60000",
          color: "#fff",
          border: "none",
          borderRadius: 0,
          padding: "10px 8px",
          textAlign: "center"
        }}>
        {payload.map((entry, index) => (
          <div key={index} style={{color: "#fff", fontSize: 12}}>
            {entry.value} {entry.name}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const COLORS = {
  kg: "#282D30",
  kcal: "#E60000",
  grid: "#DEDEDE",
  tick: "#9B9EAC",
  cursor: "rgba(196,196,196,0.5)"
};

const BarChart = ({data}) => {
  if (!data || !data.sessions) {
    return <div className="chart-error">Aucune donnée disponible</div>;
  }

  // Labels "1".."N" en string pour XAxis catégoriel
  // Limiter à 10 jours maximum
  const limitedSessions = data.sessions.slice(0, 10);
  const chartData = limitedSessions.map((s, i) => ({
    day: String(i + 1),
    kilogram: s.kilogram,
    calories: s.calories
  }));

  // Domaine + ticks du Y (kg) et max des calories
  const {kgDomain, kgTicks, calMax} = useMemo(() => {
    const kgVals = chartData.map((d) => d.kilogram);
    const min = Math.min(...kgVals) - 5; // -5 pour plus de marge inférieure pour le poids
    const max = Math.max(...kgVals) + 5; // +5 pour plus de marge supérieure pour le poids
    const span = Math.max(1, max - min);
    const step = Math.ceil(span / 2); // 3 ticks: min, mid, max
    const calMax = Math.ceil(Math.max(...chartData.map((d) => d.calories)) + 20);

    return {
      kgDomain: [min, max],
      kgTicks: [min, min + step, max],
      calMax
    };
  }, [chartData]);
  console.log(kgTicks);

  return (
    <div className="bar-chart-container">
      <div className="chart-header">
        <h3>Activité quotidienne</h3>
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-dot" style={{backgroundColor: COLORS.kg}} />
            <span className="legend-text">Poids (kg)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{backgroundColor: COLORS.kcal}} />
            <span className="legend-text">Calories brûlées (kCal)</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart data={chartData} margin={{top: 20, right: 20, left: 20, bottom: 10}} barCategoryGap={32} barGap={8}>
          {/* On désactive le grid horizontal, on trace nos 3 lignes */}
          <CartesianGrid vertical={false} horizontal={false} stroke={COLORS.grid} />
          {/* Lignes horizontales personnalisées (alignées sur l’axe de droite) */}
          <ReferenceLine yAxisId="right" y={kgTicks[0]} stroke={COLORS.grid} strokeWidth={1} />
          <ReferenceLine yAxisId="right" y={kgTicks[1]} stroke={COLORS.grid} strokeDasharray="3 3" />
          <ReferenceLine yAxisId="right" y={kgTicks[2]} stroke={COLORS.grid} strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            type="category"
            allowDuplicatedCategory={false}
            tick={{fontSize: 14, fill: COLORS.tick, fontWeight: 500}}
            tickLine={false}
            axisLine={false}
          />
          {/* Calories à gauche (caché) */}
          <YAxis yAxisId="left" orientation="left" domain={[0, calMax]} hide />
          {/* Poids à droite */}
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={kgDomain}
            ticks={kgTicks}
            tick={{fontSize: 12, fill: COLORS.tick}}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip cursor={{fill: COLORS.cursor}} content={<CustomTooltip />} />
          <Bar yAxisId="right" dataKey="kilogram" name="kg" fill={COLORS.kg} radius={[3, 3, 0, 0]} barSize={7} />
          <Bar yAxisId="left" dataKey="calories" name="Kcal" fill={COLORS.kcal} radius={[3, 3, 0, 0]} barSize={7} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.shape({
    userId: PropTypes.number,
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        kilogram: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired
      })
    )
  })
};

export default BarChart;
