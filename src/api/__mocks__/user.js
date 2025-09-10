/**
 * Génère des données utilisateur mockées pour les tests et le développement
 * @param {number} [id=12] - Identifiant de l'utilisateur mocké
 * @returns {Object} Données utilisateur mockées au format API
 * @returns {Object} returns.data - Données principales de l'utilisateur
 * @returns {number} returns.data.id - Identifiant utilisateur
 * @returns {Object} returns.data.userInfos - Informations personnelles
 * @returns {string} returns.data.userInfos.firstName - Prénom
 * @returns {string} returns.data.userInfos.lastName - Nom
 * @returns {number} returns.data.userInfos.age - Âge
 * @returns {number} returns.data.todayScore - Score du jour (0-1)
 * @returns {Object} returns.data.keyData - Données nutritionnelles
 * @returns {number} returns.data.keyData.calorieCount - Calories
 * @returns {number} returns.data.keyData.proteinCount - Protéines
 * @returns {number} returns.data.keyData.carbohydrateCount - Glucides
 * @returns {number} returns.data.keyData.lipidCount - Lipides
 */
export const mockUser = (id = 12) => ({
  data: {
    id,
    userInfos: {firstName: "Thomas", lastName: "Dovineau", age: 31},
    todayScore: 0.29,
    keyData: {calorieCount: 2330, proteinCount: 185, carbohydrateCount: 270, lipidCount: 70}
  }
});

/**
 * Données d'activité mockées pour le BarChart
 * Contient 10 sessions avec poids et calories sur une période
 * @constant {Object} mockActivity - Données d'activité mockées
 * @property {Object} mockActivity.data - Données principales
 * @property {Array} mockActivity.data.sessions - Sessions d'activité
 * @property {string} mockActivity.data.sessions[].day - Jour au format ISO
 * @property {number} mockActivity.data.sessions[].kilogram - Poids en kg
 * @property {number} mockActivity.data.sessions[].calories - Calories brûlées
 */
export const mockActivity = {
  data: {
    sessions: [
      {day: "2020-07-01", kilogram: 80, calories: 240},
      {day: "2020-07-02", kilogram: 80, calories: 220},
      {day: "2020-07-03", kilogram: 81, calories: 280},
      {day: "2020-07-04", kilogram: 81, calories: 290},
      {day: "2020-07-05", kilogram: 80, calories: 160},
      {day: "2020-07-06", kilogram: 78, calories: 162},
      {day: "2020-07-07", kilogram: 76, calories: 390},
      {day: "2020-07-08", kilogram: 76, calories: 390},
      {day: "2020-07-09", kilogram: 76, calories: 390},
      {day: "2020-07-10", kilogram: 76, calories: 390}
    ]
  }
};

/**
 * Données de sessions mockées pour le LineChart
 * Contient 7 sessions correspondant aux jours de la semaine (1-7)
 * @constant {Object} mockSessions - Données de sessions mockées
 * @property {Object} mockSessions.data - Données principales
 * @property {Array} mockSessions.data.sessions - Sessions d'entraînement
 * @property {number} mockSessions.data.sessions[].day - Jour de la semaine (1-7)
 * @property {number} mockSessions.data.sessions[].sessionLength - Durée en minutes
 */
export const mockSessions = {
  data: {
    sessions: [
      {day: 1, sessionLength: 60},
      {day: 2, sessionLength: 50},
      {day: 3, sessionLength: 45},
      {day: 4, sessionLength: 50},
      {day: 5, sessionLength: 20},
      {day: 6, sessionLength: 10},
      {day: 7, sessionLength: 60}
    ]
  }
};

/**
 * Données de performance mockées pour le RadarChart
 * Contient 6 catégories de performance avec leurs valeurs
 * @constant {Object} mockPerformance - Données de performance mockées
 * @property {Object} mockPerformance.data - Données principales
 * @property {Object} mockPerformance.data.kind - Mapping des IDs vers les catégories
 * @property {string} mockPerformance.data.kind[1] - "cardio"
 * @property {string} mockPerformance.data.kind[2] - "energy"
 * @property {string} mockPerformance.data.kind[3] - "endurance"
 * @property {string} mockPerformance.data.kind[4] - "strength"
 * @property {string} mockPerformance.data.kind[5] - "speed"
 * @property {string} mockPerformance.data.kind[6] - "intensity"
 * @property {Array} mockPerformance.data.data - Valeurs de performance
 * @property {number} mockPerformance.data.data[].value - Valeur de performance
 * @property {number} mockPerformance.data.data[].kind - ID de la catégorie
 */
export const mockPerformance = {
  data: {
    kind: {1: "cardio", 2: "energy", 3: "endurance", 4: "strength", 5: "speed", 6: "intensity"},
    data: [
      {value: 80, kind: 1},
      {value: 120, kind: 2},
      {value: 140, kind: 3},
      {value: 50, kind: 4},
      {value: 200, kind: 5},
      {value: 90, kind: 6}
    ]
  }
};
