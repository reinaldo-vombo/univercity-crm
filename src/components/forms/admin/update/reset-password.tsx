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
import { resetPasswordSchema } from "@/lib/validation/admin"
import SubmitBtn from "@/components/shared/submit-btn"

export default function AdminResetPassword() {
   const form = useForm<z.infer<typeof resetPasswordSchema>>({
      resolver: zodResolver(resetPasswordSchema),
      defaultValues: {
         token: "",
         new_Password: "",
         confirm_Password: ""
      }
   })
   async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
      const { token } = values;
      toast.success(token)
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
            <FormField
               control={form.control}
               name="token"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Token</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ensira o seu token"
                           {...field} />
                     </FormControl>
                     <FormDescription>Insira o token que foi-lhe enviado por email</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="new_Password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nova senha</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="xxx-xx-xxx"
                           {...field} />
                     </FormControl>
                     <FormDescription>Creie uma nova senha</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="confirm_Password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nova senha</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="xxx-xx-xxx"
                           {...field} />
                     </FormControl>
                     <FormDescription>Confirma a senha</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <SubmitBtn label="Enviar" loading={form.formState.isSubmitting} />

         </form>
      </Form>
   )
}