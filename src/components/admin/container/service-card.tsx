'use client'

import { TAcademicService } from "@/types/global"
import { format } from "date-fns"
import { pt } from "date-fns/locale"
import { BookOpen, Edit, Trash } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import { createUniqueId } from "@/lib/helper"
import AlertModal from "@/components/shared/alert-modal"
import { deleteAcademicService } from "@/actions/secretary"
import CreatAcademicServices from "@/components/forms/admin/post/create-academic-services"

const uid = createUniqueId("update");
export function ServiceCard({ service, prices, SERVICE_TYPE_STYLE }: {
   service: TAcademicService
   SERVICE_TYPE_STYLE: any
   prices: any
}) {
   const style = SERVICE_TYPE_STYLE[service.type] ?? SERVICE_TYPE_STYLE.default
   async function handleDelete(id: string) {
      await deleteAcademicService(id)
   }

   return (
      <div className="group relative flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200">
         {/* barra lateral colorida */}
         <div className={`absolute left-0 top-3 bottom-3 w-1 rounded-full ${style.dot}`} />

         <div className="flex items-center gap-4 pl-3 min-w-0">
            {/* ícone */}
            <div className={`shrink-0 size-10 rounded-xl flex items-center justify-center ${style.bg}`}>
               <BookOpen className={`size-5 ${style.text}`} />
            </div>

            <div className="min-w-0">
               <p className="text-sm font-semibold text-slate-800 truncate">{service.title}</p>
               <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
                     {service.type}
                  </span>
                  <span className="text-xs text-slate-400">
                     {format(new Date(service.createdAt), "dd MMM yyyy", { locale: pt })}
                  </span>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-4 shrink-0">
            {/* preço */}
            <div className="text-right">
               <p className="text-xs text-slate-400 mb-0.5">Valor</p>
               <p className="text-base font-bold text-slate-900">
                  {service.price.amount.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
               </p>
            </div>

            {/* ações */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
               <SheetModal side="right" id={uid} title="Editar serviço" trigger={<Edit />}>
                  <CreatAcademicServices prices={prices} />
               </SheetModal>
               <AlertModal
                  trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                  action={() => handleDelete(service.id)} />
            </div>
         </div>
      </div>
   )
}