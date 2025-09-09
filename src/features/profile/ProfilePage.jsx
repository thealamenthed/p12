import React, {useEffect, useState} from "react";
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

import {getUser, getUserActivity, getUserSessions, getUserPerformance} from "../../api/user";
import {mapUser} from "./mappers/mapUser";
import {mapActivity} from "./mappers/mapActivity";
import {mapSessions} from "./mappers/mapSessions";
import {mapPerformance} from "./mappers/mapPerformance";

/**
 * Page de profil utilisateur avec tableau de bord complet
 * Affiche les données de performance, activité et KPIs de l'utilisateur
 * @param {Object} props - Propriétés du composant
 * @param {number} [props.userId=12] - Identifiant de l'utilisateur à afficher
 * @returns {JSX.Element} Page de profil avec graphiques et indicateurs
 */
export default function ProfilePage({userId = 12}) {
  /**
   * États de gestion de l'interface utilisateur
   * @type {[boolean, function]} loading - État de chargement des données
   * @type {[string|null, function]} err - Message d'erreur éventuel
   */
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  /**
   * États des données utilisateur
   * @type {[Object|null, function]} user - Données utilisateur mappées
   * @type {[Object, function]} activity - Données d'activité avec sessions
   * @type {[Object, function]} sessions - Données de sessions d'entraînement
   * @type {[Object, function]} performance - Données de performance avec catégories
   */
  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState({sessions: []});
  const [sessions, setSessions] = useState({sessions: []});
  const [performance, setPerformance] = useState({kind: {}, data: []});

  /**
   * Effet de chargement des données utilisateur
   * Charge toutes les données en parallèle et gère les états de chargement/erreur
   * Utilise un flag mounted pour éviter les mises à jour sur composant démonté
   */
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setErr(null);

        // Chargement parallèle de toutes les données
        const [u, a, s, p] = await Promise.all([getUser(userId), getUserActivity(userId), getUserSessions(userId), getUserPerformance(userId)]);

        if (!mounted) return;
        // Mapping des données brutes vers le format attendu par les composants
        setUser(mapUser(u));
        setActivity(mapActivity(a));
        setSessions(mapSessions(s));
        setPerformance(mapPerformance(p));
      } catch (e) {
        if (mounted) setErr(e.message || String(e));
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [userId]);

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
        {err ? <p style={{color: "#E60000", margin: 0}}>Erreur de chargement : {err}</p> : null}
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
