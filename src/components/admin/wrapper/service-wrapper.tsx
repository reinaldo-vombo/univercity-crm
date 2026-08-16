

import { getAcademicServices } from "@/services/data/secretary";
import { TAcademicService } from "@/types/global";
import { BookOpen, Edit } from "lucide-react"
import { ServiceCard } from "../container/service-card";
import { getAllPrice } from "@/services/data/prices";
import SheetModal from "@/components/shared/sheet-modal";
import { createUniqueId } from "@/lib/helper";
import CreatAcademicServices from "@/components/forms/admin/post/create-academic-services";

const SERVICE_TYPE_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
   enrollment: { bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-400' },
   tuition: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-400' },
   certificate: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400' },
   exam: { bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-400' },
   default: { bg: 'bg-slate-50', text: 'text-slate-600', dot: 'bg-slate-400' },
}
const uid = createUniqueId("create");
export async function ServiceWrapper() {
   const [services, prices] = await Promise.all([
      getAcademicServices(),
      getAllPrice()
   ])
   // agrupar por tipo
   const grouped = services.reduce<Record<string, TAcademicService[]>>((acc, s) => {
      ; (acc[s.type] ??= []).push(s)
      return acc
   }, {})

   if (services.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <BookOpen className="size-10 mb-3 opacity-25" />
            <p className="text-sm">Nenhum serviço académico registado</p>
            <SheetModal side="right" className="sm:max-w-md" id={uid} title="Editar serviço" trigger={<Edit />}>
               <CreatAcademicServices prices={prices} />
            </SheetModal>
         </div>
      )
   }

   return (
      <>
         <div className="flex">
            <SheetModal side="right" id={uid} title="Criar serviço Academico" trigger={<Edit className="text-slate-300" />}>
               <CreatAcademicServices prices={prices} />
            </SheetModal>
         </div>
         <div className="space-y-7">
            {Object.entries(grouped).map(([type, items]) => {
               const style = SERVICE_TYPE_STYLE[type] ?? SERVICE_TYPE_STYLE.default
               return (
                  <div key={type}>
                     <div className="flex items-center gap-2 mb-3">
                        <span className={`size-2 rounded-full ${style.dot}`} />
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{type}</h3>
                        <span className="text-xs text-slate-300 ml-1">({items.length})</span>
                     </div>
                     <div className="space-y-2">
                        {items.map(s => (
                           <ServiceCard
                              key={s.id}
                              prices={prices}
                              SERVICE_TYPE_STYLE={SERVICE_TYPE_STYLE}
                              service={s} />
                        ))}
                     </div>
                  </div>
               )
            })}
         </div>
      </>
   )
}
