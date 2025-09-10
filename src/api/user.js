import {api, USE_MOCK} from "./client";
import {mockUser, mockActivity, mockSessions, mockPerformance} from "./__mocks__/user";

/**
 * Récupère les données utilisateur depuis l'API ou les mocks
 * @param {number} id - Identifiant de l'utilisateur
 * @returns {Promise<Object>} Données utilisateur (API ou mockées)
 * @returns {Object} returns.data - Données principales de l'utilisateur
 * @returns {number} returns.data.id - Identifiant utilisateur
 * @returns {Object} returns.data.userInfos - Informations personnelles
 * @returns {Object} returns.data.keyData - Données nutritionnelles
 * @returns {number} returns.data.todayScore - Score du jour (0-1)
 */
export async function getUser(id) {
  if (USE_MOCK) return mockUser(id);
  return api.get(`/user/${id}`);
}

/**
 * Récupère les données d'activité utilisateur depuis l'API ou les mocks
 * @param {number} id - Identifiant de l'utilisateur
 * @returns {Promise<Object>} Données d'activité (API ou mockées)
 * @returns {Object} returns.data - Données principales d'activité
 * @returns {Array} returns.data.sessions - Sessions d'activité avec poids et calories
 */
export async function getUserActivity(id) {
  if (USE_MOCK) return mockActivity;
  return api.get(`/user/${id}/activity`);
}

/**
 * Récupère les données de sessions d'entraînement depuis l'API ou les mocks
 * @param {number} id - Identifiant de l'utilisateur
 * @returns {Promise<Object>} Données de sessions (API ou mockées)
 * @returns {Object} returns.data - Données principales de sessions
 * @returns {Array} returns.data.sessions - Sessions avec jour et durée
 */
export async function getUserSessions(id) {
  if (USE_MOCK) return mockSessions;
  return api.get(`/user/${id}/average-sessions`);
}

/**
 * Récupère les données de performance utilisateur depuis l'API ou les mocks
 * @param {number} id - Identifiant de l'utilisateur
 * @returns {Promise<Object>} Données de performance (API ou mockées)
 * @returns {Object} returns.data - Données principales de performance
 * @returns {Object} returns.data.kind - Mapping des IDs vers les catégories
 * @returns {Array} returns.data.data - Valeurs de performance par catégorie
 */
export async function getUserPerformance(id) {
  if (USE_MOCK) return mockPerformance;
  return api.get(`/user/${id}/performance`);
}
