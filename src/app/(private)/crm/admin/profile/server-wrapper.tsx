import Breadcrumb from '@/components/shared/breadcrumb'
import { ROUTES } from '@/constants/routes'
import { getUserById } from '@/services/data/user';
import { ActivityTimeline, InfoRow, SectionLabel } from './user.items';
import { CalendarDays, CheckCircle2, KeyRound, Lock, LogIn, Mail, MapPin, Phone, ShieldCheck, User, UserCog } from 'lucide-react';
import { formatDate, formatDateTime } from '@/lib/helper';
import Avatar from '@/components/shared/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccessScope } from './access-scope';
export default async function ProfileWrapper({ params }: {
   params: Promise<{
      id: string;
   }>
}) {
   const { id } = await params;

   const user = await getUserById(id);


   return (
      <div>
         <Breadcrumb
            name={user.name}
            pageName="Perfil"
            pageUrl={`${ROUTES.DASHBOARD}/admin/perfile`}
            root={`${ROUTES.DASHBOARD}/admin`}
         />

         <div className="min-h-screen w-full p-4 font-sans sm:p-8">
            {/* Header card */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
               <div
                  className="h-32 w-full sm:h-36"
                  style={{
                     backgroundImage: `
                        linear-gradient(
                           135deg,
                           color-mix(in oklch, var(--primary) 18%, transparent),
                           transparent 60%
                        ),
                        repeating-linear-gradient(
                           0deg,
                           color-mix(in oklch, var(--foreground) 3%, transparent) 0px,
                           color-mix(in oklch, var(--foreground) 3%, transparent) 1px,
                           transparent 1px,
                           transparent 42px
                        ),
                        repeating-linear-gradient(
                           90deg,
                           color-mix(in oklch, var(--foreground) 3%, transparent) 0px,
                           color-mix(in oklch, var(--foreground) 3%, transparent) 1px,
                           transparent 1px,
                           transparent 42px
                        )`,
                     backgroundColor: "color-mix(in oklch, var(--muted) 40%, transparent)",
                  }}
               />
               <div className="flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between sm:px-8">
                  <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end">
                     <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-card bg-muted sm:h-28 sm:w-28">
                        <Avatar
                           photo={user.avatar}
                           className="size-full rounded-md"
                           loading='eager'
                           name={user.name}
                        />
                     </div>
                     <div className="pb-1">
                        <div className="flex items-center gap-2">
                           <h1 className="text-2xl font-semibold text-foreground">
                              {user.name}
                           </h1>
                           <ShieldCheck className="h-5 w-5 text-primary" strokeWidth={2} />
                        </div>
                        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13.5px] text-muted-foreground">
                           <span className="flex items-center gap-1.5">
                              <UserCog className="h-3.5 w-3.5" strokeWidth={1.75} />
                              {user.roleRef.name}
                           </span>
                           <span className="flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
                              {user.contact.location}
                           </span>
                           <span className="flex items-center gap-1.5">
                              <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.75} />
                              Desde {formatDate(user.createdAt)}
                           </span>
                        </div>
                     </div>
                  </div>

                  <div className="pb-1">
                     <span
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-[13px] font-medium ${user.isActive
                           ? "border-emerald-800/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                           : "border-destructive/40 bg-destructive/10 text-destructive"
                           }`}
                     >
                        <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                        {user.isActive ? "Conta Activado" : "Conta Desativado"}
                     </span>
                  </div>
               </div>

               {/* Tabs trigger row lives inside the header card, tab content below */}
               <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="h-auto w-full justify-start gap-1 rounded-none border-t border-border bg-transparent px-6 py-0 sm:px-8">
                     <TabsTrigger
                        value="profile"
                        className="rounded-none rounded-t-lg border-b-2 border-transparent px-3 py-3 text-[13.5px] font-medium text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                     >
                        Profile
                     </TabsTrigger>
                     <TabsTrigger
                        value="access"
                        className="rounded-none rounded-t-lg border-b-2 border-transparent px-3 py-3 text-[13.5px] font-medium text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                     >
                        Access &amp; Roles
                     </TabsTrigger>
                     <TabsTrigger
                        value="audit"
                        className="rounded-none rounded-t-lg border-b-2 border-transparent px-3 py-3 text-[13.5px] font-medium text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                     >
                        Audit Log
                     </TabsTrigger>
                  </TabsList>

                  {/* PROFILE TAB */}
                  <TabsContent value="profile" className="mt-0 border-t border-border p-0">
                     <div className="grid grid-cols-1 gap-4 p-6 lg:grid-cols-[320px_1fr] sm:p-8">
                        <div>
                           <SectionLabel>Sobre</SectionLabel>
                           <div className="divide-y divide-border">
                              <InfoRow icon={User} label="Nome Completo" value={user.name} />
                              <InfoRow
                                 icon={CheckCircle2}
                                 label="Status"
                                 value={user.isActive ? "Active" : "Suspended"}
                                 valueClass="text-emerald-600 dark:text-emerald-400"
                              />
                              <InfoRow icon={ShieldCheck} label="Role" value={user.roleRef.name} />
                              <InfoRow icon={MapPin} label="Localização" value={user.contact.location} />
                           </div>

                           <SectionLabel>
                              <span className="mt-6 block">Contato</span>
                           </SectionLabel>
                           <div className="divide-y divide-border">
                              <InfoRow icon={Phone} label="Telefone" value={`+244 ${user.contact.phone}`} />
                              <InfoRow icon={Mail} label="Email" value={user.email} />
                           </div>

                           <SectionLabel>
                              <span className="mt-6 block">Segurança</span>
                           </SectionLabel>
                           <div className="divide-y divide-border">
                              <InfoRow
                                 icon={KeyRound}
                                 label="Failed login attempts"
                                 value={user.failedLoginAttempts}
                              />
                              <InfoRow icon={Lock} label="Account lock" value={user.lockedUntil ?? "None"} />
                              <InfoRow
                                 icon={LogIn}
                                 label="Último login"
                                 value={`${formatDate(user?.lastLoginAt || "")}, ${formatDateTime(user?.lastLoginAt || "")}`}
                              />
                           </div>
                        </div>

                        <ActivityTimeline auditLog={user.AuditLog} />
                     </div>
                  </TabsContent>

                  {/* ACCESS & ROLES TAB */}
                  <TabsContent value="access" className="mt-0 border-t border-border p-6 sm:p-8">
                     <SectionLabel>Access scope</SectionLabel>
                     <AccessScope userPermissions={user.permissions} />
                  </TabsContent>

                  {/* AUDIT LOG TAB (full list) */}
                  <TabsContent value="audit" className="mt-0 border-t border-border p-6 sm:p-8">
                     <ActivityTimeline auditLog={user.AuditLog} full />
                  </TabsContent>
               </Tabs>
            </div>
         </div>
      </div>
   )
}
