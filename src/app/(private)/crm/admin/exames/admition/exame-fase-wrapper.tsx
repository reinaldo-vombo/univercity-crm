
import { getAllAdmitionExamesFase, getAllBuilding } from "@/services/data/academic";
import SheetModal from "@/components/shared/sheet-modal";
import { createUniqueId } from "@/lib/helper";
import CreateAdmitionExameFaseForm from "@/components/forms/post/create-admition-exame-fase";
import ExameFaseTable from "@/components/shared/tabeles/exame-fase-table";

const uid = createUniqueId("view");
export async function AdmitionExameFaseTableServer() {

   const [fases, buildings] = await Promise.all([
      getAllAdmitionExamesFase(),
      getAllBuilding()
   ])

   return (
      <div className="mt-8 space-y-6">
         <div className="flex items-center">
            <SheetModal
               trigger={<p className="">
                  Nova Fase
               </p>}
               side="right"
               id={uid}
               title="Criar Fase Para Exame De Acesso"
               className="sm:max-w-2xl"
               description='Formulario de criação de Fase Para Exame de Acesso'>
               <CreateAdmitionExameFaseForm building={buildings} />
            </SheetModal>
         </div>
         <ExameFaseTable data={fases} buildings={buildings} />

      </div>
   );
}
