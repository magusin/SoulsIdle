import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      // Rechercher l'utilisateur par email
      const user = await prisma.user.findFirst({
        where: { email },
      });

      if (!user) {
        return res.status(400).json({ error: 'Aucun utilisateur trouvé avec cet email.' });
      }

      // Générer un token de réinitialisation de mot de passe
      const resetToken = Math.random().toString(36).substr(2);

      // Mettre à jour l'utilisateur avec le token de réinitialisation
      await prisma.user.update({
        where: { email },
        data: {
          resetToken,
          resetTokenExpiry: new Date(Date.now() + 3600000), // 1 heure
        },
      });

      // Configurer le transporteur d'e-mail
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;

      // Envoyer l'email de réinitialisation de mot de passe
      await transporter.sendMail({
        from: `"SoulsIdle" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Réinitialisation de votre mot de passe',
        html: `<p>Vous avez demandé une réinitialisation de mot de passe.</p>
               <p>Veuillez cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
               <a href="${resetUrl}">Réinitialiser mon mot de passe</a>`,
      });

      res.status(200).json({ message: 'Un e-mail de réinitialisation a été envoyé.' });
    } catch (error) {
      console.error('Erreur lors de la demande de réinitialisation de mot de passe:', error);
      res.status(500).json({ error: 'Erreur lors de la demande de réinitialisation de mot de passe.' });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}