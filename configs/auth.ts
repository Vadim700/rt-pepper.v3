import type { AuthOptions, User } from 'next-auth';

import GoggleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/prisma/prisma-client';
import { compare, hashSync } from 'bcrypt';

export const authConfig: AuthOptions = {
  providers: [
    GoggleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.email,
          email: profile.email,
          image: profile.image,
        };
      },
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

        const isPasswordValid = await compare(
          credentials.password,
          foundUser.password,
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: String(foundUser.id),
          email: foundUser.email,
          name: foundUser.name,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'credentials') {
          return true;
        }

        if (!user.email) {
          return false;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                provider: account?.provider,
                providerId: account?.providerAccountId,
              },
              { email: user.email },
            ],
          },
        });

        if (findUser) {
          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });

          return true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name || 'User#' + user.id,
            password: hashSync(user.id.toString(), 10),
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        });

        return true;
      } catch (e) {
        console.log('Error [SIGNIN]');
        return false;
      }
    },
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
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
      }

      return session;
    },
  },

  pages: {
    signIn: '/signin',
  },
};
