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
import { forgotPasswordSchema } from "@/lib/validation/admin"
import SubmitBtn from "@/components/sheard/submit-btn"
import { Dispatch, SetStateAction } from "react"

type TProps = {
   onChange: Dispatch<SetStateAction<boolean>>
}

export default function AdminForgotPassWord({ onChange }: TProps) {
   const form = useForm<z.infer<typeof forgotPasswordSchema>>({
      resolver: zodResolver(forgotPasswordSchema),
      defaultValues: {
         email: '',
      }
   })
   async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
      const { email } = values;
      toast.success(email)

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
                           placeholder="Seu email"
                           {...field} />
                     </FormControl>
                     <FormDescription>O seu email</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <SubmitBtn label="Enviar" loading={form.formState.isSubmitting} />
            <div className="flex justify-center">
               <button type="button" aria-label="login" onClick={() => onChange(true)}>Entrar</button>
            </div>
         </form>
      </Form>
   )
}