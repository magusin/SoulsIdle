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
        const user = await prisma.user.findFirst({
          where: { username },
        });

        if (!user.confirmed) {
            throw new Error('Votre compte n\'a pas été confirmé. Veuillez vérifier votre email.');
        }

        if (user && bcrypt.compareSync(password, user.password)) {
          return { id: user.id, name: user.username, email: user.email };
        }
        // Retourner null si l'utilisateur n'est pas trouvé ou que le mot de passe ne correspond pas
        throw new Error('Nom d\'utilisateur ou mot de passe incorrect.');
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',  // Page personnalisée de connexion
    signOut: '/auth/signout', // Page personnalisée de déconnexion (facultatif)
    error: '/auth/error', // Afficher une page d'erreur en cas de problème d'authentification
  },
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Évite les redirections infinies
      if (url.startsWith(baseUrl)) return url;
      else if (url.startsWith("/")) return `${baseUrl}${url}`;
      return baseUrl;
    },
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