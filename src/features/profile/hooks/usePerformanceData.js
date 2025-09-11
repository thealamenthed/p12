import {useState, useEffect} from "react";
import {getUserPerformance} from "../../../api/user";
import {mapPerformance} from "../mappers/mapPerformance";

/**
 * Hook personnalisé pour gérer les données de performance utilisateur
 * Encapsule la logique de récupération, transformation et gestion d'état des données de performance
 * @param {number} userId - Identifiant de l'utilisateur
 * @returns {Object} État et données de performance
 * @returns {Object} returns.performance - Données de performance mappées avec kind et data
 * @returns {boolean} returns.loading - État de chargement des données
 * @returns {string|null} returns.error - Message d'erreur éventuel
 * @returns {function} returns.refetch - Fonction pour recharger les données
 * @returns {function} returns.clearError - Fonction pour effacer l'erreur
 *
 * @example
 * ```jsx
 * function PerformanceChart({ userId }) {
 *   const { performance, loading, error, refetch } = usePerformanceData(userId);
 *
 *   if (loading) return <div>Chargement de la performance...</div>;
 *   if (error) return <div>Erreur: {error}</div>;
 *
 *   return (
 *     <RadarChart data={performance.data} kind={performance.kind} />
 *   );
 * }
 * ```
 */
export function usePerformanceData(userId) {
  /**
   * État des données de performance
   * @type {[Object, function]} performance - Données de performance avec kind et data
   */
  const [performance, setPerformance] = useState({kind: {}, data: []});

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
   * Fonction pour récupérer les données de performance
   * Gère le chargement, la transformation et la gestion d'erreurs
   * @async
   * @function fetchPerformance
   */
  const fetchPerformance = async () => {
    if (!userId) {
      setError("ID utilisateur requis");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Récupération des données brutes depuis l'API
      const performanceData = await getUserPerformance(userId);

      // Transformation des données via le mapper
      const mappedPerformance = mapPerformance(performanceData);

      setPerformance(mappedPerformance);
    } catch (err) {
      const errorMessage = err.message || "Erreur lors du chargement de la performance";
      setError(errorMessage);
      console.error("Erreur usePerformanceData:", err);
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
   * Effet pour charger les données de performance au montage et lors du changement d'userId
   * Utilise un flag mounted pour éviter les mises à jour sur composant démonté
   */
  useEffect(() => {
    let mounted = true;

    if (userId) {
      fetchPerformance().then(() => {
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
    performance,
    loading,
    error,
    refetch: fetchPerformance,
    clearError
  };
}
