# Villa des Smaqers Brisés - App de Commande

Application mobile pour les étudiants de la Villa des Smaqers Brisés permettant de commander gratuitement des crêpes, cookies et glaces.

## Fonctionnalités

- **Profil utilisateur** : Création de profil avec email, téléphone, nom, prénom et âge
- **Menu** : Sélection entre crêpes, cookies et glaces (tous gratuits)
- **Commande** : Sélection de la salle de classe pour la livraison
- **Stockage local** : Sauvegarde des profils et commandes sur l'appareil

## Installation et Développement

### Prérequis
- Node.js (version 20+ recommandée)
- npm ou yarn
- Expo CLI : `npm install -g @expo/cli`
- Expo Go app sur votre téléphone (pour les tests)

### Installation
```bash
cd VillaDesSmaqersBrises
npm install
```

### Développement
```bash
# Démarrer le serveur de développement
npm start

# Ou pour une plateforme spécifique
npm run ios
npm run android
npm run web
```

## Déploiement sur l'App Store

### 1. Installation d'EAS CLI
```bash
npm install -g eas-cli
```

### 2. Connexion à Expo
```bash
eas login
```

### 3. Configuration du projet
```bash
eas build:configure
```

### 4. Build pour iOS
```bash
eas build --platform ios
```

### 5. Soumission à l'App Store
```bash
eas submit --platform ios
```

## Structure du Projet

```
VillaDesSmaqersBrises/
├── App.tsx                 # Point d'entrée principal avec navigation
├── types.ts               # Types TypeScript
├── services/
│   └── StorageService.ts  # Service de stockage local
├── screens/
│   ├── ProfileScreen.tsx  # Écran de création/édition de profil
│   ├── MenuScreen.tsx     # Écran du menu des produits
│   └── BookingScreen.tsx  # Écran de commande
└── assets/                # Images et icônes
```

## Configuration App Store

L'app est configurée avec :
- **Bundle ID** : `com.villadesmaqersbrises.app`
- **Nom** : Villa des Smaqers Brisés
- **Version** : 1.0.0
- **Orientation** : Portrait uniquement
- **Couleur principale** : #6c5ce7 (violet)

## Notes Importantes

- L'application ne nécessite pas de paiement (tous les produits sont gratuits)
- Les données sont stockées localement sur l'appareil
- Validation des champs : âge entre 16-30 ans, email valide, téléphone valide
- Interface en français adaptée aux étudiants

## Support

Pour toute question concernant l'application, contactez l'équipe de la Villa des Smaqers Brisés.

