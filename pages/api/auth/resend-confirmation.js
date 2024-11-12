import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { sendConfirmationEmail } from 'U/email';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(400).json({ error: 'Aucun utilisateur trouvé avec cet email.' });
      }

      if (user.confirmed) {
        return res.status(400).json({ error: 'Le compte est déjà confirmé.' });
      }

      const newConfirmationToken = crypto.randomBytes(32).toString('hex');

      await prisma.user.update({
        where: { id: user.id },
        data: { confirmationToken: newConfirmationToken },
      });

      await sendConfirmationEmail(user.email, newConfirmationToken);

      res.status(200).json({ message: 'Un nouvel e-mail de confirmation a été envoyé.' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la demande d\'un nouvel e-mail de confirmation.' });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
