/**
 * Transforme les données utilisateur de l'API vers le format attendu par les composants
 * Gère la compatibilité entre 'todayScore' et 'score' selon la version de l'API
 * @param {Object} api - Données brutes de l'API utilisateur
 * @param {Object} [api.data] - Données principales de l'utilisateur
 * @param {number} [api.data.id] - Identifiant de l'utilisateur
 * @param {Object} [api.data.userInfos] - Informations personnelles
 * @param {string} [api.data.userInfos.firstName] - Prénom de l'utilisateur
 * @param {Object} [api.data.keyData] - Données nutritionnelles
 * @param {number} [api.data.keyData.calorieCount] - Nombre de calories
 * @param {number} [api.data.keyData.proteinCount] - Nombre de protéines
 * @param {number} [api.data.keyData.carbohydrateCount] - Nombre de glucides
 * @param {number} [api.data.keyData.lipidCount] - Nombre de lipides
 * @param {number} [api.data.todayScore] - Score du jour (API v1)
 * @param {number} [api.data.score] - Score utilisateur (API v2)
 * @returns {Object} Données utilisateur mappées
 * @returns {number} returns.id - Identifiant utilisateur
 * @returns {string} returns.firstName - Prénom ou "Utilisateur" par défaut
 * @returns {Object} returns.keyData - Données nutritionnelles normalisées
 * @returns {number} returns.keyData.calories - Calories (calorieCount)
 * @returns {number} returns.keyData.proteins - Protéines (proteinCount)
 * @returns {number} returns.keyData.carbs - Glucides (carbohydrateCount)
 * @returns {number} returns.keyData.lipids - Lipides (lipidCount)
 * @returns {number} returns.score - Score utilisateur (todayScore ou score)
 */
export function mapUser(api) {
  const d = api?.data || {};
  const infos = d.userInfos || {};
  // 'todayScore' OU 'score' selon l'API
  const score = typeof d.todayScore === "number" ? d.todayScore : d.score ?? 0;
  return {
    id: d.id,
    firstName: infos.firstName || "Utilisateur",
    keyData: {
      calories: d.keyData?.calorieCount ?? 0,
      proteins: d.keyData?.proteinCount ?? 0,
      carbs: d.keyData?.carbohydrateCount ?? 0,
      lipids: d.keyData?.lipidCount ?? 0
    },
    score
  };
}
