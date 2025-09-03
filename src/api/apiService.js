import axios from "axios";

/**
 * Configuration de l'API avec Axios
 *
 * LOGIQUE DE CONFIGURATION :
 * 1. VITE_USE_MOCK=true  → Utilise les données mockées (développement sans backend)
 * 2. VITE_USE_MOCK=false → Utilise l'API réelle (développement avec backend)
 * 3. En cas d'erreur API → Fallback automatique vers les mocks
 */
// Configuration de l'API backend
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Configuration des mocks
// VITE_USE_MOCK=true  → USE_MOCK=true  (utilise les données mockées)
// VITE_USE_MOCK=false → USE_MOCK=false (utilise l'API réelle)
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

// Log de configuration pour le débogage
console.log(" Configuration API:", {
  API_BASE_URL,
  USE_MOCK,
  NODE_ENV: import.meta.env.NODE_ENV,
  "VITE_USE_MOCK (env)": import.meta.env.VITE_USE_MOCK,
  "USE_MOCK (computed)": USE_MOCK
});

// Configuration d'Axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

/**
 * Intercepteur pour gérer les erreurs globalement
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erreur API:", error);
    return Promise.reject(error);
  }
);

/**
 * Service API pour les données utilisateur
 */
export const userService = {
  /**
   * Récupère les données d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Object>} Données de l'utilisateur
   */
  async getUserData(userId) {
    // DÉCISION : Mocks vs API réelle
    if (USE_MOCK) {
      console.log(" Utilisation des données mockées pour getUserData");
      return getMockUserData(userId);
    }

    // UTILISATION DE L'API RÉELLE
    try {
      console.log("Appel API réel: GET /user/${userId}");
      const response = await apiClient.get(`/user/${userId}`);
      // L'API retourne {data: {...}}, on extrait le contenu
      return response.data.data;
    } catch (error) {
      console.error(" Erreur getUserData:", error);
      // FALLBACK : En cas d'erreur API, on utilise les mocks
      console.log(" Fallback vers les données mockées");
      return getMockUserData(userId);
    }
  },

  /**
   * Récupère les données d'activité d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Object>} Données d'activité
   */
  async getActivityData(userId) {
    if (USE_MOCK) {
      console.log(" Utilisation des données mockées pour getActivityData");
      return getMockActivityData(userId);
    }
    try {
      console.log(" Appel API réel: GET /user/${userId}/activity");
      const response = await apiClient.get(`/user/${userId}/activity`);
      // L'API retourne {data: {...}}, on extrait le contenu
      return response.data.data;
    } catch (error) {
      console.error("Erreur getActivityData:", error);
      console.log(" Fallback vers les données mockées");
      return getMockActivityData(userId);
    }
  },

  /**
   * Récupère les données de sessions d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Object>} Données de sessions
   */
  async getSessionsData(userId) {
    if (USE_MOCK) {
      console.log(" Utilisation des données mockées pour getSessionsData");
      return getMockSessionsData(userId);
    }
    try {
      console.log(" Appel API réel: GET /user/${userId}/average-sessions");
      const response = await apiClient.get(`/user/${userId}/average-sessions`);
      // L'API retourne {data: {...}}, on extrait le contenu
      return response.data.data;
    } catch (error) {
      console.error(" Erreur getSessionsData:", error);
      console.log("Fallback vers les données mockées");
      return getMockSessionsData(userId);
    }
  },

  /**
   * Récupère les données de performance d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Object>} Données de performance
   */
  async getPerformanceData(userId) {
    if (USE_MOCK) {
      console.log(" Utilisation des données mockées pour getPerformanceData");
      return getMockPerformanceData(userId);
    }
    try {
      console.log("Appel API réel: GET /user/${userId}/performance");
      const response = await apiClient.get(`/user/${userId}/performance`);
      // L'API retourne {data: {...}}, on extrait le contenu
      return response.data.data;
    } catch (error) {
      console.error(" Erreur getPerformanceData:", error);
      console.log(" Fallback vers les données mockées");
      return getMockPerformanceData(userId);
    }
  }
};

/**
 * Données mockées pour le développement
 */
const getMockUserData = (userId) => {
  return Promise.resolve({
    id: userId,
    userInfos: {
      firstName: "Thomas",
      lastName: "Dovineau",
      age: 31
    },
    score: 0.19,
    keyData: {
      calorieCount: 2000,
      proteinCount: 200,
      carbohydrateCount: 180,
      lipidCount: 60
    }
  });
};

const getMockActivityData = (userId) => {
  return Promise.resolve({
    userId: userId,
    sessions: [
      {day: "2020-07-01", kilogram: 82, calories: 260},
      {day: "2020-07-02", kilogram: 82, calories: 280},
      {day: "2020-07-03", kilogram: 82, calories: 290},
      {day: "2020-07-04", kilogram: 88, calories: 280},
      {day: "2020-07-05", kilogram: 78, calories: 170},
      {day: "2020-07-06", kilogram: 81, calories: 182},
      {day: "2020-07-07", kilogram: 83, calories: 400},
      {day: "2020-07-08", kilogram: 76, calories: 360},
      {day: "2020-07-09", kilogram: 75, calories: 220},
      {day: "2020-07-10", kilogram: 79, calories: 210}
    ]
  });
};

const getMockSessionsData = (userId) => {
  return Promise.resolve({
    userId: userId,
    sessions: [
      {day: 1, sessionLength: 10},
      {day: 2, sessionLength: 23},
      {day: 3, sessionLength: 35},
      {day: 4, sessionLength: 60},
      {day: 5, sessionLength: 20},
      {day: 6, sessionLength: 40},
      {day: 7, sessionLength: 65}
    ]
  });
};

const getMockPerformanceData = (userId) => {
  return Promise.resolve({
    userId: userId,
    kind: {
      1: "cardio",
      2: "energy",
      3: "endurance",
      4: "strength",
      5: "speed",
      6: "intensity"
    },
    data: [
      {value: 70, kind: 1},
      {value: 140, kind: 2},
      {value: 120, kind: 3},
      {value: 60, kind: 4},
      {value: 100, kind: 5},
      {value: 70, kind: 6}
    ]
  });
};

export default apiClient;
