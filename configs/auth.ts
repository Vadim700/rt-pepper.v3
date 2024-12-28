import type { AuthOptions, User } from 'next-auth';
import GoggleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { users } from '@/public/data/users';

export const authConfig: AuthOptions = {
  providers: [
    GoggleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const currenUser = users.find(
          (user: { email: string | undefined }) =>
            user.email === credentials?.email,
        );

        if (currenUser && currenUser.password === credentials.password) {
          const { password, ...userWithoutPassword } = currenUser;

          return userWithoutPassword as User;
        }

        return null;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/signin',
  },
};
