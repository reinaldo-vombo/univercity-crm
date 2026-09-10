import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ACTION_META, SUBJECT_GROUPS } from "@/lib/helper/auth/permission-acess-scope";
import { Action, ACTIONS, hasPermission, SUBJECTS } from "@/lib/helper/auth/permissions";
import { ShieldCheck } from "lucide-react";

export function AccessScope({ userPermissions }: { userPermissions: string[] }) {
   console.log(userPermissions);

   const isFullAccess = userPermissions.includes("manage:all");

   return (
      <div>
         <SectionLabel>Âmbito de acesso</SectionLabel>

         {isFullAccess ? (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
               <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" strokeWidth={2} />
                  <p className="text-[13.5px] font-semibold text-foreground">
                     Acesso total · {SUBJECTS.length} módulos
                  </p>
               </div>
               <p className="mt-1 text-[12.5px] leading-5 text-muted-foreground">
                  Este perfil não tem restrições por módulo — gere todos os recursos do
                  sistema directamente.
               </p>
               <div className="mt-3 flex flex-wrap gap-1.5">
                  {ACTIONS.map((action) => (
                     <ActionBadge key={action} action={action} />
                  ))}
               </div>
            </div>
         ) : (
            <div className="space-y-3">
               {SUBJECT_GROUPS.map((group) => {
                  const grantedSubjects = group.subjects.filter((subject) =>
                     ACTIONS.some((action) => hasPermission(userPermissions, action, subject))
                  );
                  if (grantedSubjects.length === 0) return null;

                  return (
                     <div
                        key={group.label}
                        className="rounded-xl border border-border bg-muted/30 p-3.5"
                     >
                        <p className="mb-2 text-[12px] font-semibold text-foreground">
                           {group.label}
                        </p>
                        <div className="space-y-2">
                           {grantedSubjects.map((subject) => (
                              <div
                                 key={subject}
                                 className="flex items-center justify-between gap-3"
                              >
                                 <span className="text-[12.5px] text-muted-foreground">
                                    {subject}
                                 </span>
                                 <div className="flex gap-1">
                                    {ACTIONS.filter((action) =>
                                       hasPermission(userPermissions, action, subject)
                                    ).map((action) => (
                                       <ActionBadge key={action} action={action} compact />
                                    ))}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  );
               })}
            </div>
         )}
      </div>
   );
}

function ActionBadge({ action, compact = false }: { action: Action; compact?: boolean }) {
   const meta = ACTION_META[action];
   const Icon = meta.icon;

   if (compact) {
      return (
         <TooltipProvider delayDuration={150}>
            <Tooltip>
               <TooltipTrigger asChild>
                  <span
                     className={`flex h-5 w-5 items-center justify-center rounded-md border ${meta.className}`}
                  >
                     <Icon className="h-3 w-3" strokeWidth={2} />
                  </span>
               </TooltipTrigger>
               <TooltipContent side="top" className="text-xs">
                  {meta.label}
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
      );
   }

   return (
      <Badge
         variant="outline"
         className={`gap-1 rounded-md px-2 py-1 text-[11px] font-medium ${meta.className}`}
      >
         <Icon className="h-3 w-3" strokeWidth={2} />
         {meta.label}
      </Badge>
   );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
   return <p className="mb-1 text-[11px] font-semibold tracking-wide text-muted-foreground">{children}</p>;
}