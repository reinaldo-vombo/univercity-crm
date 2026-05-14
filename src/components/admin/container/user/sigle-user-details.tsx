
import { TBulkUser } from '@/types/global';
import { formatDistanceToNow, format } from 'date-fns'
import { pt } from 'date-fns/locale'
import { getFirstAndLastName } from '@/lib/helper';
import Avatar from '@/components/shared/avatar';
import { Lock, Star } from 'lucide-react';
import { AuditTimeline } from './audit-timeline';
const UserDetailsPage = ({ user }: { user: TBulkUser }) => {
   const { firstName, lastName } = getFirstAndLastName(user.name)
   const sortedLogs = [...user.AuditLog].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
   )

   return (
      <section className="col-span-12">
         <div className="mt-10 max-w-4xl mx-auto space-y-5">

            {/* Hero */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-2xl">
               <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
               <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-amber-500/10 blur-2xl" />

               <div className="relative flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-5">
                     <div className="relative">
                        <Avatar name={user.name} photo={user.avatar || ''} className="size-20 ring-4 ring-white/20 rounded-full" />
                        <span className={`absolute bottom-0 right-0 size-4 rounded-full ring-2 ring-slate-900 ${user.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                     </div>
                     <div>
                        <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
                        <div className="mt-1 flex items-center gap-2 text-amber-400 text-sm font-medium">
                           <Star className="size-4 fill-amber-400" />
                           <span>{user.role}</span>
                        </div>
                        <p className="mt-1 text-slate-400 text-sm">{user.email}</p>
                     </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 text-xs text-slate-400">
                     <span>Criado {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true, locale: pt })}</span>
                     <span>Último login: {user.lastLoginAt
                        ? format(new Date(user.lastLoginAt), "dd MMM yyyy HH:mm", { locale: pt })
                        : '—'}
                     </span>
                     {user.lockedUntil && (
                        <span className="flex items-center gap-1 text-red-400">
                           <Lock className="size-3" /> Bloqueado até {format(new Date(user.lockedUntil), "dd MMM HH:mm", { locale: pt })}
                        </span>
                     )}
                  </div>
               </div>
            </div>

            {/* Info + Audit lado a lado em telas grandes */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

               {/* Informações pessoais — col 2 */}
               <div className="lg:col-span-2 rounded-3xl border border-slate-100 bg-white shadow-sm p-6 space-y-4">
                  <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-widest">Informações</h2>

                  {[
                     { label: 'Primeiro Nome', value: firstName },
                     { label: 'Último Nome', value: lastName },
                     { label: 'Email', value: user.email },
                     { label: 'Telefone', value: `(+244) ${user.contact?.phone}` },
                     { label: 'Localização', value: user.contact?.location },
                     { label: 'Tentativas falhadas', value: String(user.failedLoginAttempts) },
                  ].map(({ label, value }) => (
                     <div key={label}>
                        <p className="text-xs text-slate-400 mb-1">{label}</p>
                        <p className="text-sm font-semibold text-slate-800 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                           {value || '—'}
                        </p>
                     </div>
                  ))}
               </div>

               {/* Audit Timeline — col 3 */}
               <div className="lg:col-span-3 rounded-3xl border border-slate-100 bg-white shadow-sm p-6">
                  <div className="flex items-center justify-between mb-5">
                     <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-widest">Auditoria</h2>
                     <span className="text-xs text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
                        {sortedLogs.length} registo{sortedLogs.length !== 1 ? 's' : ''}
                     </span>
                  </div>
                  <AuditTimeline logs={sortedLogs} />
               </div>

            </div>
         </div>
      </section>
   )
}
export default UserDetailsPage;

//SigleUserDetails