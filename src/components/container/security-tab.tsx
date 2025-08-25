import { Fragment } from "react"
import { Clock, Lock, MailOpen, MapPin, Monitor, PhoneIncoming, ShieldCheck, Trash } from "lucide-react"
import { Separator } from "../ui/separator"
import { Switch } from "@/components/ui/switch"

const SecurityTab = () => {
   const sessionHistory = [
      {
         browser: 'Safari on Mac OS X',
         icon: '',
         location: 'Angola, Luanda',
         status: 'activo',
      },
      {
         browser: 'Chrome on Lenove Thinkpad',
         icon: '',
         location: 'Angola, Soio',
         status: '1 mês atras',
      },
   ]
   return (
      <Fragment>
         <div className="grid grid-cols-12 gap-2">
            <div className="col-span-8">
               <div className="flex items-center gap-2 max-w-lg">
                  <Lock className="size-5" />
                  <b>Gerenciar senha</b>
               </div>
               {/* <ChangePasswordForm /> */}
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
               <Separator />
            </div>
         </div>
         <div className="space-y-7">
            <div className="flex items-center gap-2">
               <Clock className="size-5 text-slate-200" />
               <b>Historico de sessão</b>
            </div>
            {sessionHistory.map((session, i) => (
               <Fragment key={i}>
                  <Separator />
                  <div className="flex justify-around">
                     <div className="flex items-center gap-2 w-80">
                        <div className="border rounded-full size-10 flex items-center justify-center">
                           <Monitor className="size-4" />
                        </div>
                        <b>{session.browser}</b>
                     </div>
                     <div className="flex items-center gap-2">
                        <MapPin className="text-slate-200 size-5" />
                        <b>{session.location}</b>
                     </div>
                     <div className="flex items-center gap-16">
                        <b>{session.status}</b>
                        <Trash className="text-slate-200 size-4" />
                     </div>
                  </div>
               </Fragment>
            ))}
         </div>
      </Fragment>
   )
}

export default SecurityTab
