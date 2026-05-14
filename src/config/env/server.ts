// env/server.ts
// ⚠️ NUNCA importar em componentes client ou ficheiros com "use client"

import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  API_BASE_URL: z.string(),
  NEXTAUTH_SECRET: z.string(),
  APP_EMAIL: z.string(),
  ONBORDING: z.string(),
  NEXTAUTH_URL: z.string().url(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  UNIVERCITY_NAME: z.string(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Variáveis de ambiente do servidor inválidas:');
  console.error(parsed.error.format());
  throw new Error('Variáveis de ambiente do servidor inválidas');
}

export const serverEnv = parsed.data;
export type TServerEnv = z.infer<typeof schema>;
