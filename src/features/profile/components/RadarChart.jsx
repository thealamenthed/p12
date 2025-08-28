import React from 'react'
import PropTypes from 'prop-types'
import { RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import './RadarChart.css'

/**
 * Composant graphique radar pour les performances par catégorie
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.data - Données de performance
 * @returns {JSX.Element} Graphique radar
 */
const RadarChart = ({ data }) => {
  if (!data || !data.data || !data.kind) {
    return <div className="chart-error">Aucune donnée disponible</div>
  }

  // Mapping des catégories
  const categoryLabels = {
    cardio: 'Cardio',
    energy: 'Énergie',
    endurance: 'Endurance',
    strength: 'Force',
    speed: 'Vitesse',
    intensity: 'Intensité',
  }

  // Formatage des données pour Recharts
  const chartData = data.data.map((item) => ({
    subject: categoryLabels[data.kind[item.kind]] || `Catégorie ${item.kind}`,
    value: item.value,
    fullMark: 200, // Valeur maximale pour l'échelle
  }))

  return (
    <div className="radar-chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <RechartsRadarChart data={chartData} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
          <PolarGrid stroke="#ccc" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fontSize: 12, fill: '#2c3e50' }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 200]} 
            tick={{ fontSize: 10, fill: '#7f8c8d' }}
          />
          <Radar 
            name="Performance" 
            dataKey="value" 
            stroke="#8884d8" 
            fill="#8884d8" 
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  )
}

RadarChart.propTypes = {
  data: PropTypes.shape({
    userId: PropTypes.number,
    kind: PropTypes.object,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
        kind: PropTypes.number,
      })
    ),
  }),
}

export default RadarChart
