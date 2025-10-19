# Comment créer un APK pour "Villa des Smaqers Brisés"

## Méthode 1: Expo Go (Plus simple)

### Pour vos amis:
1. **Téléchargez "Expo Go"** depuis Google Play Store
2. **Ouvrez Expo Go**
3. **Scannez le QR code** depuis votre terminal
4. **Ou tapez l'URL**: `exp://192.168.0.142:8081`

### Avantages:
- ✅ Gratuit
- ✅ Pas besoin de compte
- ✅ Mises à jour automatiques
- ✅ Fonctionne immédiatement

---

## Méthode 2: APK Standalone (App réelle)

### Étape 1: Créer un compte Expo (gratuit)
1. Allez sur https://expo.dev
2. Créez un compte gratuit
3. Connectez-vous

### Étape 2: Configurer le projet
```bash
# Dans votre terminal
eas login
eas build:configure
```

### Étape 3: Construire l'APK
```bash
# Pour Android
eas build --platform android --profile preview

# Pour iOS (si vous avez un Mac)
eas build --platform ios --profile preview
```

### Étape 4: Télécharger l'APK
- L'APK sera disponible sur https://expo.dev
- Téléchargez le fichier .apk
- Partagez-le avec vos amis

---

## Méthode 3: PWA (Progressive Web App)

### Créer une PWA installable:
1. **Ouvrez** `mobile-preview.html` dans votre navigateur
2. **Ajoutez à l'écran d'accueil** (option du navigateur)
3. **L'app s'installe** comme une vraie app

### Avantages:
- ✅ Pas besoin d'APK
- ✅ Fonctionne sur tous les téléphones
- ✅ Mises à jour automatiques
- ✅ Gratuit

---

## Méthode 4: Build local avec React Native CLI

### Prérequis:
- Android Studio installé
- Java Development Kit (JDK)

### Commandes:
```bash
# Installer React Native CLI
npm install -g react-native-cli

# Créer un build Android
npx react-native run-android --variant=release

# L'APK sera dans: android/app/build/outputs/apk/release/
```

---

## Recommandation

**Pour commencer rapidement:**
- Utilisez **Expo Go** (Méthode 1)
- Vos amis peuvent tester l'app immédiatement
- Quand vous voulez une vraie app, utilisez **EAS Build** (Méthode 2)

**Pour une app permanente:**
- Créez un compte Expo gratuit
- Utilisez EAS Build pour créer l'APK
- Partagez l'APK avec vos amis

---

## Partage de l'app

### Avec Expo Go:
- Partagez le QR code
- Ou l'URL: `exp://192.168.0.142:8081`

### Avec APK:
- Envoyez le fichier .apk par email/WhatsApp
- Vos amis l'installent directement

### Avec PWA:
- Partagez le lien vers `mobile-preview.html`
- Vos amis l'ajoutent à leur écran d'accueil
