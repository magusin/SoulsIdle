import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        // Recherchez l'utilisateur par nom d'utilisateur dans la base de données
        const user = await prisma.user.findUnique({
          where: { username },
        });

        if (user && bcrypt.compareSync(password, user.password)) {
          return { id: user.id, name: user.username, email: user.email };
        }
        // Retourner null si l'utilisateur n'est pas trouvé ou que le mot de passe ne correspond pas
        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
});