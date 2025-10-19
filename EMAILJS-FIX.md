# 🔧 Résolution du problème EmailJS - Permissions insuffisantes

## ❌ Problème actuel
```
Gmail_API: Request had insufficient authentication scopes.
```

## ✅ Solution étape par étape

### 1. Reconnecter Gmail avec les bonnes permissions
1. **Allez dans EmailJS Dashboard** → **Email Services**
2. **Cliquez sur votre service Gmail** (service_q8yghyn)
3. **Cliquez "Reconnect"** ou **"Disconnect and reconnect"**
4. **Autorisez TOUTES les permissions** demandées par Google :
   - ✅ "Send email on your behalf"
   - ✅ "Read, compose, send, and permanently delete all your email"
   - ✅ "See, edit, create, and delete all your Google Drive files"

### 2. Créer un template d'email
1. **Allez dans "Email Templates"**
2. **Cliquez "Create New Template"**
3. **Utilisez ce template** :

```
Sujet: Code de vérification - {{app_name}}

Bonjour,

Votre code de vérification pour {{app_name}} est :

{{verification_code}}

Ce code est valide pendant 10 minutes.

Cordialement,
L'équipe {{app_name}}
```

4. **Sauvegardez** et **copiez le Template ID**

### 3. Obtenir votre User ID
1. **Allez dans "Account"** → **"General"**
2. **Copiez votre Public Key** (ex: `user_abc123def456`)

### 4. Mettre à jour le code
Remplacez dans `app-with-roles.html` :

```javascript
// Ligne 1095
emailjs.init("VOTRE_USER_ID_ICI");

// Ligne 1125
'template_VOTRE_TEMPLATE_ID_ICI',
```

### 5. Tester l'envoi
1. **Sauvegardez** le fichier
2. **Rechargez** la page
3. **Entrez un email** valide
4. **Cliquez "Envoyer code"**
5. **Vérifiez** votre boîte de réception

## 🚨 Si ça ne marche toujours pas

### Alternative 1 : Utiliser un autre service
- **Outlook** au lieu de Gmail
- **Yahoo** Mail
- **Custom SMTP**

### Alternative 2 : Serveur Backend
Utilisez `app-with-backend-email.html` avec le serveur Node.js

## 📧 Codes de test
- **Admin** : `paco`, `test`, `admin`
- **Membre** : `member001`, `member002`, `member003`

## ✅ Vérification finale
1. ✅ Service Gmail connecté
2. ✅ Template créé
3. ✅ User ID copié
4. ✅ Code mis à jour
5. ✅ Test d'envoi réussi
