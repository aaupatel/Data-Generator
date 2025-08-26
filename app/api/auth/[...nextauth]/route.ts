import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDatabase } from '@/lib/mongodb';
import { User, Account } from 'next-auth';
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}

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
    async signIn({ user, account }: { user: User; account: Account | null }): Promise<boolean> {
      if (!user.email) return false;

      try {
        const { db } = await connectToDatabase();
        const existingUser = await db.collection('users').findOne({ email: user.email });

        if (!existingUser) {
          const result = await db.collection('users').insertOne({
            name: user.name,
            email: user.email,
            provider: account?.provider,
            verified: true,
            createdAt: new Date(),
            subscription: {
              plan: 'free',
              status: 'active',
              expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 6)),
            },
          });
          // Attach the new database user ID to the user object
          user.id = result.insertedId.toString();
        } else {
          // Attach the existing database user ID to the user object
          user.id = existingUser._id.toString();
        }

        return true; // Allow the sign-in
      } catch (error) {
        console.error('Sign in error:', error);
        return false; // Prevent sign-in on error
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // The token's `id` property comes from the `jwt` callback
      session.user.id = token.id;
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Redirect to the home page after successful login
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
