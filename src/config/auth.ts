import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getServerSession } from 'next-auth';
import { logUserActivitys } from '@/actions/activitiys';
import { decodeJwt } from 'jose';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
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
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const json = await res.json();

          // ✅ Passar mensagem de erro do backend para o utilizador
          if (!res.ok) {
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
            // throw new Error(json?.message ?? 'Credenciais inválidas');
          }

          const data = json?.data;
          if (!data?.user || !data?.accessToken) {
            throw new Error('Resposta inválida do servidor');
          }

          return {
            ...data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
        } catch (err: any) {
          throw new Error(err.message ?? 'Erro ao autenticar');
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        if (user?.id) {
          await logUserActivitys(user.id, user.refreshToken);
        }
      } catch (err) {
        console.error('❌ Failed to register user activity log:', err);
      }
      return true;
    },
    async jwt({ token, user, trigger, session }: any) {
      if (trigger === 'update' && session?.user) {
        return {
          ...token,
          name: session.user.name ?? token.name,
          email: session.user.email ?? token.email,
          avatar: session.user.avatar ?? token.avatar,
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
          refreshToken: user.refreshToken, //
          // Expirar 1 minuto antes para renovar a tempo
          // accessTokenExpiry: (decoded.exp ?? 0) * 1000,
          accessTokenExpiry: (decodeJwt(user.accessToken).exp ?? 0) * 1000,
          error: undefined,
        };
      }

      if (Date.now() < token.accessTokenExpiry) {
        return token;
      }

      try {
        const res = await fetch(`${process.env.API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({ refreshToken: token.refreshToken }),
        });

        const data = await res.json();
        // console.log('[JWT] Refresh response:', {
        //   ok: res.ok,
        //   hasNewAccess: !!data?.data?.accessToken,
        //   hasNewRefresh: !!data?.data?.refreshToken,

        //   oldRefresh: token.refreshToken?.substring(0, 20) + '...',
        //   newRefresh: data?.data?.refreshToken?.substring(0, 20) + '...',
        // });
        // console.log('rotation', data);

        if (!res.ok) throw new Error('Refresh falhou');

        return {
          ...token,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
          accessTokenExpiry: (decodeJwt(data.data.accessToken).exp ?? 0) * 1000,
          error: undefined,
        };
      } catch {
        return { ...token, error: 'RefreshTokenError' };
      }
    },

    session({ session, token }: any) {
      // ✅ Sessão inválida se não tem id ou tem erro de refresh
      if (!token.id) {
        return { ...session, user: undefined };
      }

      return {
        ...session,
        user: {
          id: token.id,
          role: token.role,
          name: token.name,
          email: token.email,
          avatar: token.avatar,
          contact: token.contact,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        },
        error: token.error, // ✅ expor erro para o cliente
      };
    },

    async redirect({ url, baseUrl }: any) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },

  pages: {
    signIn: '/auth/login',
    signOut: '/',
    error: '/auth/login', // ✅ redireciona erros para a página de login
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
