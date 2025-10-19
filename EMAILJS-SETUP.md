# 📧 Configuration EmailJS - Villa des Smaqers Brisés

## 🚀 Étapes pour configurer l'envoi d'emails réels

### 1. Créer un compte EmailJS
1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Créez un compte gratuit
3. Connectez votre service email (Gmail, Outlook, etc.)

### 2. Configurer un service email
1. Dans le dashboard EmailJS, allez dans **"Email Services"**
2. Cliquez **"Add New Service"**
3. Choisissez votre fournisseur (Gmail recommandé)
4. Suivez les instructions pour connecter votre compte
5. **Copiez le Service ID** (ex: `service_1234567`)

### 3. Créer un template d'email
1. Allez dans **"Email Templates"**
2. Cliquez **"Create New Template"**
3. Utilisez ce template :

```
Sujet: Code de vérification - {{app_name}}

Bonjour,

Votre code de vérification pour {{app_name}} est :

{{verification_code}}

Ce code est valide pendant 10 minutes.

Cordialement,
L'équipe {{app_name}}
```

4. **Copiez le Template ID** (ex: `template_1234567`)

### 4. Obtenir votre User ID
1. Allez dans **"Account"** → **"General"**
2. **Copiez votre Public Key** (ex: `user_1234567890abcdef`)

### 5. Mettre à jour le code
Remplacez dans `app-with-roles.html` :

```javascript
// Ligne 1095
emailjs.init("VOTRE_USER_ID_ICI");

// Ligne 1124
'service_VOTRE_SERVICE_ID_ICI',

// Ligne 1125  
'template_VOTRE_TEMPLATE_ID_ICI',
```

## 🧪 Test
1. Sauvegardez le fichier
2. Rechargez la page
3. Entrez un email valide
4. Cliquez "Envoyer code"
5. Vérifiez votre boîte de réception !

## 💡 Avantages EmailJS
- ✅ Gratuit jusqu'à 200 emails/mois
- ✅ Pas besoin de serveur backend
- ✅ Configuration simple
- ✅ Sécurisé

## 🔧 Alternative : Serveur Backend
Si vous préférez un serveur backend, je peux vous aider à configurer Node.js + Nodemailer.
