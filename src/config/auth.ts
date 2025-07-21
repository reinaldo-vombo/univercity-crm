import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getServerSession } from 'next-auth';
import { END_POINTS } from '@/constants/mock-data';
import { FLASH_MESSAGE } from '@/constants/flash-message';

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
        user_type: { label: 'User Type', type: 'text' },
        identifier: { label: 'ID or Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          !credentials ||
          !credentials.user_type ||
          !credentials.identifier ||
          !credentials.password
        ) {
          return null;
        }

        const baseUrl = process.env.API_BASE_URL;

        let endpoint = '';
        let body: any = {};
        switch (credentials.user_type) {
          case 'admin':
            endpoint = END_POINTS.ADMIN;
            body = {
              email: credentials.identifier,
              password: credentials.password,
            };
            break;
          case 'faculty':
            endpoint = END_POINTS.FACULTY;
            body = {
              facultyId: credentials.identifier,
              password: credentials.password,
            };
            break;
          case 'student':
            endpoint = END_POINTS.STUDENTE;
            body = {
              studentId: credentials.identifier,
              password: credentials.password,
            };
            break;
          default:
            return null;
        }
        try {
          const res = await fetch(`${baseUrl}${endpoint}`, {
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
    jwt: ({ token, user, trigger, session }: any) => {
      if (token.expiresAt && token.expiresAt < Math.floor(Date.now() / 1000)) {
        return {};
      }
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
          accessToken: user.accessToken,
          expiresAt: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
          ...(user.role === 'admin' && { department: user.department }),
          ...(user.role === 'student' && { studentId: user.studentId }),
          ...(user.role === 'faculty' && { facultyId: user.facultyId }),
        };
      }

      return token;
    },
    session: ({ session, token }: any) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          name: token.name,
          email: token.email,
          avatar: token.avatar,
          accessToken: token.accessToken,
          ...(token.role === 'admin' && { department: token.department }),
          ...(token.role === 'student' && { class_id: token.class_id }),
          ...(token.role === 'faculty' && { subjects: token.subjects }),
        },
      };
    },
    async redirect({ url, baseUrl }: any) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/',
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
