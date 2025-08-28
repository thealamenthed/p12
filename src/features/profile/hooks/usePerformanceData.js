import {useState, useEffect} from "react";
import {userService} from "../../../api/apiService";

/**
 * Hook personnalisé pour récupérer les données de performance
 * @param {number} userId - ID de l'utilisateur
 * @returns {Object} Objet contenant les données de performance, l'état de chargement et les erreurs
 */
export const usePerformanceData = (userId) => {
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      if (!userId) {
        setError("ID utilisateur requis");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await userService.getPerformanceData(userId);
        setPerformanceData(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des données de performance:", err);
        setError(err.message || "Erreur lors du chargement des données de performance");
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, [userId]);

  return {performanceData, loading, error};
};
