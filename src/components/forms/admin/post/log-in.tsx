"use client"

import z from "zod"
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
// import SubmitBtn from "@/components/shared/submit-btn"
import { Dispatch, SetStateAction, useState, useTransition } from "react"
import { ROUTES } from "@/constants/routes"
import { Eye, EyeClosed } from "lucide-react"
import { Button } from "@/components/ui/button"
import ActionButton from "@/components/layouts/button/action-button"
import { SubmitState } from "@/types/global"

type TProps = {
   onChange: Dispatch<SetStateAction<boolean>>
}

export default function AdminLogin({ onChange }: TProps) {
   const [isPending, startTransition] = useTransition();
   const [submitState, setSubmitState] = useState<SubmitState>('idle');
   const router = useRouter();
   const [showPassword, setShowPassWord] = useState('password')
   const form = useForm<z.infer<typeof adminSchema>>({
      resolver: zodResolver(adminSchema),
      defaultValues: {
         email: '',
         password: ''
      }
   })
   async function onSubmit(values: z.infer<typeof adminSchema>) {
      setSubmitState('loading')
      const { email, password } = values;
      startTransition(async () => {
         try {
            const res = await signIn("credentials", {
               redirect: false,
               email,
               password,
            });

            if (!res) {
               setSubmitState('error')
               toast.error("Não foi possível conectar ao servidor.");
               setTimeout(() => setSubmitState('idle'), 3000)
               return;
            }

            if (res.error) {
               switch (res.error) {
                  case "CredentialsSignin":
                     setSubmitState('error')
                     toast.warning(FLASH_MESSAGE.INVALID_CREDENTIALS);
                     setTimeout(() => setSubmitState('idle'), 3000)
                     break;

                  case "NetworkError":
                  case "fetch failed":
                  case "Failed to fetch":
                     setSubmitState('error')
                     toast.error("Servidor indisponível. Tente novamente mais tarde.");
                     setTimeout(() => setSubmitState('idle'), 3000)
                     break;

                  default:
                     toast.error(FLASH_MESSAGE.INTERNAL_ERROR);
               }

               return;
            }

            if (res.ok) {
               setSubmitState('success')
               toast.success(FLASH_MESSAGE.SUCCESS);
               setTimeout(() => router.push(`${ROUTES.DASHBOARD}/admin`), 2000)

            }

         } catch (error: any) {
            console.error("Login error:", error);
            setSubmitState('error')
            setTimeout(() => setSubmitState('idle'), 3000)
            if (
               error?.message?.includes("fetch") ||
               error?.message?.includes("ECONNREFUSED") ||
               error?.message?.includes("network")
            ) {
               toast.error("Não foi possível conectar ao servidor.");
            } else {
               setSubmitState('error')
               toast.error(FLASH_MESSAGE.SERVER_ERROR);
               setTimeout(() => setSubmitState('idle'), 3000)
            }
         }

      })
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
                        <div className="relative">
                           <Input placeholder="xxx-xx-xxxx-xx" type={showPassword} {...field} />
                           {showPassword === 'password' ?
                              <EyeClosed className="absolute cursor-pointer right-3 top-2" onClick={() => setShowPassWord('text')} />
                              :
                              <Eye className="absolute cursor-pointer right-3 top-2" onClick={() => setShowPassWord('password')} />
                           }

                        </div>

                     </FormControl>
                     <FormDescription>Sua senha</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <ActionButton submitState={submitState} isPending={isPending} />
            {/* <SubmitBtn label="Entrar" loading={form.formState.isSubmitting} /> */}
            <Button
               variant={'ghost'}
               className="cursor-pointer text-center underline"
               type="button"
               aria-label="Botão de esqueceu a palavra-passe"
               onClick={() => onChange(false)}>Esqueceu a palavra-passe?</Button>
         </form>
      </Form>
   )
}