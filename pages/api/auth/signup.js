import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;
    try {
      const user = await prisma.user.create({
        data: { username, email, password },
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
