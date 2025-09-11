import {useState, useEffect} from "react";
import {getUserSessions} from "../../../api/user";
import {mapSessions} from "../mappers/mapSessions";

/**
 * Hook personnalisé pour gérer les données de sessions d'entraînement
 * Encapsule la logique de récupération, transformation et gestion d'état des données de sessions
 * @param {number} userId - Identifiant de l'utilisateur
 * @returns {Object} État et données de sessions
 * @returns {Object} returns.sessions - Données de sessions mappées avec sessions
 * @returns {boolean} returns.loading - État de chargement des données
 * @returns {string|null} returns.error - Message d'erreur éventuel
 * @returns {function} returns.refetch - Fonction pour recharger les données
 * @returns {function} returns.clearError - Fonction pour effacer l'erreur
 *
 * @example
 * ```jsx
 * function SessionsChart({ userId }) {
 *   const { sessions, loading, error, refetch } = useSessionsData(userId);
 *
 *   if (loading) return <div>Chargement des sessions...</div>;
 *   if (error) return <div>Erreur: {error}</div>;
 *
 *   return (
 *     <LineChart data={sessions.sessions} />
 *   );
 * }
 * ```
 */
export function useSessionsData(userId) {
  /**
   * État des données de sessions
   * @type {[Object, function]} sessions - Données de sessions avec sessions
   */
  const [sessions, setSessions] = useState({sessions: []});

  /**
   * État de chargement
   * @type {[boolean, function]} loading - Indique si les données sont en cours de chargement
   */
  const [loading, setLoading] = useState(true);

  /**
   * État d'erreur
   * @type {[string|null, function]} error - Message d'erreur éventuel
   */
  const [error, setError] = useState(null);

  /**
   * Fonction pour récupérer les données de sessions
   * Gère le chargement, la transformation et la gestion d'erreurs
   * @async
   * @function fetchSessions
   */
  const fetchSessions = async () => {
    if (!userId) {
      setError("ID utilisateur requis");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Récupération des données brutes depuis l'API
      const sessionsData = await getUserSessions(userId);

      // Transformation des données via le mapper
      const mappedSessions = mapSessions(sessionsData);

      setSessions(mappedSessions);
    } catch (err) {
      const errorMessage = err.message || "Erreur lors du chargement des sessions";
      setError(errorMessage);
      console.error("Erreur useSessionsData:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fonction pour effacer l'erreur actuelle
   * @function clearError
   */
  const clearError = () => {
    setError(null);
  };

  /**
   * Effet pour charger les données de sessions au montage et lors du changement d'userId
   * Utilise un flag mounted pour éviter les mises à jour sur composant démonté
   */
  useEffect(() => {
    let mounted = true;

    if (userId) {
      fetchSessions().then(() => {
        if (!mounted) {
          // Éviter les mises à jour si le composant est démonté
          return;
        }
      });
    } else {
      setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, [userId]);

  return {
    sessions,
    loading,
    error,
    refetch: fetchSessions,
    clearError
  };
}
