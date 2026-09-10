'use client'

import { Fragment } from "react"
import { MailOpen, ShieldCheck, Smartphone } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { TAuthLogos } from "@/types/global"
import SessionList from "./session-list"
import ResetForm from "./reset-form"

type TProps = {
   sessionHistory: TAuthLogos[]
}

const SecurityTab = ({ sessionHistory }: TProps) => {

   return (
      <Fragment>
         <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
               <ResetForm />
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
         <SessionList sessionHistory={sessionHistory} />
      </Fragment>
   )
}

export default SecurityTab;
