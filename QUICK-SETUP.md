# 🚀 Configuration Rapide - EmailJS Connecté !

## ✅ Étape 1 : Récupérer vos IDs

### User ID :
1. **Allez dans EmailJS Dashboard** → **Account** → **General**
2. **Copiez votre Public Key** (ex: `user_abc123def456`)

### Template ID :
1. **Allez dans EmailJS Dashboard** → **Email Templates**
2. **Créez un nouveau template** avec ce contenu :

```
Sujet: Code de vérification - {{app_name}}

Bonjour,

Votre code de vérification pour {{app_name}} est :

{{verification_code}}

Ce code est valide pendant 10 minutes.

Cordialement,
L'équipe {{app_name}}
```

3. **Sauvegardez** et **copiez le Template ID** (ex: `template_xyz789`)

## ✅ Étape 2 : Mettre à jour le code

### Dans `app-with-roles.html` :

**Ligne 1095 :**
```javascript
emailjs.init("VOTRE_USER_ID_ICI");
```

**Ligne 1125 :**
```javascript
'template_VOTRE_TEMPLATE_ID_ICI',
```

## ✅ Étape 3 : Tester

1. **Sauvegardez** le fichier
2. **Rechargez** la page
3. **Entrez un email** valide
4. **Cliquez "Envoyer code"**
5. **Vérifiez** votre boîte de réception !

## 🧪 Test rapide avec `test-emailjs.html`

1. **Ouvrez** `test-emailjs.html`
2. **Entrez** vos IDs
3. **Testez** l'envoi d'email

## 📧 Codes de test
- **Admin** : `paco`, `test`, `admin`
- **Membre** : `member001`, `member002`, `member003`

**Dites-moi quand vous avez vos IDs ! 🚀**
