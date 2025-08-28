import { useState, useEffect } from 'react'
import { userService } from '../../../api/apiService'

/**
 * Hook personnalisé pour récupérer les données d'activité
 * @param {number} userId - ID de l'utilisateur
 * @returns {Object} Objet contenant les données d'activité, l'état de chargement et les erreurs
 */
export const useActivityData = (userId) => {
  const [activityData, setActivityData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchActivityData = async () => {
      if (!userId) {
        setError('ID utilisateur requis')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const data = await userService.getActivityData(userId)
        setActivityData(data)
      } catch (err) {
        console.error('Erreur lors de la récupération des données d\'activité:', err)
        setError(err.message || 'Erreur lors du chargement des données d\'activité')
      } finally {
        setLoading(false)
      }
    }

    fetchActivityData()
  }, [userId])

  return { activityData, loading, error }
}
