import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProfilePage from "./features/profile/ProfilePage";

/**
 * Composant principal de l'application SportSee
 * @returns {JSX.Element} L'application SportSee
 */
function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="dashboard-content">
          <ProfilePage />
        </main>
      </div>
    </div>
  );
}

export default App;
