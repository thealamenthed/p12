import {useState, useEffect} from "react";
import {getUser} from "../../../api/user";
import {mapUser} from "../mappers/mapUser";

/**
 * Hook personnalisé pour gérer les données utilisateur
 * Encapsule la logique de récupération, transformation et gestion d'état des données utilisateur
 * @param {number} userId - Identifiant de l'utilisateur à récupérer
 * @returns {Object} État et données utilisateur
 * @returns {Object|null} returns.user - Données utilisateur mappées ou null si non chargées
 * @returns {boolean} returns.loading - État de chargement des données
 * @returns {string|null} returns.error - Message d'erreur éventuel
 * @returns {function} returns.refetch - Fonction pour recharger les données
 * @returns {function} returns.clearError - Fonction pour effacer l'erreur
 *
 * @example
 * ```jsx
 * function UserProfile({ userId }) {
 *   const { user, loading, error, refetch } = useUserData(userId);
 *
 *   if (loading) return <div>Chargement...</div>;
 *   if (error) return <div>Erreur: {error}</div>;
 *   if (!user) return <div>Aucune donnée utilisateur</div>;
 *
 *   return (
 *     <div>
 *       <h1>Bonjour {user.firstName}</h1>
 *       <button onClick={refetch}>Actualiser</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useUserData(userId) {
  /**
   * État des données utilisateur
   * @type {[Object|null, function]} user - Données utilisateur mappées
   */
  const [user, setUser] = useState(null);

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
   * Fonction pour récupérer les données utilisateur
   * Gère le chargement, la transformation et la gestion d'erreurs
   * @async
   * @function fetchUser
   */
  const fetchUser = async () => {
    if (!userId) {
      setError("ID utilisateur requis");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Récupération des données brutes depuis l'API
      const userData = await getUser(userId);

      // Transformation des données via le mapper
      const mappedUser = mapUser(userData);

      setUser(mappedUser);
    } catch (err) {
      const errorMessage = err.message || "Erreur lors du chargement de l'utilisateur";
      setError(errorMessage);
      console.error("Erreur useUserData:", err);
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
   * Effet pour charger les données utilisateur au montage et lors du changement d'userId
   * Utilise un flag mounted pour éviter les mises à jour sur composant démonté
   */
  useEffect(() => {
    let mounted = true;

    if (userId) {
      fetchUser().then(() => {
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
    user,
    loading,
    error,
    refetch: fetchUser,
    clearError
  };
}
