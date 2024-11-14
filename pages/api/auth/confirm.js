import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { token } = req.query;
    const trimmedToken = token.trim();

    if (!token) {
      console.error("Aucun token n'a été fourni.");
      return res.status(400).json({ error: "Aucun token de confirmation n'a été fourni." });
    }

    try {
      // Vérifier si un utilisateur avec ce token existe
      const user = await prisma.user.findFirst({
        where: { confirmationToken: trimmedToken },
      });

      if (!user) {
        console.error('Aucun utilisateur trouvé pour ce token.');
        return res.status(400).json({ error: 'Token invalide ou expiré.' });
      }


      // Vérifier si l'utilisateur a déjà été confirmé
      if (user.confirmed) {
        console.log('Le compte est déjà confirmé.');
        return res.status(200).json({ message: 'Votre compte a déjà été confirmé.' });
      }

      // Mettre à jour l'utilisateur pour confirmer l'email
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          confirmed: true,
          confirmationToken: null,
        },
      });

      if (!updatedUser) {
        throw new Error('Impossible de mettre à jour l\'utilisateur pour confirmer le compte.');
      }

      // Créer des entrées par défaut dans user_stats et user_resources pour le nouvel utilisateur
      await prisma.userStat.create({
        data: {
          userId: user.id,
          gainPerClick: 1, // Valeur par défaut pour le gain par clic
          gainPerSecond: 0, // Valeur par défaut pour le gain continu
          clicks: 0,
        },
      })

      await prisma.userResource.create({
        data: {
          userId: user.id,
          souls: 0, // Valeur par défaut pour les âmes
        },
      })

      res.status(200).json({ message: 'Votre compte a été confirmé avec succès. Vous pouvez maintenant vous connecter.' });
    } catch (error) {
      console.error('Erreur lors de la confirmation de l\'utilisateur:', error);
      res.status(500).json({ error: 'Erreur lors de la confirmation de l\'utilisateur.' });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
