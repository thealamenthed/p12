import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import "./ProfilePage.css";

// Composants de graphiques
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import RadarChart from "./components/RadarChart";
import RadialBarChart from "./components/RadialBarChart";
import KPICard from "./components/KPICard";

// Hooks et services
import {useUserData} from "./hooks/useUserData";
import {useActivityData} from "./hooks/useActivityData";
import {useSessionsData} from "./hooks/useSessionsData";
import {usePerformanceData} from "./hooks/usePerformanceData";

// Icônes
import energyIcon from "../../assets/icons/energy.svg";
import chickenIcon from "../../assets/icons/chicken.svg";
import appleIcon from "../../assets/icons/apple.svg";
import cheeseburgerIcon from "../../assets/icons/cheeseburger.svg";

/**
 * Page de profil utilisateur avec tableau de bord d'analytics
 * @returns {JSX.Element} La page de profil avec tous les graphiques
 */
const ProfilePage = () => {
  const [userId] = useState(12); // ID utilisateur par défaut

  // Récupération des données via les hooks personnalisés
  const {userData, loading: userLoading, error: userError} = useUserData(userId);
  const {activityData, loading: activityLoading} = useActivityData(userId);
  const {sessionsData, loading: sessionsLoading} = useSessionsData(userId);
  const {performanceData, loading: performanceLoading} = usePerformanceData(userId);

  if (userLoading || activityLoading || sessionsLoading || performanceLoading) {
    return <div className="loading">Chargement des données...</div>;
  }

  if (userError) {
    return <div className="error">Erreur lors du chargement des données: {userError}</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>
          Bonjour <span className="user-name">{userData?.userInfos?.firstName || "Thomas"}</span>
        </h2>
        <p className="congratulation-message">Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
      </div>

      <div className="dashboard-grid">
        {/* Section des graphiques */}
        <div className="charts-section">
          {/* Graphique d'activité */}
          <div className="chart-container large">
            <BarChart data={activityData} />
          </div>

          {/* Deuxième ligne : LineChart, RadarChart et RadialBarChart */}
          <div className="bottom-row">
            <div className="chart-container line-chart-wrapper">
              <h3>
                Durée moyenne des
                <br />
                sessions
              </h3>
              <LineChart data={sessionsData} />
            </div>

            <div className="chart-container radar-chart-wrapper">
              <h3>Intensité</h3>
              <RadarChart data={performanceData} />
            </div>

            <div className="chart-container radial-chart-wrapper">
              <h3>Score</h3>
              <RadialBarChart data={userData?.score || 0.12} />
            </div>
          </div>
        </div>

        {/* Section KPI */}
        <div className="kpi-grid">
          <KPICard title="Calories" value={userData?.keyData?.calorieCount || 1930} unit="kCal" icon={energyIcon} />
          <KPICard title="Proteines" value={userData?.keyData?.proteinCount || 155} unit="g" icon={chickenIcon} />
          <KPICard title="Glucides" value={userData?.keyData?.carbohydrateCount || 290} unit="g" icon={appleIcon} />
          <KPICard title="Lipides" value={userData?.keyData?.lipidCount || 50} unit="g" icon={cheeseburgerIcon} />
        </div>
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  // Aucune prop requise pour ce composant
};

export default ProfilePage;
