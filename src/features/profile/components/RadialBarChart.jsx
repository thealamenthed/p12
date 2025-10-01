import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {RadialBarChart as RChart, RadialBar, ResponsiveContainer, PolarAngleAxis} from "recharts";
import "./RadialBarChart.css";

/**
 * Composant graphique en barre radiale pour afficher le score de l'utilisateur
 * Affiche un pourcentage de progression sous forme de barre circulaire avec texte centré
 * @param {Object} props - Propriétés du composant
 * @param {number} props.data - Score de l'utilisateur entre 0 et 1 (ex: 0.12 = 12%)
 * @returns {JSX.Element} Graphique en barre radiale avec pourcentage centré
 */
export default function RadialBarChart({data}) {
  /**
   * Calcul et sécurisation du score en pourcentage
   * Convertit le score (0-1) en pourcentage (0-100) avec validation
   * @returns {number} Pourcentage arrondi entre 0 et 100
   */
  const scorePct = useMemo(() => {
    const n = Number.isFinite(data) ? data : 0;
    const pct = Math.max(0, Math.min(1, n)) * 100;
    return Math.round(pct);
  }, [data]);

  /**
   * Formatage des données pour le graphique radial
   * Crée un tableau avec le score formaté pour Recharts
   * @returns {Array} Données formatées pour RadialBarChart
   */
  const series = useMemo(() => [{name: "score", value: scorePct}], [scorePct]);

  return (
    <div className="radial-bar-chart-container" style={{position: "relative", width: "100%", height: "100%"}}>
      {/* Fond blanc circulaire au centre pour masquer le graphique */}
      <div
        className="inner-bg"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          background: "#fff",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          pointerEvents: "none"
        }}
      />

      {/* Affichage du score centré avec texte explicatif */}
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
          <div className="score-percentage">{scorePct}%</div>
          <div className="score-text">de votre</div>
          <div className="score-text">objectif</div>
        </div>
      </div>

      {/* Message d'absence de données (seulement si data est null/undefined) */}
      {data == null && <div className="chart-error">Aucune donnée disponible</div>}
      <ResponsiveContainer width="100%" height="100%">
        <RChart data={series} innerRadius="75%" outerRadius="85%" startAngle={90} endAngle={450}>
          {/* Axe polaire masqué pour le domaine 0-100 */}
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          {/* Barre radiale avec progression rouge et piste grise */}
          <RadialBar
            dataKey="value"
            clockWise
            cornerRadius={999}
            fill="#FF0101" // Couleur de progression rouge
            background={{fill: "#FBFBFB"}} // Piste de fond gris clair
          />
        </RChart>
      </ResponsiveContainer>
    </div>
  );
}

RadialBarChart.propTypes = {
  data: PropTypes.number // ex: 0.12
};
