import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { verifyPassword } from '@/utils/auth-util';
import { connectToDatabase } from '@/utils/db-util';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }: any) {
      // user data is passed over to the jwt for client side
      if (!user) {
        return token;
      } else {
        token.user = {
          username: user.username,
          id: user.id,
          name: user.name,
          email: user.email,
        };

        return token;
      }
    },
    async session({ session, token }: any) {
      // session callback is called whenever a session for that particular user is checked
      session.user = token.user;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({
          username: credentials?.username,
        });

        console.log('user', user);

        if (!user) {
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials?.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Incorrect user/password!');
        }

        client.close();

        return user as any;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as any),
  ],
  pages: {
    signIn: '/auth/signin',
  },
};

export default NextAuth(authOptions);
