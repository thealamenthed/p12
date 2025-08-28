import React from "react";
import PropTypes from "prop-types";
import "./KPICard.css";

/**
 * Composant carte KPI pour afficher un indicateur clé de performance
 * @param {Object} props - Propriétés du composant
 * @param {string} props.title - Titre du KPI
 * @param {number} props.value - Valeur du KPI
 * @param {string} props.unit - Unité de mesure
 * @param {string} props.icon - Icône à afficher (emoji ou chemin d'image)
 * @returns {JSX.Element} Carte KPI
 */
const KPICard = ({title, value, unit, icon}) => {
  // Vérifier si l'icône est une image (contient une extension de fichier)
  const isImage = typeof icon === "string" && (icon.includes(".svg") || icon.includes(".png") || icon.includes(".jpg") || icon.includes(".jpeg"));

  return (
    <div className="kpi-card">
      <div className="kpi-icon">{isImage ? <img src={icon} alt={title} className="kpi-icon-image" /> : icon}</div>
      <div className="kpi-content">
        <div className="kpi-value">
          {value.toLocaleString()}
          <span className="kpi-unit">{unit}</span>
        </div>
        <div className="kpi-title">{title}</div>
      </div>
    </div>
  );
};

KPICard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

export default KPICard;
