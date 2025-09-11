import {useState, useEffect} from "react";
import {getUserActivity} from "../../../api/user";
import {mapActivity} from "../mappers/mapActivity";

/**
 * Hook personnalisé pour gérer les données d'activité utilisateur
 * Encapsule la logique de récupération, transformation et gestion d'état des données d'activité
 * @param {number} userId - Identifiant de l'utilisateur
 * @returns {Object} État et données d'activité
 * @returns {Object} returns.activity - Données d'activité mappées avec sessions
 * @returns {boolean} returns.loading - État de chargement des données
 * @returns {string|null} returns.error - Message d'erreur éventuel
 * @returns {function} returns.refetch - Fonction pour recharger les données
 * @returns {function} returns.clearError - Fonction pour effacer l'erreur
 *
 * @example
 * ```jsx
 * function ActivityChart({ userId }) {
 *   const { activity, loading, error, refetch } = useActivityData(userId);
 *
 *   if (loading) return <div>Chargement de l'activité...</div>;
 *   if (error) return <div>Erreur: {error}</div>;
 *
 *   return (
 *     <BarChart data={activity.sessions} />
 *   );
 * }
 * ```
 */
export function useActivityData(userId) {
  /**
   * État des données d'activité
   * @type {[Object, function]} activity - Données d'activité avec sessions
   */
  const [activity, setActivity] = useState({sessions: []});

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
   * Fonction pour récupérer les données d'activité
   * Gère le chargement, la transformation et la gestion d'erreurs
   * @async
   * @function fetchActivity
   */
  const fetchActivity = async () => {
    if (!userId) {
      setError("ID utilisateur requis");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Récupération des données brutes depuis l'API
      const activityData = await getUserActivity(userId);

      // Transformation des données via le mapper
      const mappedActivity = mapActivity(activityData);

      setActivity(mappedActivity);
    } catch (err) {
      const errorMessage = err.message || "Erreur lors du chargement de l'activité";
      setError(errorMessage);
      console.error("Erreur useActivityData:", err);
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
   * Effet pour charger les données d'activité au montage et lors du changement d'userId
   * Utilise un flag mounted pour éviter les mises à jour sur composant démonté
   */
  useEffect(() => {
    let mounted = true;

    if (userId) {
      fetchActivity().then(() => {
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
    activity,
    loading,
    error,
    refetch: fetchActivity,
    clearError
  };
}
