/**
 * Point d'entrée pour tous les hooks personnalisés du profil utilisateur
 * Centralise les exports pour faciliter l'importation dans les composants
 *
 * @fileoverview Exports des hooks personnalisés pour la gestion des données utilisateur
 * @version 1.0.0
 * @author SportSee Team
 */

/**
 * Hook pour gérer les données utilisateur
 * @see {@link ./useUserData.js} pour la documentation détaillée
 */
export {useUserData} from "./useUserData";

/**
 * Hook pour gérer les données d'activité utilisateur
 * @see {@link ./useActivityData.js} pour la documentation détaillée
 */
export {useActivityData} from "./useActivityData";

/**
 * Hook pour gérer les données de sessions d'entraînement
 * @see {@link ./useSessionsData.js} pour la documentation détaillée
 */
export {useSessionsData} from "./useSessionsData";

/**
 * Hook pour gérer les données de performance utilisateur
 * @see {@link ./usePerformanceData.js} pour la documentation détaillée
 */
export {usePerformanceData} from "./usePerformanceData";

/**
 * Export par défaut contenant tous les hooks
 * Permet l'importation groupée : import hooks from './hooks'
 */
import {useUserData} from "./useUserData";
import {useActivityData} from "./useActivityData";
import {useSessionsData} from "./useSessionsData";
import {usePerformanceData} from "./usePerformanceData";

export default {
  useUserData,
  useActivityData,
  useSessionsData,
  usePerformanceData
};
