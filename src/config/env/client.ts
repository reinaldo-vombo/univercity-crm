import { z } from 'zod';

const schema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  NEXT_PUBLIC_ASSETS_URL: z.string().url(),
  NEXT_PUBLIC_SITE_NAME: z.string().min(1),
  NEXT_PUBLIC_AUTHOR_NAME: z.string().min(1),
  NEXT_PUBLIC_AUTHOR_SITE: z.string().url(),
  NEXT_PUBLIC_TWITTER_CREATOR: z.string().min(1),
  NEXT_PUBLIC_TWITTER_SITE: z.string().min(1),
  NEXT_PUBLIC_UNIVERCITY_NAME: z.string().min(1),
  NEXT_PUBLIC_UNIVERCITY_WEBSITE: z.string().url(),
});

const parsed = schema.safeParse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_ASSETS_URL: process.env.NEXT_PUBLIC_ASSETS_URL,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_AUTHOR_NAME: process.env.NEXT_PUBLIC_AUTHOR_NAME,
  NEXT_PUBLIC_AUTHOR_SITE: process.env.NEXT_PUBLIC_AUTHOR_SITE,
  NEXT_PUBLIC_TWITTER_CREATOR: process.env.NEXT_PUBLIC_TWITTER_CREATOR,
  NEXT_PUBLIC_TWITTER_SITE: process.env.NEXT_PUBLIC_TWITTER_SITE,
  NEXT_PUBLIC_UNIVERCITY_NAME: process.env.NEXT_PUBLIC_UNIVERCITY_NAME,
  NEXT_PUBLIC_UNIVERCITY_WEBSITE: process.env.NEXT_PUBLIC_UNIVERCITY_WEBSITE,
});

if (!parsed.success) {
  console.error('Variáveis de ambiente do cliente inválidas:');
  console.error(parsed.error.format());
  throw new Error('Variáveis de ambiente do cliente inválidas');
}

export const clientEnv = parsed.data;
export type TClientEnv = z.infer<typeof schema>;
