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
export const resetPasswordSchema = z.object({
  token: z.string(),
  new_Password: z.string().min(5, {
    message: "Palavra-passe deve contenter no minimo 5 carateres"
  }),
  confirm_Password: z.string().min(5, {
    message: "Palavra-passe deve contenter no minimo 5 carateres"
  })
});
