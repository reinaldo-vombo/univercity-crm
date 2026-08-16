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
import { Dispatch, SetStateAction, useState, useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { recoverPassword } from "@/actions/auth"
import ActionButton from "@/components/layouts/button/action-button"
import { SubmitState } from "@/types/global"

type TProps = {
   onChange: Dispatch<SetStateAction<boolean>>
}

export default function AdminForgotPassWord({ onChange }: TProps) {
   const [submitState, setSubmitState] = useState<SubmitState>('idle');
   const [isPending, startTransition] = useTransition();
   const form = useForm<z.infer<typeof forgotPasswordSchema>>({
      resolver: zodResolver(forgotPasswordSchema),
      defaultValues: {
         email: '',
      }
   })
   async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
      const { email } = values;

      startTransition(async () => {
         setSubmitState('loading')
         try {
            const result = await recoverPassword(email);
            if (result.error) {
               setSubmitState('error')
               setTimeout(() => setSubmitState('idle'), 3000)
               toast.error(result.message);
               return;
            }
            setSubmitState('success')
            setTimeout(() => setSubmitState('idle'), 3000)
            toast.success('Verifique Sua Caixa de Correio');
            form.reset();
         } catch (err) {
            setSubmitState('error')
            setTimeout(() => setSubmitState('idle'), 3000)
            toast.error(FLASH_MESSAGE.SERVER_ERROR);
            console.error(err);
         }
      });

   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full py-10">
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ensira o seu email"
                           {...field} />
                     </FormControl>
                     <FormDescription>Ex: awsome@gmail.com</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <ActionButton submitState={submitState} isPending={isPending} />
            <div className="flex justify-center">
               <button type="button" className="cursor-pointer" aria-label="login" onClick={() => onChange(true)}>Entrar</button>
            </div>
         </form>
      </Form>
   )
}