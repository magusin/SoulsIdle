// pages/api/auth/reset-password.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token, password } = req.body;

    try {
      // Vérifier si l'utilisateur avec le token existe et que le token n'a pas expiré
      const user = await prisma.user.findFirst({
        where: {
          resetToken: token,
          resetTokenExpiry: {
            gt: new Date(),
          },
        },
      });

      if (!user) {
        return res.status(400).json({ error: 'Token invalide ou expiré.' });
      }

      // Mettre à jour le mot de passe et supprimer le token
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password, // Assurez-vous de hasher le mot de passe avant de l'enregistrer
          resetToken: null,
          resetTokenExpiry: null,
        },
      });

      res.status(200).json({ message: 'Mot de passe réinitialisé avec succès.', success: true });
    } catch (error) {
      console.error('Erreur lors de la réinitialisation du mot de passe:', error);
      res.status(500).json({ error: 'Erreur lors de la réinitialisation du mot de passe.' });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
