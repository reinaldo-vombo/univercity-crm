"use client"

import * as z from "zod"
// import { toast } from "sonner"
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
import { useTransition } from "react"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { resetPassword } from "@/actions/auth"
import { useRouter, useSearchParams } from "next/navigation"
const prev = {
   error: '',
   data: ''
}
export default function AdminResetPassword() {
   const searchParams = useSearchParams();
   const encodedToken = searchParams.get('token');
   const token = encodedToken ? decodeURIComponent(encodedToken) : null;

   const router = useRouter()
   const [isPending, startTransition] = useTransition();

   const form = useForm<z.infer<typeof resetPasswordSchema>>({
      resolver: zodResolver(resetPasswordSchema),
      defaultValues: {
         token,
         new_Password: "",
         confirm_Password: ""
      }
   })
   async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const result = await resetPassword(prev, formData);
            if (result.error) {
               toast.error(result.message);
               return;
            }
            toast.success('Senha Atualizada!');
            router.push('/auth/apanel/login')
         } catch (err) {
            toast.error(FLASH_MESSAGE.SERVER_ERROR);
            console.error(err);
         }
      });


   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl py-10">

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
            <SubmitBtn label="Atualisar" loading={isPending} />
         </form>
      </Form>
   )
}