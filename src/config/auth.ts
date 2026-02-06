import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getServerSession } from 'next-auth';
import { FLASH_MESSAGE } from '@/constants/flash-message';
import { logUserActivitys } from '@/actions/activitiys';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // ✅ Add this to match token expiry
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const baseUrl = process.env.API_BASE_URL;
        const body = {
          email: credentials.email,
          password: credentials.password,
        };

        try {
          const res = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });

          if (!res.ok) {
            // Parse error response if available
            let errorResponse = null;
            try {
              errorResponse = await res.json();
            } catch {
              // ignore parsing error
            }
            console.error('❌ API error response:', {
              status: res.status,
              statusText: res.statusText,
              errorResponse,
            });
            return null;
          }

          const json = await res.json();
          const data = json?.data;

          if (!data?.user || !data?.accessToken) {
            console.error('❌ Missing user or accessToken in response', data);
            return null;
          }

          return {
            ...data.user,
            accessToken: data.accessToken,
          };
        } catch (err) {
          console.error(`❌ ${FLASH_MESSAGE.SERVER_ERROR_500}`, err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        if (user?.id) {
          // 👇 pass req.headers into your logging function
          await logUserActivitys(user.id);
        }
      } catch (err) {
        console.error('❌ Failed to register user activity log:', err);
        // Don’t block login if logging fails
      }
      return true;
    },
    async jwt({ token, user, trigger, session }: any) {
      if (token.expiresAt && token.expiresAt < Math.floor(Date.now() / 1000)) {
        return {};
      }
      // if (token.id) {
      //   const dbUser = await getSigleUser(token.id);

      //   if (!dbUser) {
      //     return {};
      //   }
      // }
      if (trigger === 'update' && session?.user) {
        return {
          ...token,
          name: session.user.name || token.name,
          email: session.user.email || token.email,
          avatar: session.user.avatar || token.avatar,
        };
      }

      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          contact: user.contact,
          accessToken: user.accessToken,
          expiresAt: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
        };
      }

      return token;
    },
    session: ({ session, token }) => {
      if (!token.id) {
        return {
          ...session,
          user: undefined,
        };
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          name: token.name,
          email: token.email,
          avatar: token.avatar,
          contact: token.contact,
          accessToken: token.accessToken,
        },
        expiresAt: token.expiresAt,
      };
    },
    async redirect({ url, baseUrl }: any) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: '/auth',
    signOut: '/',
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
