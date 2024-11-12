import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendConfirmationEmail } from 'U/email';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, username, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const confirmationToken = crypto.randomBytes(32).toString('hex');

      const user = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
          confirmationToken,
          confirmed: false,
        },
      });

      await sendConfirmationEmail(user.email, confirmationToken);

      res.status(201).json({ message: 'Utilisateur créé. Veuillez vérifier votre e-mail.' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur.' });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
