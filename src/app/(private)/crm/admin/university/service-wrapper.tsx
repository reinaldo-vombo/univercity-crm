import SheetModal from "@/components/shared/sheet-modal"
import { createUniqueId } from "@/lib/helper";
import { getAcademicServices } from "@/services/data/university-config"
import { StarOff } from "lucide-react"

const uid = createUniqueId("create");
export default async function ServiceWrapper() {
   const services = await getAcademicServices()
   return (
      <div>
         <SheetModal
            side="right"
            id={uid}
            title="Serviço Academico"
            description="Formulario para criação de um serviço academico"
            trigger={<div className="rounded-md bg-primary p-2 text-center hover:bg-primary-foreground">Criar serviço</div>}>hello</SheetModal>
         <ul>
            {services.length > 0 ? services.map((service) => (
               <li key={service.id} className="flex items-center justify-between">
                  <span>{service.title}</span>
                  <b>{service.price.amount}</b>
               </li>
            )) : (
               <li className="flex items-center justify-center gap-4">
                  <StarOff className="size-12" />
                  <h2 className="text-2xl">Nenhum Serviço Academico Registrado</h2>
               </li>
            )}
         </ul>
      </div>
   )
}
