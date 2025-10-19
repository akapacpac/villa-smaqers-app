// Serveur Backend pour l'envoi d'emails - Villa des Smaqers Brisés
// Installez avec: npm install express nodemailer cors

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuration email (remplacez par vos identifiants)
const transporter = nodemailer.createTransporter({
    service: 'gmail', // ou 'outlook', 'yahoo', etc.
    auth: {
        user: 'votre-email@gmail.com', // Votre email
        pass: 'votre-mot-de-passe-app' // Mot de passe d'application Gmail
    }
});

// Stockage temporaire des codes (en production, utilisez une base de données)
const verificationCodes = new Map();

// Route pour envoyer le code de vérification
app.post('/send-verification-code', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ error: 'Email requis' });
        }
        
        // Générer un code de 6 chiffres
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Stocker le code (expire dans 10 minutes)
        verificationCodes.set(email, {
            code: code,
            expires: Date.now() + (10 * 60 * 1000)
        });
        
        // Configuration de l'email
        const mailOptions = {
            from: 'votre-email@gmail.com',
            to: email,
            subject: 'Code de vérification - Villa des Smaqers Brisés',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #6c5ce7;">Villa des Smaqers Brisés</h2>
                    <p>Bonjour,</p>
                    <p>Votre code de vérification est :</p>
                    <div style="background: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0;">
                        <h1 style="color: #6c5ce7; font-size: 32px; margin: 0;">${code}</h1>
                    </div>
                    <p>Ce code est valide pendant <strong>10 minutes</strong>.</p>
                    <p>Cordialement,<br>L'équipe Villa des Smaqers Brisés</p>
                </div>
            `
        };
        
        // Envoyer l'email
        await transporter.sendMail(mailOptions);
        
        console.log(`Code envoyé à ${email}: ${code}`);
        res.json({ success: true, message: 'Code envoyé avec succès' });
        
    } catch (error) {
        console.error('Erreur envoi email:', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email' });
    }
});

// Route pour vérifier le code
app.post('/verify-code', (req, res) => {
    try {
        const { email, code } = req.body;
        
        const storedData = verificationCodes.get(email);
        
        if (!storedData) {
            return res.status(400).json({ error: 'Code non trouvé' });
        }
        
        if (Date.now() > storedData.expires) {
            verificationCodes.delete(email);
            return res.status(400).json({ error: 'Code expiré' });
        }
        
        if (storedData.code !== code) {
            return res.status(400).json({ error: 'Code incorrect' });
        }
        
        // Code valide, le supprimer
        verificationCodes.delete(email);
        res.json({ success: true, message: 'Code vérifié avec succès' });
        
    } catch (error) {
        console.error('Erreur vérification code:', error);
        res.status(500).json({ error: 'Erreur lors de la vérification' });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur email démarré sur le port ${PORT}`);
    console.log(`📧 Prêt à envoyer des emails de vérification !`);
});

// Nettoyer les codes expirés toutes les 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [email, data] of verificationCodes.entries()) {
        if (now > data.expires) {
            verificationCodes.delete(email);
        }
    }
}, 5 * 60 * 1000);
