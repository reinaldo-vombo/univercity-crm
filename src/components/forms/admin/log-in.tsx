"use client"

import * as z from "zod"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { adminSchema } from "@/lib/validation/admin"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import SubmitBtn from "@/components/sheard/submit-btn"
import { Dispatch, SetStateAction } from "react"

type TProps = {
   onChange: Dispatch<SetStateAction<boolean>>
}

export default function AdminLogin({ onChange }: TProps) {
   const router = useRouter();
   const form = useForm<z.infer<typeof adminSchema>>({
      resolver: zodResolver(adminSchema),
      defaultValues: {
         email: '',
         password: ''
      }
   })
   async function onSubmit(values: z.infer<typeof adminSchema>) {
      const { email, password } = values;

      const userType = "admin";
      const identifier = email;
      try {
         const res = await signIn("credentials", {
            redirect: false,
            user_type: userType,
            identifier,
            password,
         });

         if (res?.error) {
            if (res?.error === 'CredentialsSignin') {
               toast.warning(FLASH_MESSAGE.WRONGE_CREDENTIALS)
            }
            toast.error(`Login failed: ${res.error}`);
            console.error(res.error);
         } else if (res?.ok) {
            toast.success(`${FLASH_MESSAGE.WELLCOME}`);
            router.push("/");  // Redirect on successful login
         } else {
            toast.error(`${FLASH_MESSAGE.UNESPECTED_ERROR}`);
         }
      } catch (error) {
         console.error("Form submission error", error);
         toast.error("Failed to submit the form. Please try again.");
      }
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="exemplo@gmail.com"
                           {...field} />
                     </FormControl>
                     <FormDescription>O seu email</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Palavra-passe</FormLabel>
                     <FormControl>
                        <Input placeholder="*********" {...field} />
                     </FormControl>
                     <FormDescription>Sua senha</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <SubmitBtn label="Entrar" loading={form.formState.isSubmitting} />
            <button
               className="cursor-pointer text-center"
               type="button"
               aria-label="forgo password"
               onClick={() => onChange(false)}>Esqueceu a palavra-passe?</button>
         </form>
      </Form>
   )
}