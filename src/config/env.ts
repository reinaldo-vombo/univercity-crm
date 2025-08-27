import { z } from 'zod';

/**
 * Server-Only environment variables
 * Never import this in client code
 */

const serverShema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  API_BASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
});

/**
 * Client-expose environment variables
 * Must start with NEXT_PUBLIC_ to be included in the client bundle
 */

const clientShema = z.object({
  NEXT_APP_SITE_NAME: z.string(),
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  NEXT_PUBLIC_ASSETS_URL: z.string().url(),
  NEXT_PUBLIC_TIME_OUT_MS: z.string(),
  NEXT_PUBLIC_TIME_OUT_CHECK_MS: z.string(),
  NEXT_PUBLIC_TWITTER_CREATOR: z.string(),
  NEXT_PUBLIC_TWITTER_SITE: z.string(),
  NEXT_PUBLIC_SITE_NAME: z.string(),
  NEXT_PUBLIC_AUTHOR_NAME: z.string(),
  NEXT_PUBLIC_AUTHOR_SITE: z.string().url(),
});

const _serverEnv = serverShema.safeParse(process.env);
if (!_serverEnv.success) {
  console.error(
    'Invalid server environment variable',
    _serverEnv.error.format()
  );
  throw new Error('Invalid server environment variable');
}

export const serverEnv = _serverEnv.data;

const _clientEnv = clientShema.safeParse(process.env);
if (!_clientEnv.success) {
  console.error(
    'Invalid client environment variable',
    _clientEnv.error.format()
  );
  throw new Error('Invalid client environment variable');
}

export const clientEnv = _clientEnv.data;

export type TServerEnv = z.infer<typeof serverShema>;
export type TClientEnv = z.infer<typeof clientShema>;

export type Env = TServerEnv & TClientEnv;
