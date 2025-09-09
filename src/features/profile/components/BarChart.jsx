import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine} from "recharts";
import "./BarChart.css";

/**
 * Composant de tooltip personnalisé pour le graphique en barres
 * Affiche les valeurs exactes avec un style rouge personnalisé
 * @param {boolean} active - Indique si le tooltip est actif
 * @param {Array} payload - Données du point survolé
 * @returns {JSX.Element|null} Tooltip stylisé ou null si inactif
 */
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

/**
 * Configuration des couleurs pour le graphique en barres
 * @constant {Object} COLORS - Palette de couleurs du composant
 * @property {string} COLORS.kg - Couleur des barres de poids (#282D30 - noir)
 * @property {string} COLORS.kcal - Couleur des barres de calories (#E60000 - rouge)
 * @property {string} COLORS.grid - Couleur de la grille (#DEDEDE - gris clair)
 * @property {string} COLORS.tick - Couleur des étiquettes (#9B9EAC - gris)
 * @property {string} COLORS.cursor - Couleur du curseur de survol (gris transparent)
 */
const COLORS = {
  kg: "#282D30",
  kcal: "#E60000",
  grid: "#DEDEDE",
  tick: "#9B9EAC",
  cursor: "rgba(196,196,196,0.5)"
};

/**
 * Composant graphique en barres pour afficher l'activité quotidienne
 * Affiche le poids (kg) et les calories brûlées (kCal) sur une période donnée
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.data - Données d'activité de l'utilisateur
 * @param {number} props.data.userId - Identifiant de l'utilisateur
 * @param {Array} props.data.sessions - Tableau des sessions d'activité
 * @param {string|number} props.data.sessions[].day - Jour de la session
 * @param {number} props.data.sessions[].kilogram - Poids en kilogrammes (requis)
 * @param {number} props.data.sessions[].calories - Calories brûlées (requis)
 * @returns {JSX.Element} Graphique en barres avec double axe
 */
const BarChart = ({data}) => {
  if (!data || !data.sessions) {
    return <div className="chart-error">Aucune donnée disponible</div>;
  }

  /**
   * Transformation des données pour l'affichage
   * Limite à 10 sessions maximum et convertit les jours en chaînes
   */
  const limitedSessions = data.sessions.slice(0, 10);
  const chartData = limitedSessions.map((s, i) => ({
    day: String(i + 1),
    kilogram: s.kilogram,
    calories: s.calories
  }));

  /**
   * Calcul des domaines et ticks pour les axes Y
   * Optimisé avec useMemo pour éviter les recalculs inutiles
   * @returns {Object} Configuration des domaines et ticks
   */
  const {kgDomain, kgTicks, calMax} = useMemo(() => {
    const kgVals = chartData.map((d) => d.kilogram);
    const min = Math.min(...kgVals) - 5; // Marge inférieure de 5kg
    const max = Math.max(...kgVals) + 5; // Marge supérieure de 5kg
    const span = Math.max(1, max - min);
    const step = Math.ceil(span / 2); // 3 ticks: min, milieu, max
    const calMax = Math.ceil(Math.max(...chartData.map((d) => d.calories)) + 20);

    return {
      kgDomain: [min, max],
      kgTicks: [min, min + step, max],
      calMax
    };
  }, [chartData]);

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
          {/* Grille personnalisée avec lignes de référence horizontales */}
          <CartesianGrid vertical={false} horizontal={false} stroke={COLORS.grid} />
          {/* Lignes horizontales personnalisées alignées sur l'axe de droite */}
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
          {/* Axe Y gauche pour les calories (masqué) */}
          <YAxis yAxisId="left" orientation="left" domain={[0, calMax]} hide />
          {/* Axe Y droit pour le poids (visible) */}
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
          {/* Tooltip personnalisé avec curseur */}
          <Tooltip cursor={{fill: COLORS.cursor}} content={<CustomTooltip />} />
          {/* Barres de poids (axe droit) */}
          <Bar yAxisId="right" dataKey="kilogram" name="kg" fill={COLORS.kg} radius={[3, 3, 0, 0]} barSize={7} />
          {/* Barres de calories (axe gauche) */}
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
