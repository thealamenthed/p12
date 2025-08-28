import React from "react";
import "./Sidebar.css";
import yogaIcon from "../assets/icons/yoga.png";
import swimmingIcon from "../assets/icons/swimming.png";
import cyclingIcon from "../assets/icons/cycling.png";
import weightIcon from "../assets/icons/weight.png";

/**
 * Composant Sidebar avec les icônes d'activités
 * @returns {JSX.Element} La sidebar avec les icônes
 */
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-icons">
        <div className="sidebar-icon">
          <img src={yogaIcon} alt="Yoga" className="activity-icon" />
        </div>
        <div className="sidebar-icon">
          <img src={swimmingIcon} alt="Natation" className="activity-icon" />
        </div>
        <div className="sidebar-icon">
          <img src={cyclingIcon} alt="Cyclisme" className="activity-icon" />
        </div>
        <div className="sidebar-icon">
          <img src={weightIcon} alt="Musculation" className="activity-icon" />
        </div>
      </div>
      <div className="sidebar-copyright">
        <span>Copiryght, SportSee 2020</span>
      </div>
    </div>
  );
};

export default Sidebar;
