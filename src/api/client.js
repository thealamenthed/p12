/**
 * Configuration de base pour le client API
 * @constant {string} BASE_URL - URL de base de l'API (via .env ou localhost par défaut)
 */
const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "http://localhost:3000";

/**
 * Indicateur pour utiliser les données mockées ou l'API réelle
 * @constant {boolean} USE_MOCK - true si VITE_USE_MOCK="false", false sinon
 */
export const USE_MOCK = String(import.meta.env.VITE_USE_MOCK || "").toLowerCase() === "true";

/**
 * Fonction utilitaire pour effectuer des requêtes HTTP
 * Gère automatiquement les erreurs et le parsing JSON
 * @param {string} path - Chemin de l'endpoint API
 * @param {Object} [init] - Options de la requête fetch
 * @returns {Promise<Object>} Données JSON de la réponse
 * @throws {Error} Erreur HTTP avec code de statut et message
 */
async function http(path, init) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {"Content-Type": "application/json"},
    ...init
  });
  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${message}`);
  }
  return res.json();
}

/**
 * Client API avec méthodes HTTP
 * @constant {Object} api - Interface pour les requêtes API
 * @property {Function} api.get - Méthode GET pour récupérer des données
 */
export const api = {
  /**
   * Effectue une requête GET vers l'API
   * @param {string} path - Chemin de l'endpoint
   * @returns {Promise<Object>} Données JSON de la réponse
   */
  get: (path) => http(path, {method: "GET"})
};

export {BASE_URL};
