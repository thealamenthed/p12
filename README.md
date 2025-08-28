# 📊 SportSee – Analytics Dashboard

![React](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.0-purple) ![Axios](https://img.shields.io/badge/Axios-HTTP-orange) ![Recharts](https://img.shields.io/badge/Recharts-Charts-green)

## 📝 Description

**SportSee** est une application web permettant à un utilisateur de suivre ses performances sportives via un **tableau de bord interactif**.  
Le projet met en avant l'intégration de données depuis une API et leur visualisation sous forme de graphiques et d'indicateurs.

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
      components/  # Composants de graphiques
      hooks/       # Hooks personnalisés
      mappers/     # Transformateurs de données
  lib/             # Helpers & utilitaires
  styles/          # Fichiers CSS/SASS
  App.jsx
```

## ⚙️ Installation

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

### 1. Cloner le repo

```bash
git clone https://github.com/thealamenthed/p12.git
cd p12
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration des variables d'environnement

Créer un fichier `.env` à la racine :

```env
VITE_API_URL=http://localhost:3000
VITE_USE_MOCK=false
```

- `VITE_API_URL` : URL de l'API backend
- `VITE_USE_MOCK` : `true` pour utiliser des données mockées, `false` pour utiliser l'API réelle

### 4. Lancer le backend (optionnel)

Si vous avez accès au backend Node.js :

- Récupérez le repo backend
- Suivez les instructions d'installation dans le README backend
- Lancez le serveur sur `http://localhost:3000`

### 5. Lancer le frontend

```bash
npm run dev
```

L'application est disponible sur [http://localhost:5173](http://localhost:5173).

## 📊 Fonctionnalités principales

- **Page profil utilisateur** avec :
  - **BarChart** → activité quotidienne (poids & calories)
  - **LineChart** → durée moyenne des sessions
  - **RadarChart** → performances par catégorie
  - **RadialBarChart** → score quotidien
  - **Cartes KPI** (calories, protéines, glucides, lipides)

## 🎨 Composants développés

### Graphiques

- `BarChart` : Graphique en barres pour l'activité quotidienne
- `LineChart` : Graphique linéaire pour la durée des sessions
- `RadarChart` : Graphique radar pour les performances par catégorie
- `RadialBarChart` : Graphique circulaire pour le score quotidien

### Indicateurs

- `KPICard` : Cartes d'indicateurs clés de performance

### Hooks personnalisés

- `useUserData` : Gestion des données utilisateur
- `useActivityData` : Gestion des données d'activité
- `useSessionsData` : Gestion des données de sessions
- `usePerformanceData` : Gestion des données de performance

## 📐 Conventions & Documentation

- **PropTypes** pour typer les composants React
- **Mappers** pour transformer les données API en un modèle unique
- **JSDoc** pour documenter les services et fonctions utilitaires
- **CSS Modules** pour la gestion des styles

## 🔧 Scripts disponibles

```bash
npm run dev          # Lance le serveur de développement
npm run build        # Construit l'application pour la production
npm run preview      # Prévisualise la build de production
npm run lint         # Lance ESLint pour vérifier le code
```

## 📸 Aperçu

<img width="1032" height="734" alt="image" src="https://github.com/user-attachments/assets/b15132d6-0c78-4cb3-ad70-275408f24413" />

## 🚀 Déploiement

Pour déployer l'application :

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est réalisé dans le cadre du parcours _Développeur Web Front End_ d'OpenClassrooms.

## 👤 Auteur

Projet réalisé par Dalila LE dans le cadre du parcours _Développeur Web Front End -- OpenClassrooms_.
