import * as z from 'zod';

export const adminSchema = z.object({
  email: z.string().email({ message: 'Pro-favore adicione e-mail valido' }),
  password: z
    .string()
    .min(8, { message: 'Palavra-passe deve contenter no minimo 7 caracteres' }),
});
export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Pro-favore adicione e-mail valido' }),
});
