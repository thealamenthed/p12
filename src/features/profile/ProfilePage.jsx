import React from "react";
import PropTypes from "prop-types";
import "./ProfilePage.css";

import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import RadarChart from "./components/RadarChart";
import RadialBarChart from "./components/RadialBarChart";
import KPICard from "./components/KPICard";
import caloriesIcon from "../../assets/icons/energy.svg";
import proteinIcon from "../../assets/icons/chicken.svg";
import carbsIcon from "../../assets/icons/apple.svg";
import lipidIcon from "../../assets/icons/cheeseburger.svg";

// Import des hooks personnalisés
import {useUserData, useActivityData, useSessionsData, usePerformanceData} from "./hooks";

/**
 * Page de profil utilisateur avec tableau de bord complet
 * Affiche les données de performance, activité et KPIs de l'utilisateur
 * Utilise des hooks personnalisés pour la gestion des données
 * @param {Object} props - Propriétés du composant
 * @param {number} [props.userId=12] - Identifiant de l'utilisateur à afficher
 * @returns {JSX.Element} Page de profil avec graphiques et indicateurs
 */
export default function ProfilePage({userId = 12}) {
  /**
   * Hooks personnalisés pour la gestion des données
   * Chaque hook gère son propre état de chargement et d'erreur
   */
  const {user, loading: userLoading, error: userError} = useUserData(userId);
  const {activity, loading: activityLoading, error: activityError} = useActivityData(userId);
  const {sessions, loading: sessionsLoading, error: sessionsError} = useSessionsData(userId);
  const {performance, loading: performanceLoading, error: performanceError} = usePerformanceData(userId);

  /**
   * États globaux dérivés des hooks individuels
   * @type {boolean} loading - État de chargement global (true si au moins un hook charge)
   * @type {string|null} error - Première erreur rencontrée parmi tous les hooks
   */
  const loading = userLoading || activityLoading || sessionsLoading || performanceLoading;
  const error = userError || activityError || sessionsError || performanceError;

  /**
   * Configuration des cartes KPI à afficher
   * Transforme les données utilisateur en format attendu par KPICard
   * @type {Array} kpis - Liste des indicateurs clés de performance
   */
  const kpis = user?.keyData
    ? [
        {title: "Calories", value: user.keyData.calories, unit: "kCal", icon: caloriesIcon},
        {title: "Protéines", value: user.keyData.proteins, unit: "g", icon: proteinIcon},
        {title: "Glucides", value: user.keyData.carbs, unit: "g", icon: carbsIcon},
        {title: "Lipides", value: user.keyData.lipids, unit: "g", icon: lipidIcon}
      ]
    : [];

  return (
    <section className="profile-page">
      {/* En-tête avec salutation et message de félicitations */}
      <header className="profile-header">
        <h1 className="profile-title">
          Bonjour <span className="user-name">{user?.firstName ?? "Utilisateur"}</span>
        </h1>
        <p className="congratulation-message">{loading ? "Chargement des données…" : "Félicitations ! Vous avez explosé vos objectifs hier 👏"}</p>
        {error ? <p style={{color: "#E60000", margin: 0}}>Erreur de chargement : {error}</p> : null}
      </header>

      {/* Grille principale avec graphiques et KPIs */}
      <div className="profile-grid">
        {/* Colonne des graphiques */}
        <div className="charts-col">
          {/* Graphique principal : activité quotidienne */}
          <div className="chart-container">
            <BarChart data={activity} />
          </div>

          {/* Ligne des petits graphiques */}
          <div className="small-charts-row">
            {/* Graphique en ligne : durée des sessions */}
            <div className="chart-container line-chart-wrapper">
              <LineChart data={sessions} />
            </div>
            {/* Graphique radar : performances */}
            <div className="chart-container radar-chart-wrapper">
              <RadarChart data={performance} />
            </div>
            {/* Graphique radial : score utilisateur */}
            <div className="chart-container radial-chart-wrapper">
              <RadialBarChart data={user?.score ?? 0} />
            </div>
          </div>
        </div>

        {/* Colonne des indicateurs KPI */}
        <aside className="kpi-col">
          {kpis.map((k, i) => (
            <KPICard key={i} title={k.title} value={k.value} unit={k.unit} icon={k.icon} />
          ))}
        </aside>
      </div>
    </section>
  );
}

/**
 * Validation des props avec PropTypes
 * Définit les types et contraintes pour les propriétés du composant
 */
ProfilePage.propTypes = {
  /**
   * Identifiant de l'utilisateur à afficher
   * @type {number} userId - ID numérique de l'utilisateur
   */
  userId: PropTypes.number
};
