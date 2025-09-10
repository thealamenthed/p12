/**
 * Transforme les données de sessions d'entraînement pour le LineChart
 * Convertit les données API vers le format attendu par le composant LineChart
 * @param {Object} api - Données brutes de l'API sessions
 * @param {Object} [api.data] - Données principales des sessions
 * @param {Array} [api.data.sessions] - Tableau des sessions d'entraînement
 * @param {string|number} [api.data.sessions[].day] - Jour de la session (1-7)
 * @param {number} [api.data.sessions[].sessionLength] - Durée de la session en minutes
 * @returns {Object} Données de sessions mappées pour LineChart
 * @returns {Array} returns.sessions - Tableau des sessions formatées
 * @returns {number} returns.sessions[].day - Jour de la semaine (1-7)
 * @returns {number} returns.sessions[].sessionLength - Durée en minutes
 */
export function mapSessions(api) {
  const sessions = api?.data?.sessions || [];
  return {
    sessions: sessions.map((s) => ({
      day: Number(s.day) || 0,
      sessionLength: Number(s.sessionLength) || 0
    }))
  };
}
