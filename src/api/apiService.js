import axios from "axios";

/**
 * Configuration de l'API avec Axios
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

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
    if (USE_MOCK) {
      return getMockUserData(userId);
    }
    const response = await apiClient.get(`/user/${userId}`);
    return response.data;
  },

  /**
   * Récupère les données d'activité d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Object>} Données d'activité
   */
  async getActivityData(userId) {
    if (USE_MOCK) {
      return getMockActivityData(userId);
    }
    const response = await apiClient.get(`/user/${userId}/activity`);
    return response.data;
  },

  /**
   * Récupère les données de sessions d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Object>} Données de sessions
   */
  async getSessionsData(userId) {
    if (USE_MOCK) {
      return getMockSessionsData(userId);
    }
    const response = await apiClient.get(`/user/${userId}/average-sessions`);
    return response.data;
  },

  /**
   * Récupère les données de performance d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Object>} Données de performance
   */
  async getPerformanceData(userId) {
    if (USE_MOCK) {
      return getMockPerformanceData(userId);
    }
    const response = await apiClient.get(`/user/${userId}/performance`);
    return response.data;
  }
};

/**
 * Données mockées pour le développement - correspondant exactement à la maquette
 */
const getMockUserData = (userId) => {
  return Promise.resolve({
    id: userId,
    userInfos: {
      firstName: "Thomas",
      lastName: "Dovineau",
      age: 31
    },
    score: 0.12, // 12% comme dans la maquette
    keyData: {
      calorieCount: 1930,
      proteinCount: 155,
      carbohydrateCount: 290,
      lipidCount: 50
    }
  });
};

const getMockActivityData = (userId) => {
  return Promise.resolve({
    userId: userId,
    sessions: [
      {day: "2020-07-01", kilogram: 80, calories: 240},
      {day: "2020-07-02", kilogram: 80, calories: 220},
      {day: "2020-07-03", kilogram: 81, calories: 280},
      {day: "2020-07-04", kilogram: 81, calories: 290},
      {day: "2020-07-05", kilogram: 80, calories: 160},
      {day: "2020-07-06", kilogram: 78, calories: 162},
      {day: "2020-07-07", kilogram: 76, calories: 390},
      {day: "2020-07-08", kilogram: 77, calories: 320},
      {day: "2020-07-09", kilogram: 79, calories: 280},
      {day: "2020-07-10", kilogram: 78, calories: 250}
    ]
  });
};

const getMockSessionsData = (userId) => {
  return Promise.resolve({
    userId: userId,
    sessions: [
      {day: 1, sessionLength: 30},
      {day: 2, sessionLength: 23},
      {day: 3, sessionLength: 45},
      {day: 4, sessionLength: 50},
      {day: 5, sessionLength: 0},
      {day: 6, sessionLength: 0},
      {day: 7, sessionLength: 60}
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
      {value: 80, kind: 1},
      {value: 120, kind: 2},
      {value: 140, kind: 3},
      {value: 50, kind: 4},
      {value: 200, kind: 5},
      {value: 90, kind: 6}
    ]
  });
};

export default apiClient;
