# 🔥 Configuration Firebase Functions

## Prérequis
1. **Firebase CLI installé** : `npm install -g firebase-tools`
2. **Projet Firebase configuré** : `firebase login` et `firebase use <project-id>`

## Déploiement des Functions

### Option 1 : Script automatique
```bash
./deploy-functions.sh
```

### Option 2 : Déploiement manuel
```bash
cd functions
npm install
firebase deploy --only functions
```

## Functions disponibles

### `deleteUser`
- **Description** : Supprime complètement un compte (Firebase Auth + Firestore)
- **Paramètres** : `{ userId: string }`
- **Permissions** : Admin uniquement
- **Action** : 
  - Supprime le compte Firebase Authentication
  - Supprime le document utilisateur de Firestore
  - Supprime toutes les commandes associées

### `checkAdmin`
- **Description** : Vérifie les permissions d'un utilisateur
- **Paramètres** : Aucun (utilise le token d'authentification)
- **Retour** : `{ isAdmin: boolean, role: string, deleted: boolean }`

## Sécurité
- Les functions vérifient les permissions côté serveur
- Seuls les administrateurs peuvent supprimer des comptes
- Les tokens d'authentification sont validés automatiquement

## Test
Après déploiement, testez la suppression d'un compte depuis la page privée.
