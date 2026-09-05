'use client'
import { Fragment } from "react"
import z from "zod"
import { Clock, Lock, MailOpen, MapPin, ShieldCheck, Smartphone, Trash } from "lucide-react"

import { Switch } from "@/components/ui/switch"
import { TAuthLogos } from "@/types/global"
import { formatDate, formatTimeAgo } from "@/lib/helper"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import SubmitBtn from "@/components/shared/submit-btn"
import { useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { changePasswordShema } from "@/lib/validation/user"
import Image from "next/image"
import { updatedUserPassword } from "@/actions/users"
import AlertModal from "@/components/shared/alert-modal"
import { deleteUserActivitys } from "@/actions/activitiys"

type TProps = {
   sessionHistory: TAuthLogos[]
}

const SecurityTab = ({ sessionHistory }: TProps) => {

   const showbrowser = (browserName: string) => {
      if (browserName === 'Edge') return '/assets/icons8-microsoft-edge-50.png'
      if (browserName === 'Chrome') return '/assets/icons8-chrome-50.png'
      if (browserName === 'Opera') return '/assets/icons8-opera-logo-50.png'
      if (browserName === 'FireFox') return '/assets/icons8-fire-fox-50.png'
      if (browserName === 'Brave') return '/assets/icons8-brave-web-browser-50.png'
   }
   const showOs = (osName: string) => {
      if (osName === 'Windows') return '/assets/icons8-windows-11-48.png'
      if (osName === 'Macos') return '/assets/icons8-mac-logo-48.png'
   }

   const form = useForm<z.infer<typeof changePasswordShema>>({
      resolver: zodResolver(changePasswordShema),
      defaultValues: {
         corrent_password: '',
         new_password: '',
         confirm_password: ''
      }
   })
   const [isPending, startTransition] = useTransition();

   async function onSubmit(values: z.infer<typeof changePasswordShema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await updatedUserPassword(formData);
            if (response.error) {
               toast.error(response.message);
               return;
            }
            toast.success(FLASH_MESSAGE.UPDATED);
            form.reset();
         } catch (error) {
            toast.error(FLASH_MESSAGE.SERVER_ERROR);
            console.error(error);
         }
      });
   }

   return (
      <Fragment>
         <div className="grid grid-cols-12 gap-6">

            {/* Coluna: alterar senha */}
            <div className="col-span-12 lg:col-span-8">
               <div className="rounded-2xl border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                     <div className="flex items-center justify-center size-9 rounded-full bg-slate-100 dark:bg-slate-800">
                        <Lock className="size-4" />
                     </div>
                     <div>
                        <h3 className="font-semibold leading-none">Gerenciar senha</h3>
                        <p className="text-xs text-muted-foreground mt-1">Atualize sua senha regularmente para manter sua conta segura</p>
                     </div>
                  </div>

                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-8">
                        <FormField
                           control={form.control}
                           name="corrent_password"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Senha antiga</FormLabel>
                                 <FormControl>
                                    <Input type="password" placeholder="Digite sua senha atual" {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <FormField
                              control={form.control}
                              name="new_password"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Senha nova</FormLabel>
                                    <FormControl>
                                       <Input type="password" placeholder="Nova senha" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="confirm_password"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Confirmar senha</FormLabel>
                                    <FormControl>
                                       <Input type="password" placeholder="Repita a nova senha" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                        <div className="flex justify-end">
                           <SubmitBtn label="Atualisar" loading={isPending} />
                        </div>
                     </form>
                  </Form>
               </div>
            </div>

            {/* Coluna: notificações */}
            <div className="col-span-12 lg:col-span-4">
               <div className="rounded-2xl border bg-card p-6 shadow-sm h-full flex flex-col">
                  <div className="flex flex-col items-center text-center gap-2 pb-6 border-b">
                     <div className="flex items-center justify-center size-16 rounded-full bg-slate-100 dark:bg-slate-800">
                        <ShieldCheck className="size-8 text-slate-400" />
                     </div>
                     <b>Preferências de notificação</b>
                     <p className="text-xs text-muted-foreground">Escolha como quer ser avisado</p>
                  </div>

                  <div className="space-y-5 pt-6">
                     <div className="flex items-center justify-between gap-4">
                        <div className="flex gap-3 items-start">
                           <Smartphone className="size-5 text-blue-400 mt-0.5 shrink-0" />
                           <div>
                              <b className="text-sm">Push Notification</b>
                              <p className="text-slate-400 text-xs">Receba notificações no seu telefone</p>
                           </div>
                        </div>
                        <Switch />
                     </div>

                     <div className="flex items-center justify-between gap-4">
                        <div className="flex gap-3 items-start">
                           <Smartphone className="size-5 text-blue-400 mt-0.5 shrink-0" />
                           <div>
                              <b className="text-sm">Notificação in App</b>
                              <p className="text-slate-400 text-xs">Receba notificações no aplicativo</p>
                           </div>
                        </div>
                        <Switch />
                     </div>

                     <div className="flex items-center justify-between gap-4">
                        <div className="flex gap-3 items-start">
                           <MailOpen className="size-5 text-red-400 mt-0.5 shrink-0" />
                           <div>
                              <b className="text-sm">Email</b>
                              <p className="text-slate-400 text-xs">Receba notificações por e-mail</p>
                           </div>
                        </div>
                        <Switch />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Histórico de sessão */}
         <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
               <Clock className="size-5 text-slate-400" />
               <b>Histórico de sessão</b>
            </div>

            <div className="space-y-3">
               {sessionHistory && sessionHistory.map((session) => (
                  <div
                     key={session.id}
                     className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                     <div className="flex items-center gap-2 min-w-0 sm:w-48">
                        <div className="border rounded-full size-9 flex items-center justify-center shrink-0">
                           <Image
                              src={showbrowser(session.browser.name) || ''}
                              width={18}
                              height={18}
                              className="rounded-full"
                              alt={session.browser.name}
                           />
                        </div>
                        <span className="font-medium text-sm truncate">{session.browser.name}</span>
                     </div>

                     <div className="flex items-center gap-2 min-w-0 sm:w-40">
                        <div className="border rounded-full size-9 flex items-center justify-center shrink-0">
                           <Image
                              src={showOs(session.os.name) || ''}
                              width={18}
                              height={18}
                              className="rounded-full"
                              alt={session.os.name}
                           />
                        </div>
                        <span className="font-medium text-sm truncate">{session.os.name}</span>
                     </div>

                     <div className="flex items-center gap-2 sm:w-40">
                        <MapPin className="text-slate-400 size-4 shrink-0" />
                        <span className="text-sm">{session.ip}</span>
                     </div>

                     <div className="flex items-center gap-2 sm:w-36">
                        <span className="text-sm text-muted-foreground">{formatDate(session.timestamp)}</span>
                     </div>

                     <div className="sm:w-32">
                        <span className="text-xs text-muted-foreground">{formatTimeAgo(session.timestamp)}</span>
                     </div>

                     <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${session.isActive
                           ? 'text-green-600 bg-green-500/10'
                           : 'text-red-600 bg-red-500/10'
                           }`}
                     >
                        {session.isActive ? 'Ativo' : 'Inativo'}
                     </span>

                     <div className="sm:ml-auto">
                        <AlertModal
                           trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer hover:text-red-600" />}
                           action={() => deleteUserActivitys(session.id)}
                        />
                     </div>
                  </div>
               ))}

               {(!sessionHistory || sessionHistory.length === 0) && (
                  <div className="text-center py-10 text-sm text-muted-foreground border rounded-xl">
                     Nenhuma sessão encontrada.
                  </div>
               )}
            </div>
         </div>
      </Fragment>
   )
}

export default SecurityTab;
