import React, {useMemo, useState} from "react";
import {LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot, ReferenceArea} from "recharts";
import "./LineChart.css";

/**
 * Mapping des jours de la semaine pour l'affichage des labels
 * @constant {Object} dayMap - Correspondance jour numérique -> lettre
 */
const dayMap = {1: "L", 2: "M", 3: "M", 4: "J", 5: "V", 6: "S", 7: "D"};

/**
 * Composant de tooltip personnalisé pour le graphique en ligne
 * Affiche la durée de session en minutes avec un style blanc simple
 * @param {boolean} active - Indique si le tooltip est actif
 * @param {Array} payload - Données du point survolé
 * @returns {JSX.Element|null} Tooltip stylisé ou null si inactif
 */
function SessionTooltip({active, payload}) {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value;
  return <div style={{background: "#FFFFFF", color: "#000", padding: "6px 8px", fontSize: 12}}>{val} min</div>;
}

/**
 * Composant graphique en ligne pour afficher la durée moyenne des sessions
 * Affiche une courbe avec interaction de clic pour épingler un point et créer une zone sombre
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.data - Données des sessions de l'utilisateur
 * @param {number} props.data.userId - Identifiant de l'utilisateur
 * @param {Array} props.data.sessions - Tableau des sessions
 * @param {number} props.data.sessions[].day - Jour de la semaine (1-7)
 * @param {number} props.data.sessions[].sessionLength - Durée de la session en minutes (requis)
 * @returns {JSX.Element} Graphique en ligne interactif avec fonctionnalité d'épinglage
 */
export default function LineChart({data}) {
  /**
   * États pour la gestion de l'interactivité
   * @type {[number|null, function]} pinnedIndex - Index du point épinglé
   * @type {[number|null, function]} hoverIndex - Index du point survolé
   */
  const [pinnedIndex, setPinnedIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  /**
   * Sécurisation des données d'entrée
   * Garantit qu'on a toujours un tableau, même vide
   */
  const sessions = Array.isArray(data?.sessions) ? data.sessions : [];

  /**
   * Transformation des données pour l'affichage
   * Crée un dataset avec axe géométrique numérique et labels visuels
   * @returns {Array} Données formatées pour le graphique
   */
  const chartData = useMemo(
    () =>
      sessions.map((s, i) => ({
        xi: i + 1, // Position géométrique (1, 2, 3...)
        label: dayMap[s.day] || s.day, // Label visible (L, M, M, J...)
        value: s.sessionLength // Valeur à afficher
      })),
    [sessions]
  );

  const N = chartData.length;

  /**
   * Calcul du domaine Y avec padding automatique
   * Ajoute une marge de 15% pour que la courbe ne touche pas les bords
   * @returns {Array} Domaine Y [min, max] avec padding
   */
  const yDomain = useMemo(() => {
    if (!N) return [0, 1]; // Domaine par défaut si pas de données
    const vals = chartData.map((d) => d.value);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const pad = Math.max(5, Math.round((max - min) * 0.15)); // 15% de padding minimum 5
    return [min - pad, max + pad];
  }, [chartData, N]);

  /**
   * Vérification si un point est épinglé
   * @type {boolean} hasPin - True si un point valide est épinglé
   */
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
      {/* Titre overlay avec style absolu */}
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

      {/* Message d'absence de données */}
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
            /**
             * Gestion du survol pour mettre à jour l'index de hover
             */
            const idx = st?.activeIndex != null ? parseInt(st.activeIndex) : null;
            setHoverIndex(idx);
          }}
          onClick={(st) => {
            /**
             * Gestion du clic pour épingler/désépingler un point
             * Utilise activeIndex ou fallback sur hoverIndex
             */
            console.log("LineChart click:", st);
            let idx = st?.activeIndex != null ? parseInt(st.activeIndex) : null;
            if (idx == null && typeof hoverIndex === "number") idx = hoverIndex;
            console.log("Setting pinnedIndex to:", idx);
            setPinnedIndex((prev) => (idx == null ? null : prev === idx ? null : idx));
          }}>
          {/* Axe X géométrique : numérique, caché, sans padding */}
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

          {/* Axe X des labels : visible, avec padding pour les jours */}
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

          {/* Axe Y masqué avec domaine calculé */}
          <YAxis hide domain={yDomain} />

          {/* Tooltip personnalisé sans curseur vertical */}
          <Tooltip content={<SessionTooltip />} cursor={false} />
          {/* Zone de référence sombre à partir du point épinglé */}
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

          {/* Courbe principale avec style personnalisé */}
          <Line
            xAxisId="line"
            type="natural"
            dataKey="value"
            stroke="#FFFFFF"
            strokeOpacity={0.8}
            strokeWidth={2.5}
            dot={false}
            activeDot={{r: 6, fill: "#FFFFFF", stroke: "none"}} // Point actif plein, sans halo
            isAnimationActive={false}
          />

          {/* Point épinglé permanent */}
          {hasPin && <ReferenceDot xAxisId="line" x={pinnedIndex + 1} y={chartData[pinnedIndex].value} r={6} fill="#FFFFFF" stroke="none" isFront />}
        </RechartsLineChart>
      </ResponsiveContainer>

      {/* Overlay sombre externe pour l'effet visuel d'épinglage */}
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
