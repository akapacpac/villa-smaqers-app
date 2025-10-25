const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Fonction pour supprimer complètement un utilisateur
exports.deleteUser = functions.https.onCall(async (data, context) => {
    // Vérifier que l'utilisateur est authentifié
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Utilisateur non authentifié');
    }

    const { userId } = data;
    
    try {
        // Vérifier que l'utilisateur est admin en vérifiant son profil
        const adminDoc = await admin.firestore()
            .collection('users')
            .doc(context.auth.uid)
            .get();
            
        if (!adminDoc.exists) {
            throw new functions.https.HttpsError('not-found', 'Profil administrateur non trouvé');
        }
        
        const adminData = adminDoc.data();
        if (adminData.role !== 'admin') {
            throw new functions.https.HttpsError('permission-denied', 'Seuls les administrateurs peuvent supprimer des comptes');
        }
        
        // Supprimer le compte d'authentification
        await admin.auth().deleteUser(userId);
        
        // Attendre un peu pour que la suppression soit propagée
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Supprimer le document utilisateur
        await admin.firestore().collection('users').doc(userId).delete();
        
        // Supprimer toutes les commandes de cet utilisateur
        const ordersSnapshot = await admin.firestore()
            .collection('orders')
            .where('userId', '==', userId)
            .get();
        
        const batch = admin.firestore().batch();
        ordersSnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();
        
        return { success: true, message: 'Utilisateur supprimé avec succès' };
        
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        throw new functions.https.HttpsError('internal', 'Erreur lors de la suppression: ' + error.message);
    }
});

// Fonction pour vérifier si un utilisateur est admin
exports.checkAdmin = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Utilisateur non authentifié');
    }
    
    try {
        const userDoc = await admin.firestore()
            .collection('users')
            .doc(context.auth.uid)
            .get();
            
        if (!userDoc.exists) {
            throw new functions.https.HttpsError('not-found', 'Profil utilisateur non trouvé');
        }
        
        const userData = userDoc.data();
        return { 
            isAdmin: userData.role === 'admin',
            role: userData.role,
            deleted: userData.deleted || false
        };
        
    } catch (error) {
        console.error('Erreur lors de la vérification admin:', error);
        throw new functions.https.HttpsError('internal', 'Erreur lors de la vérification: ' + error.message);
    }
});
