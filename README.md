# 📊 SportSee – Analytics Dashboard

![React](https://img.shields.io/badge/React-18.0.0-blue) ![Vite](https://img.shields.io/badge/Vite-4.0-purple) ![Axios](https://img.shields.io/badge/Axios-HTTP-orange) ![Recharts](https://img.shields.io/badge/Recharts-Charts-green)

## 📝 Description

**SportSee** est une application web permettant à un utilisateur de suivre ses performances sportives via un **tableau de bord interactif**.  
Le projet met en avant l’intégration de données depuis une API et leur visualisation sous forme de graphiques et d’indicateurs.

## 🚀 Objectifs pédagogiques

- Développer des éléments graphiques avancés avec **Recharts** (ou D3.js).  
- Intégrer et consommer une **API Node.js** via `fetch` ou `axios`.  
- Assurer la **qualité et la standardisation des données**.  
- Documenter le projet avec **README, JSDoc et PropTypes**.  

## 🛠️ Stack technique

- [React](https://reactjs.org/) (créé avec [Vite](https://vitejs.dev/))  
- [Recharts](https://recharts.org/) pour les graphiques  
- [Axios](https://axios-http.com/) pour les appels API  
- [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) pour la validation des props  
- [JSDoc](https://jsdoc.app/) pour la documentation du code  

## 📂 Structure du projet
```
src/
  api/             # Services API + mocks
  components/      # Composants UI réutilisables
  features/        # Pages/features (ProfilePage)
    profile/
      components/
      hooks/
      mappers/
  lib/             # Helpers & utilitaires
  styles/          # Fichiers CSS/SASS
  App.jsx

```

## ⚙️ Installation

### 1. Cloner le repo
```
git clone https://github.com/thealamenthed/p12.git
cd sportsee
```
### 2\. Installer les dépendances

`npm install`

### 3\. Lancer le backend (fourni)

-   Récupère le repo backend (Node.js).

-   Suis les instructions d'installation dans le README backend.

-   Lance le serveur sur `http://localhost:3000`.

### 4\. Lancer le front

`npm run dev`

L'application est disponible sur <http://localhost:5173>.

🔑 Variables d'environnement
----------------------------

Créer un fichier `.env` à la racine :

`VITE_API_URL=http://localhost:3000
VITE_USE_MOCK=false`

-   `VITE_API_URL` : URL de l'API backend.

-   `VITE_USE_MOCK` : `true` pour utiliser des données mockées, `false` pour utiliser l'API réelle.

📊 Fonctionnalités principales
------------------------------

-   Page **profil utilisateur** avec :

    -   **BarChart** → activité quotidienne (poids & calories).

    -   **LineChart** → durée moyenne des sessions.

    -   **RadarChart** → performances par catégorie.

    -   **RadialBarChart** → score quotidien.

    -   **Cartes KPI** (calories, protéines, glucides, lipides).

📐 Conventions & Documentation
------------------------------

-   **PropTypes** pour typer les composants React.

-   **Mappers** pour transformer les données API en un modèle unique.

-   **JSDoc** pour documenter les services et fonctions utilitaires.

📸 Aperçu
-----------------------

<img width="1032" height="734" alt="image" src="https://github.com/user-attachments/assets/b15132d6-0c78-4cb3-ad70-275408f24413" />


👤 Auteur
---------

Projet réalisé par Dalila LE dans le cadre du parcours *Développeur Web Front End -- OpenClassrooms*.


