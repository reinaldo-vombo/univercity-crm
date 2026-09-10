import { formatTimeAgo } from "@/lib/helper";
import { TActionHistory } from "@/types/global";
import { Activity, LogIn, PlusCircle, Settings2, Trash2 } from "lucide-react";


export function InfoRow({ icon: Icon, label, value, valueClass = "" }: any) {
   return (
      <div className="flex items-start gap-3 py-2.5">
         <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" strokeWidth={1.75} />
         <p className="text-[13.5px] leading-5 text-slate-400">
            {label}{" "}
            <span className={`font-medium text-slate-100 ${valueClass}`}>{value}</span>
         </p>
      </div>
   );
}


export function SectionLabel({ children }: { children: React.ReactNode }) {
   return <p className="mb-1 text-[11px] font-semibold tracking-wide text-muted-foreground">{children}</p>;
}

function getAuditIcon(action: string) {
   const a = action.toLowerCase();
   if (a.includes("create")) return PlusCircle;
   if (a.includes("delete") || a.includes("remove")) return Trash2;
   if (a.includes("login") || a.includes("signin")) return LogIn;
   if (a.includes("update") || a.includes("edit")) return Settings2;
   return Activity;
}

function auditTitle(log: TActionHistory) {
   const action =
      log.action.charAt(0).toUpperCase() + log.action.slice(1).toLowerCase();
   return `${action} · ${log.entityType}`;
}

function auditDescription(log: TActionHistory) {
   if (log.oldData && log.newData && typeof log.newData === "object") {
      const changed = Object.keys(log.newData).filter(
         (key) => JSON.stringify(log.oldData?.[key]) !== JSON.stringify(log.newData[key])
      );
      if (changed.length > 0) {
         return `Campos alterados: ${changed.join(", ")}`;
      }
   }
   return `Registo ${log.entityId} afectado por esta acção.`;
}

export function ActivityTimeline({
   auditLog,
   full = false,
}: {
   auditLog: TActionHistory[];
   full?: boolean;
}) {
   const items = full ? auditLog : auditLog.slice(0, 6);

   return (
      <div>
         <div className="mb-6 flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" strokeWidth={1.75} />
            <h2 className="text-[15px] font-semibold text-foreground">Registro de actividade</h2>
         </div>

         {items.length === 0 ? (
            <p className="text-[13.5px] text-muted-foreground">
               Ainda não há registos de actividade para este utilizador.
            </p>
         ) : (
            <div>
               {items.map((log, i) => (
                  <TimelineItem
                     key={log.id}
                     icon={getAuditIcon(log.action)}
                     title={auditTitle(log)}
                     time={formatTimeAgo(log.createdAt as unknown as string)}
                     last={i === items.length - 1}
                  >
                     {auditDescription(log)}
                  </TimelineItem>
               ))}
            </div>
         )}
      </div>
   );
}

function TimelineItem({
   icon: Icon,
   title,
   time,
   children,
   last = false,
}: {
   icon: React.ElementType;
   title: string;
   time: string;
   children: React.ReactNode;
   last?: boolean;
}) {
   return (
      <div className="relative pl-9">
         {!last && (
            <span className="absolute left-[13px] top-7 h-[calc(100%-4px)] w-px bg-border" />
         )}
         <span className="absolute left-0 top-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card">
            <Icon className="h-3.5 w-3.5 text-primary" strokeWidth={1.75} />
         </span>
         <div className="flex items-baseline justify-between gap-4">
            <h4 className="text-[15px] font-semibold text-foreground">{title}</h4>
            <span className="shrink-0 text-xs text-muted-foreground">{time}</span>
         </div>
         <div className="mt-1 pb-7 text-[13.5px] leading-5 text-muted-foreground">{children}</div>
      </div>
   );
}