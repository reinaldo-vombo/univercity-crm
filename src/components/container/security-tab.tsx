'use client'
import { Fragment } from "react"
import * as z from "zod"
import { Clock, Lock, MailOpen, MapPin, PhoneIncoming, ShieldCheck } from "lucide-react"
import { Separator } from "../ui/separator"
import { Switch } from "@/components/ui/switch"
import { TAuthLogos } from "@/types/global"
import { formatDate } from "@/lib/helper"
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
import SubmitBtn from "@/components/shared/submit-btn"
import { useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { addNewEvent } from "@/actions/events"
import { changePasswordShema } from "@/lib/validation/user"
import Image from "next/image"

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
            const response = await addNewEvent(formData);
            if (response.error) {
               toast.error(response.message);
               return;
            }
            toast.success(FLASH_MESSAGE.CREATED);
            form.reset();
         } catch (error) {
            toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
            console.error(error);
         }
      });

   }

   return (
      <Fragment>
         <div className="grid grid-cols-12 gap-2">
            <div className="col-span-8 pr-10">
               <div className="flex items-center gap-2 max-w-lg">
                  <Lock className="size-5" />
                  <b>Gerenciar senha</b>
               </div>
               <div>

                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-10">
                        <FormField
                           control={form.control}
                           name="corrent_password"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Senha antiga</FormLabel>
                                 <FormControl className="relative">
                                    <Input
                                       placeholder="xx-xxx-xxxx"
                                       {...field} />

                                 </FormControl>
                                 <FormDescription></FormDescription>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <div className="flex items-center gap-2 w-full">
                           <FormField
                              control={form.control}
                              name="new_password"
                              render={({ field }) => (
                                 <FormItem className="w-full">
                                    <FormLabel>Senha nova</FormLabel>
                                    <FormControl className="relative">
                                       <Input
                                          placeholder="xx-xxx-xxxx"
                                          {...field} />

                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="corrent_password"
                              render={({ field }) => (
                                 <FormItem className="w-full">
                                    <FormLabel>Confirmar senha</FormLabel>
                                    <FormControl className="relative">
                                       <Input
                                          placeholder="xx-xxx-xxxx"
                                          {...field} />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                        <SubmitBtn
                           label="Atualisar"
                           loading={isPending} />
                     </form>
                  </Form>
               </div>
            </div>
            <div className="col-span-4 flex gap-3">
               <Separator orientation="vertical" />
               <div className="space-y-7">
                  <div className="flex items-center justify-center gap-2 max-w-lg">
                     <ShieldCheck className="size-28 text-slate-200" />
                  </div>
                  {/* <div>
                     <Lock className="text-slate-400 size-4" />
                  </div> */}
                  <div className="flex gap-4">
                     <div className="flex gap-4 w-3xs">
                        <PhoneIncoming className="size-5 text-blue-400" />
                        <div className="space-y-3">
                           <b>Número de telefone</b>
                           <p className="text-slate-200 text-xs">Receba seu codigo de no seu telemovel</p>
                        </div>
                     </div>
                     <Switch />
                  </div>
                  <div className="flex gap-4 mt-5">
                     <div className="flex gap-4 w-3xs">
                        <MailOpen className="size-5 text-red-400" />
                        <div className="space-y-3">
                           <b>Email</b>
                           <p className="text-slate-200 text-xs">Use email para receber seu codigo</p>
                        </div>
                     </div>
                     <Switch />
                  </div>
               </div>
            </div>
         </div>
         <div className="space-y-7">
            <div className="flex items-center gap-2">
               <Clock className="size-5 text-slate-200" />
               <b>Historico de sessão</b>
            </div>
            {sessionHistory && sessionHistory.map((session) => (
               // <Separator />
               <div className="flex justify-around" key={session.id}>
                  <div className="flex items-center gap-2 w-80">
                     <div className="border rounded-full size-10 flex items-center justify-center">
                        <Image
                           src={showbrowser(session.browser.name) || ''}
                           width={20}
                           className="rounded-full"
                           height={20}
                           alt={session.browser.name}
                        />
                     </div>
                     <b>{session.browser.name}</b>
                  </div>
                  {/* <div className="flex items-center gap-2 w-80">
                        <div className="border rounded-full size-10 flex items-center justify-center">
                           <Monitor className="size-4" />
                        </div>
                        <b>{session.deviceType}</b>
                     </div> */}
                  <div className="flex items-center gap-2 w-80">
                     <div className="border rounded-full size-10 flex items-center justify-center">
                        <Image
                           src={showOs(session.os.name) || ''}
                           className="rounded-full"
                           width={20}
                           height={20}
                           alt={session.os.name}
                        />
                     </div>
                     <b>{session.os.name}</b>
                  </div>
                  <div className="flex items-center gap-2">
                     <MapPin className="text-slate-200 size-5" />
                     <b>{session.ip}</b>
                  </div>
                  <div className="flex items-center gap-16">
                     <b>{formatDate(session.timestamp)}</b>
                     {/* <b>{session.timestamp.getTime()}</b> */}
                     <b className={session.isActive ? 'text-green-500' : 'text-red-500'}>{session.isActive ? 'Activo' : 'Inativo'}</b>
                  </div>
               </div>
            ))}
         </div>
      </Fragment>
   )
}

export default SecurityTab
