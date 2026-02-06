import CreateAdmitionExameFase from "@/components/forms/post/create-admition-exame-fase"
import ExameFaseCard from "@/components/layouts/cards/exame-fase"
import SheetModal from "@/components/shared/sheet-modal"
import { createUniqueId } from "@/lib/helper"
import { TAdmitionExameFase, TBuilding } from "@/types/global"
type TProps = {
   fases: TAdmitionExameFase[];
   buildings: TBuilding[]
}

export default function AdmitionExameFases({ fases, buildings }: TProps) {

   const uid = createUniqueId("view");
   return (
      <div className="mt-8 space-y-6">
         <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Fases dos exames</h2>
            <SheetModal
               trigger={<div className="p-2 rounded-md border hover:bg-primary-foreground">
                  Criar fase
               </div>}
               side="right"
               id={uid}
               title="Criar Fase de exame"
               className="sm:max-w-3xl"
               description='Formulario de criação de fase de exame'>
               <CreateAdmitionExameFase building={buildings} />
            </SheetModal>
         </div>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis eius sunt, illo eveniet ducimus voluptatem qui. Exercitationem non optio, corrupti, officiis quidem iste esse voluptates pariatur maiores distinctio perferendis harum.</p>
         <ExameFaseCard fases={fases} building={buildings} />
      </div>
   )
}
