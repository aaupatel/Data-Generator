import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDatabase } from '@/lib/mongodb';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      try {
        const { db } = await connectToDatabase();
        const existingUser = await db.collection('users').findOne({ email: user.email });

        let userId;
        if (!existingUser) {
          const newUser = await db.collection('users').insertOne({
            name: user.name,
            email: user.email,
            provider: account?.provider,
            verified: true,
            createdAt: new Date(),
            subscription: {
              plan: 'free',
              status: 'active',
              expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 6)), // Free expires in 6 months
            },
          });
          userId = newUser.insertedId.toString(); // Use the newly created user's _id
        } else {
          userId = existingUser._id.toString(); // Use the existing user's _id
        }

        const token = sign(
          { id: userId, email: user.email },
          process.env.JWT_SECRET!,
          { expiresIn: '7d' }
        );

        const cookieStore = cookies();
        cookieStore.set('auth-token', token, {
          httpOnly: true,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return true;
      } catch (error) {
        console.error('Sign in error:', error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.provider = account?.provider;
      }
      return token;
    },

    async redirect({ url, baseUrl }) {
      // Redirect to `/` after successful login
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
});

export { handler as GET, handler as POST };
