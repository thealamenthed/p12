import { useState, useEffect } from 'react'
import { userService } from '../../../api/apiService'

/**
 * Hook personnalisé pour récupérer les données utilisateur
 * @param {number} userId - ID de l'utilisateur
 * @returns {Object} Objet contenant les données, l'état de chargement et les erreurs
 */
export const useUserData = (userId) => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError('ID utilisateur requis')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const data = await userService.getUserData(userId)
        setUserData(data)
      } catch (err) {
        console.error('Erreur lors de la récupération des données utilisateur:', err)
        setError(err.message || 'Erreur lors du chargement des données utilisateur')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [userId])

  return { userData, loading, error }
}
