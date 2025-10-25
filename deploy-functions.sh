#!/bin/bash

echo "🚀 Déploiement des Firebase Functions..."

# Aller dans le dossier functions
cd functions

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Déployer les functions
echo "☁️ Déploiement vers Firebase..."
firebase deploy --only functions

echo "✅ Déploiement terminé !"
echo "🔗 Les functions sont maintenant disponibles :"
echo "   - deleteUser: Supprime complètement un compte"
echo "   - checkAdmin: Vérifie les permissions admin"
