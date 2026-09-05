
import { AuditChanges } from "./audi-changes"
import { pt } from 'date-fns/locale'
import { format, formatDistanceToNow } from "date-fns"
import { Activity, Globe, LogIn, Monitor, Pencil, Plus, Trash } from 'lucide-react';
import { TBulkUser } from "@/types/global"

const ACTION_CONFIG: any = {
   CREATE: {
      label: 'Criado',
      color: 'text-emerald-700',
      bg: 'bg-emerald-500',
      icon: <Plus className="size-3" />,
   },
   UPDATE: {
      label: 'Atualizado',
      color: 'text-blue-700',
      bg: 'bg-blue-500',
      icon: <Pencil className="size-3" />,
   },
   DELETE: {
      label: 'Eliminado',
      color: 'text-red-700',
      bg: 'bg-red-500',
      icon: <Trash className="size-3" />,
   },
   LOGIN: {
      label: 'Login',
      color: 'text-violet-700',
      bg: 'bg-violet-500',
      icon: <LogIn className="size-3" />,
   },
}

export function AuditTimeline({ logs }: { logs: TBulkUser['AuditLog'] }) {
   return (
      /* scrollável com altura máxima */
      <div className="relative max-h-[520px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
         {/* linha vertical */}
         <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-slate-200 via-slate-200 to-transparent" />

         <div className="space-y-1 pl-10">
            {logs.map((log) => {
               const config = ACTION_CONFIG[log.action] ?? {
                  label: log.action,
                  color: 'text-slate-700',
                  bg: 'bg-slate-400',
                  icon: <Activity className="size-3" />,
               }

               return (
                  <div key={log.id} className="relative group">
                     {/* dot no eixo */}
                     <div className={`absolute -left-10 top-3 size-6 rounded-full ${config.bg} flex items-center justify-center text-white shadow-md ring-4 ring-white`}>
                        {config.icon}
                     </div>

                     {/* card */}
                     <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200">
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                           <div className="flex items-center gap-2">
                              <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${config.color} ${config.bg.replace('bg-', 'bg-').replace('500', '50')} border border-current/10`}>
                                 {config.label}
                              </span>
                              <span className="text-xs text-slate-500 font-medium">{log.entityType}</span>
                              {log.entityId && (
                                 <span className="text-xs text-slate-300 font-mono">#{log.entityId.slice(0, 8)}</span>
                              )}
                           </div>

                           <div className="text-right shrink-0">
                              <p className="text-xs font-medium text-slate-700">
                                 {format(new Date(log.createdAt), "dd MMM yyyy, HH:mm", { locale: pt })}
                              </p>
                              <p className="text-xs text-slate-400">
                                 {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true, locale: pt })}
                              </p>
                           </div>
                        </div>

                        {/* ip / agent */}
                        {(log.ipAddress || log.userAgent) && (
                           <div className="mt-2 flex items-center gap-3 flex-wrap">
                              {log.ipAddress && (
                                 <span className="flex items-center gap-1 text-xs text-slate-400">
                                    <Globe className="size-3" /> {log.ipAddress}
                                 </span>
                              )}
                              {log.userAgent && (
                                 <span className="flex items-center gap-1 text-xs text-slate-400 truncate max-w-[200px]">
                                    <Monitor className="size-3" /> {log.userAgent}
                                 </span>
                              )}
                           </div>
                        )}

                        <AuditChanges oldData={log.oldData} newData={log.newData} />
                     </div>
                  </div>
               )
            })}
         </div>

         {logs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
               <Activity className="size-8 mb-3 opacity-30" />
               <p className="text-sm">Sem registos de auditoria</p>
            </div>
         )}
      </div>
   )
}