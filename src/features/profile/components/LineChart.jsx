import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import {LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot, ReferenceArea} from "recharts";
import "./LineChart.css";

/**
 * Mapping des jours numériques vers les lettres françaises
 * Utilisé pour convertir les indices 1-7 en labels L, M, M, J, V, S, D
 */
const dayMap = {1: "L", 2: "M", 3: "M", 4: "J", 5: "V", 6: "S", 7: "D"};

/**
 * Composant de tooltip personnalisé pour le graphique linéaire
 * Affiche la durée de session en minutes avec un style personnalisé
 *
 * @param {Object} props - Propriétés du tooltip
 * @param {boolean} props.active - Indique si le tooltip est actif
 * @param {Array} props.payload - Données du point survolé
 * @returns {JSX.Element|null} Le tooltip personnalisé ou null si inactif
 */
function SessionTooltip({active, payload}) {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value;
  return <div style={{background: "#FFFFFF", color: "#000", padding: "6px 8px", fontSize: 12}}>{val} min</div>;
}

/**
 * Composant graphique linéaire pour la durée moyenne des sessions
 *
 * Fonctionnalités principales :
 * - Affichage des données de session sur 7 jours
 * - Ligne avec dégradé (transparent à opaque)
 * - Fonctionnalité de clic pour épingler un point
 * - Bande foncée qui s'étend du point cliqué vers la droite
 * - Tooltip personnalisé
 * - Labels des jours en français (L, M, M, J, V, S, D)
 *
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.data - Données des sessions utilisateur
 * @param {Array} props.data.sessions - Tableau des sessions avec jour et durée
 * @returns {JSX.Element} Le composant graphique linéaire
 */
export default function LineChart({data}) {
  // État pour suivre l'index du point épinglé (cliqué)
  const [pinnedIndex, setPinnedIndex] = useState(null);

  // État pour suivre l'index du point survolé (pour fallback du clic)
  const [hoverIndex, setHoverIndex] = useState(null);

  // Vérification de la présence des données
  if (!data?.sessions?.length) {
    return <div className="chart-error">Aucune donnée disponible</div>;
  }

  /**
   * Formatage des données pour Recharts
   * Crée un tableau avec :
   * - xi : index numérique (1-7) pour l'axe géométrique
   * - label : lettre du jour (L, M, M, J, V, S, D) pour l'affichage
   * - value : durée de la session en minutes
   */
  const chartData = data.sessions.map((s, i) => ({
    xi: i + 1, // Index numérique pour l'axe caché (1..7)
    label: dayMap[s.day] || s.day, // Label visible (L, M, M, J, V, S, D)
    value: s.sessionLength // Durée de la session
  }));

  // Nombre total de points de données
  const N = chartData.length;

  /**
   * Calcul du domaine Y avec padding pour éviter que la ligne touche les labels
   * Ajoute 15% de marge au-dessus et en-dessous des valeurs min/max
   */
  const yDomain = useMemo(() => {
    const vals = chartData.map((d) => d.value);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const pad = Math.max(5, Math.round((max - min) * 0.15)); // ~15% de marge
    return [min - pad, max + pad];
  }, [chartData]);

  return (
    <div className="line-chart-container">
      <div className="line-title">
        Durée moyenne des
        <br />
        sessions
      </div>

      {/* Conteneur responsive pour le graphique */}
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={chartData}
          margin={{top: 32, right: 0, left: 0, bottom: 24}}
          // Gestion du survol pour détecter l'index actif
          onMouseMove={(st) => {
            if (typeof st?.activeTooltipIndex === "number") setHoverIndex(st.activeTooltipIndex);
            else setHoverIndex(null);
          }}
          // Gestion du clic pour épingler/désépingler un point
          onClick={(st) => {
            let idx = st?.activeIndex !== undefined ? parseInt(st.activeIndex) : null;
            // Toggle pin : si même index, désélectionner, sinon sélectionner
            setPinnedIndex((prev) => (idx === null ? null : prev === idx ? null : idx));
          }}>
          {/* AXE X pour la LIGNE — numérique, caché, sans padding */}
          <XAxis
            xAxisId="line"
            type="number"
            dataKey="xi"
            domain={[1, N]}
            ticks={Array.from({length: N}, (_, i) => i + 1)}
            padding={{left: 0, right: 0}}
            hide // Axe caché mais utilisé pour la géométrie
            allowDecimals={false}
          />

          {/* AXE X pour les LABELS — visible, avec padding pour l'espacement */}
          <XAxis
            xAxisId="labels"
            type="category"
            dataKey="label"
            tick={{fontSize: 12, fill: "#FFFFFF", opacity: 0.6, fontWeight: 500}}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            padding={{left: 20, right: 20}} // Espacement pour les labels des jours
          />

          {/* Axe Y masqué mais utilisé pour le layout et le domaine */}
          <YAxis hide domain={yDomain} />

          {/* Tooltip personnalisé sans barre verticale */}
          <Tooltip content={SessionTooltip} cursor={false} />

          {/* Courbe principale avec dégradé */}
          <Line
            xAxisId="line"
            type="natural"
            dataKey="value"
            stroke="url(#lineGradient)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{r: 4, stroke: "#FFFFFF", strokeWidth: 8, fill: "#FFFFFF", strokeOpacity: 0.7}}
          />

          {/* Définition du dégradé pour la ligne */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" /> {/* Blanc transparent à gauche */}
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" /> {/* Blanc opaque à droite */}
            </linearGradient>
          </defs>

          {/* Point épinglé (verrouillé) quand on a cliqué */}
          {pinnedIndex != null && (
            <ReferenceDot
              xAxisId="line"
              x={pinnedIndex + 1} // Position X basée sur l'index épinglé
              y={chartData[pinnedIndex].value} // Position Y basée sur la valeur
              r={4} // Rayon du point
              fill="#FFFFFF"
              stroke="#FFFFFF"
              strokeWidth={8}
              strokeOpacity={0.7}
              isFront
            />
          )}
        </RechartsLineChart>
      </ResponsiveContainer>

      {/* BANDE FONCÉE (au clic) — via CSS, en dehors du ResponsiveContainer */}
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

/**
 * Validation des propriétés du composant
 */
LineChart.propTypes = {
  data: PropTypes.shape({
    userId: PropTypes.number,
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.number, // Jour de la semaine (1-7)
        sessionLength: PropTypes.number // Durée de la session en minutes
      })
    )
  })
};
