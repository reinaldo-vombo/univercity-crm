import { ChevronRight } from "lucide-react";

export function AuditChanges({ oldData, newData }: { oldData?: any; newData?: any }) {
   // CREATE — só newData
   if (!oldData && newData) {
      return (
         <div className="mt-3 space-y-1.5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Dados criados</p>
            {Object.entries(newData).map(([key, value]) => (
               <div key={key} className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 w-28 shrink-0">{key}</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-medium border border-emerald-100">
                     {String(value)}
                  </span>
               </div>
            ))}
         </div>
      )
   }

   // DELETE — só oldData
   if (oldData && !newData) {
      return (
         <div className="mt-3 space-y-1.5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Dados eliminados</p>
            {Object.entries(oldData).map(([key, value]) => (
               <div key={key} className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 w-28 shrink-0">{key}</span>
                  <span className="px-2 py-0.5 rounded-md bg-red-50 text-red-600 font-medium border border-red-100 line-through">
                     {String(value)}
                  </span>
               </div>
            ))}
         </div>
      )
   }

   // UPDATE — diff old vs new
   if (oldData && newData) {
      const changedKeys = Object.keys(newData).filter(
         (key) => JSON.stringify(oldData[key]) !== JSON.stringify(newData[key])
      )

      if (changedKeys.length === 0) return null

      return (
         <div className="mt-3 space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
               {changedKeys.length} campo{changedKeys.length > 1 ? 's' : ''} alterado{changedKeys.length > 1 ? 's' : ''}
            </p>
            {changedKeys.map((key) => (
               <div key={key} className="text-xs">
                  <span className="text-slate-500 font-medium block mb-1">{key}</span>
                  <div className="flex items-center gap-2 flex-wrap">
                     <span className="px-2 py-0.5 rounded-md bg-red-50 text-red-600 border border-red-100 line-through">
                        {String(oldData[key])}
                     </span>
                     <ChevronRight className="size-3 text-slate-400 shrink-0" />
                     <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 font-medium">
                        {String(newData[key])}
                     </span>
                  </div>
               </div>
            ))}
         </div>
      )
   }

   return null
}