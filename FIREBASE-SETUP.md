# 🔥 Firebase Setup - Villa des Smaqers Brisés

## ✅ What's Done:
- **Firebase SDK integrated** - Your app now uses Firebase Firestore
- **Real-time database** - All data is stored in the cloud
- **Synchronized data** - All admins see the same data
- **Secure storage** - Data is protected and backed up

## 🚀 How to Deploy:

### 1. Upload to GitHub:
- Upload `app-with-roles.html` as `index.html` to your GitHub repository
- Your app will be available at: `https://akapacpac.github.io/villa-smaqers-brises/`

### 2. Firebase Configuration:
- Your Firebase project is already configured
- Database: `villa-smaqers-brises`
- Collections: `users` and `orders`

## 📊 Database Structure:

### Users Collection:
```json
{
  "firstName": "Pascal",
  "lastName": "Martin",
  "email": "pascal@example.com",
  "phone": "0123456789",
  "age": 20,
  "role": "admin",
  "registrationDate": "2024-01-01T00:00:00.000Z"
}
```

### Orders Collection:
```json
{
  "item": "Crêpes",
  "classroom": "A101",
  "timestamp": "19/10/2024 22:30:00",
  "profile": { /* user profile */ },
  "status": "pending"
}
```

## 🔐 Access Codes:
- **`paco`** → Admin (your account)
- **`member123`** → Member
- **`admin456`** → Admin
- **`society789`** → Member

## ✨ Features:
- ✅ **Real-time sync** - Data updates instantly
- ✅ **Role-based access** - Students, Members, Admins
- ✅ **Order management** - Track all orders
- ✅ **User management** - Admin can delete users
- ✅ **Statistics** - Real-time analytics
- ✅ **Mobile-friendly** - Works on all devices

## 🎯 Next Steps:
1. **Test the app** - Create accounts and place orders
2. **Share with students** - Send them the GitHub Pages link
3. **Monitor orders** - Use admin panel to track everything
4. **Add more codes** - Create new access codes as needed

## 🆘 Support:
- **Firebase Console**: https://console.firebase.google.com/project/villa-smaqers-brises
- **GitHub Repository**: https://github.com/akapacpac/villa-smaqers-app
- **Live App**: https://akapacpac.github.io/villa-smaqers-brises/

**Your app is now ready with a real database! 🎉**
