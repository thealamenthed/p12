#!/bin/bash

echo "🔍 Vérification de l'application SportSee..."

# Vérification du serveur
if curl -s http://localhost:5173 > /dev/null; then
    echo "✅ Serveur de développement accessible"
else
    echo "❌ Serveur de développement non accessible"
    echo "   Lancez 'npm run dev' pour démarrer l'application"
    exit 1
fi

# Vérification du titre
TITLE=$(curl -s http://localhost:5173 | grep -o "<title>.*</title>" | sed 's/<title>\(.*\)<\/title>/\1/')
if [[ "$TITLE" == "SportSee - Tableau de bord d'analytics sportif" ]]; then
    echo "✅ Titre de l'application correct"
else
    echo "❌ Titre incorrect: $TITLE"
fi

# Vérification des fichiers essentiels
FILES=(
    "src/components/Sidebar.jsx"
    "src/components/Header.jsx"
    "src/features/profile/ProfilePage.jsx"
    "src/api/apiService.js"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file existe"
    else
        echo "❌ $file manquant"
    fi
done

echo ""
echo "🎉 Vérification terminée !"
echo "   Ouvrez http://localhost:5173 dans votre navigateur pour voir l'application"
