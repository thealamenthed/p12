/**
 * Transforme les données d'activité quotidienne pour le BarChart
 * Convertit les données API vers le format attendu par le composant BarChart
 * Projette les jours ISO en séquence numérique (1, 2, 3...)
 * @param {Object} api - Données brutes de l'API activité
 * @param {Object} [api.data] - Données principales de l'activité
 * @param {Array} [api.data.sessions] - Tableau des sessions d'activité
 * @param {string} [api.data.sessions[].day] - Jour au format ISO string
 * @param {number} [api.data.sessions[].kilogram] - Poids en kilogrammes
 * @param {number} [api.data.sessions[].calories] - Calories brûlées
 * @returns {Object} Données d'activité mappées pour BarChart
 * @returns {Array} returns.sessions - Tableau des sessions formatées
 * @returns {number} returns.sessions[].day - Jour en séquence (1, 2, 3...)
 * @returns {number} returns.sessions[].kilogram - Poids en kg
 * @returns {number} returns.sessions[].calories - Calories brûlées
 */
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
