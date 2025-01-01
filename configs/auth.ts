import type { AuthOptions, User } from 'next-auth';
import GoggleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { users } from '@/public/data/users';
import { prisma } from '@/prisma/prisma-client';
import { compare } from 'bcrypt';

export const authConfig: AuthOptions = {
  providers: [
    GoggleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const values = {
          email: credentials.email,
        };

        const foundUser = await prisma.user.findFirst({
          where: values,
        });

        if (!foundUser) {
          return null;
        }

        // TODO: хэшировать пароль перед отравкой, при регистрации
        // const isPasswordValid = await compare(
        //   credentials.password,
        //   foundUser.password,
        // );

        const isPasswordValid = credentials.password === foundUser.password;

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: String(foundUser.id),
          email: foundUser.email,
          name: foundUser.name,
          fullName: foundUser.fullName,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token }) {
      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email as string,
        },
      });

      if (findUser) {
        token.id = String(findUser.id);
        token.email = findUser.email;
        token.name = findUser.name;
        token.fullName = findUser.fullName;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
      }

      return session;
    },
  },

  pages: {
    signIn: '/signin',
  },
};
