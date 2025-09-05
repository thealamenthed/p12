// BarChart attend: { sessions:[{ day: 1..N, kilogram, calories }] }
export function mapActivity(api) {
  const sessions = api?.data?.sessions || [];
  // l’API renvoie day en ISO string — on projette en 1..N (ordre d’arrivée)
  const out = sessions.map((s, i) => ({
    day: i + 1,
    kilogram: Number(s.kilogram) || 0,
    calories: Number(s.calories) || 0
  }));
  return {sessions: out};
}
