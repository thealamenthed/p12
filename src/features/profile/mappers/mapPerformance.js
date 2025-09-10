/**
 * Transforme les données de performance pour le RadarChart
 * Convertit les données API vers le format attendu par le composant RadarChart
 * Préserve la structure kind/data pour le réordonnancement par l'UI
 * @param {Object} api - Données brutes de l'API performance
 * @param {Object} [api.data] - Données principales de performance
 * @param {Object} [api.data.kind] - Mapping des IDs vers les noms de catégories
 * @param {Array} [api.data.data] - Tableau des valeurs de performance
 * @param {number} [api.data.data[].value] - Valeur de performance
 * @param {number} [api.data.data[].kind] - ID de la catégorie de performance
 * @returns {Object} Données de performance mappées pour RadarChart
 * @returns {Object} returns.kind - Mapping des catégories (inchangé)
 * @returns {Array} returns.data - Tableau des performances formatées
 * @returns {number} returns.data[].value - Valeur de performance
 * @returns {number} returns.data[].kind - ID de catégorie
 */
export function mapPerformance(api) {
  const data = api?.data?.data || [];
  const kind = api?.data?.kind || {};
  return {
    kind,
    data: data.map((d) => ({value: Number(d.value) || 0, kind: Number(d.kind) || 0}))
  };
}
