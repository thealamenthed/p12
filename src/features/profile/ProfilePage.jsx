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

export default function ProfilePage({userId = 12}) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState({sessions: []});
  const [sessions, setSessions] = useState({sessions: []});
  const [performance, setPerformance] = useState({kind: {}, data: []});

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setErr(null);

        const [u, a, s, p] = await Promise.all([getUser(userId), getUserActivity(userId), getUserSessions(userId), getUserPerformance(userId)]);

        if (!mounted) return;
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

  // KPI list (adapter selon ton KPICard)
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
      <header className="profile-header">
        <h1 className="profile-title">
          Bonjour <span className="user-name">{user?.firstName ?? "Utilisateur"}</span>
        </h1>
        <p className="congratulation-message">{loading ? "Chargement des données…" : "Félicitations ! Vous avez explosé vos objectifs hier 👏"}</p>
        {err ? <p style={{color: "#E60000", margin: 0}}>Erreur de chargement : {err}</p> : null}
      </header>

      <div className="profile-grid">
        <div className="charts-col">
          <div className="chart-container">
            {/* Titre optionnel local : <h3 className="chart-title">Activité quotidienne</h3> */}
            <BarChart data={activity} />
          </div>

          <div className="small-charts-row">
            <div className="chart-container line-chart-wrapper">
              <LineChart data={sessions} />
            </div>
            <div className="chart-container radar-chart-wrapper">
              <RadarChart data={performance} />
            </div>
            <div className="chart-container radial-chart-wrapper">
              <RadialBarChart data={user?.score ?? 0} />
            </div>
          </div>
        </div>

        <aside className="kpi-col">
          {kpis.map((k, i) => (
            <KPICard key={i} title={k.title} value={k.value} unit={k.unit} icon={k.icon} />
          ))}
        </aside>
      </div>
    </section>
  );
}
