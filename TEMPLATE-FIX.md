# 🔧 Correction du Template EmailJS

## ❌ Problème actuel
```
❌ Erreur: The recipients address is empty
```

## ✅ Solution : Configurer le template

### 1. Aller dans EmailJS Dashboard
1. **Allez dans "Email Templates"**
2. **Cliquez sur votre template** "One-Time Password"
3. **Cliquez sur l'icône d'édition** (crayon)

### 2. Configurer le template
**Remplacez le contenu par :**

```
Sujet: Code de vérification - {{app_name}}

Bonjour,

Votre code de vérification pour {{app_name}} est :

{{verification_code}}

Ce code est valide pendant 10 minutes.

Cordialement,
L'équipe {{app_name}}
```

### 3. Configurer les variables
**Dans la section "Variables" du template :**

- **to_email** : `{{to_email}}` (pour l'adresse de destination)
- **verification_code** : `{{verification_code}}` (pour le code)
- **app_name** : `{{app_name}}` (pour le nom de l'app)
- **from_name** : `{{from_name}}` (pour l'expéditeur)

### 4. Configurer l'expéditeur
**Dans "Settings" du template :**
- **From Name** : `{{from_name}}`
- **From Email** : `pascalmartinlalande@gmail.com`
- **Reply To** : `pascalmartinlalande@gmail.com`

### 5. Sauvegarder et tester
1. **Sauvegardez** le template
2. **Testez** avec `test-complet.html`
3. **Vérifiez** que l'email arrive

## 🧪 Test rapide
Une fois le template configuré, testez avec :
- Email : `pascalmartinlalande@gmail.com`
- Le code devrait arriver dans votre boîte de réception
