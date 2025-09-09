import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer} from "recharts";
import "./RadarChart.css";

/**
 * Mapping des types de performance vers leurs labels français
 * @constant {Object} LABELS - Correspondance clé API -> label affiché
 */
const LABELS = {
  intensity: "Intensité",
  speed: "Vitesse",
  strength: "Force",
  endurance: "Endurance",
  energy: "Énergie",
  cardio: "Cardio"
};

/**
 * Ordre d'affichage des axes du radar (sens horaire)
 * Commence en haut et tourne dans le sens horaire
 * @constant {Array<string>} ORDER - Ordre des catégories de performance
 */
const ORDER = ["intensity", "speed", "strength", "endurance", "energy", "cardio"];

/**
 * Décalage vertical pour le label "Endurance"
 * Ajuste la position pour un meilleur alignement visuel
 * @constant {number} ENDURANCE_DY - Décalage en pixels
 */
const ENDURANCE_DY = 8;

/**
 * Composant graphique radar pour afficher les performances de l'utilisateur
 * Affiche 6 catégories de performance (cardio, énergie, endurance, force, vitesse, intensité)
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.data - Données de performance de l'utilisateur
 * @param {Object} props.data.kind - Mapping des IDs vers les noms de catégories
 * @param {Array} props.data.data - Tableau des valeurs de performance
 * @param {number} props.data.data[].value - Valeur de performance (requis)
 * @param {number} props.data.data[].kind - ID de la catégorie (requis)
 * @returns {JSX.Element} Graphique radar avec 6 axes de performance
 */
export default function RadarChart({data}) {
  /**
   * Sécurisation des données d'entrée
   * Garantit qu'on a toujours des objets valides, même vides
   */
  const kind = data?.kind || {};
  const rawData = Array.isArray(data?.data) ? data.data : [];

  /**
   * Transformation et ordonnancement des données pour le radar
   * Mappe les données API vers le format attendu et les ordonne selon ORDER
   * @returns {Array} Données formatées et ordonnées pour l'affichage
   */
  const chartData = useMemo(() => {
    const mapped = rawData.map((d) => {
      const key = kind[d.kind];
      return {key, subject: LABELS[key] ?? String(key ?? ""), value: Number(d.value) || 0};
    });
    return ORDER.map((k) => mapped.find((r) => r?.key === k)).filter(Boolean);
  }, [rawData, kind]);

  /**
   * Calcul du maximum pour les anneaux du radar
   * Arrondit au multiple de 10 supérieur pour des anneaux "propres"
   * @returns {number} Valeur maximale arrondie ou 100 par défaut
   */
  const max = useMemo(() => {
    if (!chartData.length) return 100;
    const m = Math.max(...chartData.map((d) => d.value));
    return Math.ceil(m / 10) * 10 || 100;
  }, [chartData]);

  /**
   * Rendu personnalisé des étiquettes d'angle
   * Applique un décalage vertical spécifique pour "Endurance"
   * @param {Object} params - Paramètres de rendu du tick
   * @param {Object} params.payload - Données du tick
   * @param {number} params.x - Position X
   * @param {number} params.y - Position Y
   * @param {string} params.textAnchor - Ancrage du texte
   * @returns {JSX.Element} Élément texte stylisé
   */
  const renderAngleTick = ({payload, x, y, textAnchor}) => {
    const label = payload?.value;
    const dy = label === "Endurance" ? ENDURANCE_DY : 0;
    return (
      <text x={x} y={y} dy={dy} textAnchor={textAnchor} fill="#FFFFFF" fontSize={14} fontWeight={600}>
        {label}
      </text>
    );
  };

  return (
    <div className="radar-chart-container">
      {/* Overlay "no data" si vide */}
      {!chartData.length && <div className="chart-error">Aucune donnée disponible</div>}

      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={chartData} outerRadius="70%" margin={{top: 16, right: 16, bottom: 16, left: 16}}>
          {/* Grille polaire polygonale sans lignes radiales */}
          <PolarGrid gridType="polygon" radialLines={false} stroke="rgba(255,255,255,0.8)" />

          {/* Axe des angles avec rendu personnalisé des étiquettes */}
          <PolarAngleAxis dataKey="subject" tick={renderAngleTick} />

          {/* Axe des rayons avec 5 anneaux concentriques */}
          <PolarRadiusAxis
            domain={[0, max]}
            tickCount={6} // 5 anneaux visibles
            tick={false}
            axisLine={false}
            angle={90}
          />

          {/* Zone radar rouge avec transparence */}
          <Radar dataKey="value" stroke="transparent" fill="#FF0101" fillOpacity={0.6} />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}

RadarChart.propTypes = {
  data: PropTypes.shape({
    kind: PropTypes.object,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
        kind: PropTypes.number
      })
    )
  })
};
