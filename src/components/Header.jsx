import React from "react";
import "./Header.css";
import logo from "../assets/icons/logo.png";

/**
 * Composant Header avec logo et navigation
 * @returns {JSX.Element} Le header avec navigation
 */
const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="SportSee Logo" className="logo-image" />
      </div>
      <nav className="header-nav">
        <a href="#" className="nav-link">
          Accueil
        </a>
        <a href="#" className="nav-link">
          Profil
        </a>
        <a href="#" className="nav-link">
          Réglage
        </a>
        <a href="#" className="nav-link">
          Communauté
        </a>
      </nav>
    </header>
  );
};

export default Header;
