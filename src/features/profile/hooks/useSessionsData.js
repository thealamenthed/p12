import {useState, useEffect} from "react";
import {userService} from "../../../api/apiService";

/**
 * Hook personnalisé pour récupérer les données de sessions
 * @param {number} userId - ID de l'utilisateur
 * @returns {Object} Objet contenant les données de sessions, l'état de chargement et les erreurs
 */
export const useSessionsData = (userId) => {
  const [sessionsData, setSessionsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionsData = async () => {
      if (!userId) {
        setError("ID utilisateur requis");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await userService.getSessionsData(userId);
        setSessionsData(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des données de sessions:", err);
        setError(err.message || "Erreur lors du chargement des données de sessions");
      } finally {
        setLoading(false);
      }
    };

    fetchSessionsData();
  }, [userId]);

  return {sessionsData, loading, error};
};
