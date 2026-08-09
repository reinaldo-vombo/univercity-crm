import Breadcrumb from "@/components/shared/breadcrumb";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { ROUTES } from "@/constants/routes"
import { Suspense } from "react";
import { StudentTableServer } from "./table-wrapper";
import { Metadata } from "next";
import { Eye } from "lucide-react";
import Modal from "@/components/shared/Modal";

export const metadata: Metadata = {
   title: 'Estudantes'
}
//sm:max-w-sm
export default function StudentPage() {
   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Alunos"
            pageName="Alunos"
            pageUrl={`${ROUTES.DASHBOARD}/admin/student`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-9 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
               <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  Gestão de Alunos
               </h1>
               <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                  Gerencie os alunos da instituição, acompanhe o estado das matrículas,
                  atribua turmas e mantenha os dados académicos sempre atualizados.
               </p>
            </div>

            <Modal title="Gerenciar o Aluno" trigger={
               <div className="w-full sm:w-auto">
                  <Eye className="mr-2 h-4 w-4" />
               </div>}>
               <p>Novo Aluno</p>
            </Modal>
         </div>
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <StudentTableServer />
            </Suspense>
         </div>
      </section>
   )
}
