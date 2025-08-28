#!/bin/bash

# Script de configuration pour le développement SportSee
echo "🏃‍♂️ Configuration de l'environnement de développement SportSee..."

# Vérification de Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2)
echo "✅ Node.js détecté : v$NODE_VERSION"

# Vérification de npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé."
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✅ npm détecté : v$NPM_VERSION"

# Installation des dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
else
    echo "✅ Dépendances déjà installées"
fi

# Vérification du fichier .env
if [ ! -f ".env" ]; then
    echo "⚙️ Création du fichier .env..."
    cat > .env << EOL
VITE_API_URL=http://localhost:3000
VITE_USE_MOCK=true
EOL
    echo "✅ Fichier .env créé avec les données mockées activées"
else
    echo "✅ Fichier .env existant"
fi

echo ""
echo "🎉 Configuration terminée !"
echo ""
echo "Pour démarrer l'application :"
echo "  npm run dev"
echo ""
echo "Pour construire pour la production :"
echo "  npm run build"
echo ""
echo "Pour basculer vers l'API réelle, modifiez VITE_USE_MOCK=false dans le fichier .env"
echo "et assurez-vous que le backend Node.js fonctionne sur http://localhost:3000"
