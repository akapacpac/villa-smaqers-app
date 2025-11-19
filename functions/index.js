const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp();

// Fonction pour supprimer complètement un utilisateur
exports.deleteUser = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        // Vérifier que la méthode est POST
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Méthode non autorisée' });
        }

        // Vérifier que l'utilisateur est authentifié
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Token d\'authentification manquant' });
        }

        const idToken = authHeader.split('Bearer ')[1];
        let decodedToken;
        try {
            decodedToken = await admin.auth().verifyIdToken(idToken);
        } catch (error) {
            return res.status(401).json({ error: 'Token invalide' });
        }

        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ error: 'userId requis' });
        }
        
        try {
            // Vérifier que l'utilisateur est admin en vérifiant son profil
            const adminDoc = await admin.firestore()
                .collection('users')
                .doc(decodedToken.uid)
                .get();
                
            if (!adminDoc.exists) {
                return res.status(404).json({ error: 'Profil administrateur non trouvé' });
            }
            
            const adminData = adminDoc.data();
            if (adminData.role !== 'admin') {
                return res.status(403).json({ error: 'Seuls les administrateurs peuvent supprimer des comptes' });
            }
            
            // Supprimer d'abord les données Firestore
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
            
            // Enfin supprimer le compte d'authentification
            try {
                await admin.auth().deleteUser(userId);
            } catch (authError) {
                console.log('Erreur suppression Auth (peut-être déjà supprimé):', authError.message);
                // Continuer même si la suppression Auth échoue
            }
            
            return res.status(200).json({ success: true, message: 'Utilisateur supprimé avec succès' });
            
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            return res.status(500).json({ error: 'Erreur lors de la suppression: ' + error.message });
        }
    });
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

// Fonction pour supprimer un utilisateur par email (pour débloquer)
exports.deleteUserByEmail = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Méthode non autorisée' });
        }

        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email requis' });
        }
        
        try {
            // Trouver l'utilisateur par email
            const user = await admin.auth().getUserByEmail(email);
            const userId = user.uid;
            
            // Supprimer les données Firestore
            await admin.firestore().collection('users').doc(userId).delete();
            
            // Supprimer toutes les commandes
            const ordersSnapshot = await admin.firestore()
                .collection('orders')
                .where('userId', '==', userId)
                .get();
            
            const batch = admin.firestore().batch();
            ordersSnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            });
            await batch.commit();
            
            // Supprimer le compte d'authentification
            await admin.auth().deleteUser(userId);
            
            return res.status(200).json({ 
                success: true, 
                message: `Utilisateur ${email} supprimé avec succès. Vous pouvez maintenant recréer le compte.` 
            });
            
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            if (error.code === 'auth/user-not-found') {
                return res.status(404).json({ error: 'Utilisateur non trouvé avec cet email' });
            }
            return res.status(500).json({ error: 'Erreur lors de la suppression: ' + error.message });
        }
    });
});

// Fonction pour valider manuellement un email (admin seulement)
exports.verifyUserEmail = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Méthode non autorisée' });
        }

        // Vérifier que l'utilisateur est authentifié
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Token d\'authentification manquant' });
        }

        const idToken = authHeader.split('Bearer ')[1];
        let decodedToken;
        try {
            decodedToken = await admin.auth().verifyIdToken(idToken);
        } catch (error) {
            return res.status(401).json({ error: 'Token invalide' });
        }

        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email requis' });
        }
        
        try {
            // Vérifier que l'utilisateur est admin
            const adminDoc = await admin.firestore()
                .collection('users')
                .doc(decodedToken.uid)
                .get();
                
            if (!adminDoc.exists) {
                return res.status(404).json({ error: 'Profil administrateur non trouvé' });
            }
            
            const adminData = adminDoc.data();
            if (adminData.role !== 'admin' && adminData.role !== 'boss') {
                return res.status(403).json({ error: 'Seuls les administrateurs peuvent valider des emails' });
            }
            
            // Trouver l'utilisateur par email
            const user = await admin.auth().getUserByEmail(email);
            
            // Valider l'email
            await admin.auth().updateUser(user.uid, {
                emailVerified: true
            });
            
            return res.status(200).json({ 
                success: true, 
                message: `Email ${email} validé avec succès.` 
            });
            
        } catch (error) {
            console.error('Erreur lors de la validation:', error);
            if (error.code === 'auth/user-not-found') {
                return res.status(404).json({ error: 'Utilisateur non trouvé avec cet email' });
            }
            return res.status(500).json({ error: 'Erreur lors de la validation: ' + error.message });
        }
    });
});
