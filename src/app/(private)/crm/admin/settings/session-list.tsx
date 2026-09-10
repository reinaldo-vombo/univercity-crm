import { TAuthLogos } from "@/types/global"
import { formatDate, formatTimeAgo } from "@/lib/helper"
import AlertModal from "@/components/shared/alert-modal"
import { deleteUserActivitys } from "@/actions/activitiys"
import { Clock, MapPin, Trash } from "lucide-react"
import Image from "next/image"
type TProps = {
   sessionHistory: TAuthLogos[]
}

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

const SessionList = ({ sessionHistory }: TProps) => {
   return (
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
   )
}

export default SessionList
