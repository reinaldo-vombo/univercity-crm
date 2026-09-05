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
import { use, useState, useTransition } from "react"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { resetPassword } from "@/actions/auth"
import { useRouter } from "next/navigation"
import ActionButton from "@/components/layouts/button/action-button"
import { SubmitState } from "@/types/global"
import Link from "next/link"
import { Eye, EyeClosed } from "lucide-react"
const prev = {
   error: '',
   data: ''
}
export default function AdminResetPassword({ promise }: { promise: Promise<any> }) {
   const [submitState, setSubmitState] = useState<SubmitState>('idle');
   const [showPassword, setShowPassWord] = useState('password')
   const { token } = use(promise)

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
         setSubmitState('loading')
         try {
            const result = await resetPassword(prev, formData);
            if (result.error) {
               toast.error(result.message);
               setSubmitState('error')
               setTimeout(() => setSubmitState('idle'), 3000)
               return;
            }
            toast.success('Senha Atualizada!');
            router.push('/auth/apanel/login')
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
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl py-10">

            <FormField
               control={form.control}
               name="new_Password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nova senha</FormLabel>
                     <FormControl className="relative">
                        <Input
                           placeholder="xxx-xx-xxx"
                           type="password"
                           {...field} />
                        {showPassword === 'password' ?
                           <EyeClosed className="absolute cursor-pointer right-3 top-2" onClick={() => setShowPassWord('text')} />
                           :
                           <Eye className="absolute cursor-pointer right-3 top-2" onClick={() => setShowPassWord('password')} />
                        }

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
                           type="password"
                           {...field} />
                     </FormControl>
                     <FormDescription>Confirma a senha</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <ActionButton submitState={submitState} isPending={isPending} />
            <div className="flex justify-center mt-4">
               <Link href='/auth/login'>Entrar</Link>
            </div>
         </form>
      </Form>
   )
}