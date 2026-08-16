import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/routes"
import { Suspense } from "react";
import { AdmitionExameTableServer } from "./table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { Metadata } from "next";
import { AdmitionExameFaseTableServer } from "./exame-fase-wrapper";

export const metadata: Metadata = {
   title: 'Exames de Admissão'
}

export default function AdmitionExamePage() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Exames de Acesso"
            pageName="Exames de Acesso"
            pageUrl={`${ROUTES.DASHBOARD}/admin/admition-exames`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">

            <div className="my-8">
               <h2 className="text-3xl font-semibold">
                  Gestão dos Exames de Acesso
               </h2>

               <p className="mt-2 text-muted-foreground">
                  Crie, configure e acompanhe os exames de acesso disponíveis,
                  gerindo todas as informações necessárias para o processo de admissão.
               </p>
            </div>

            <Suspense fallback={<DataTableSkeleton />}>
               <AdmitionExameTableServer />
            </Suspense>

            <div className="mt-8">
               <h2 className="text-3xl font-semibold">Fases dos Exames de Acesso</h2>
               <p>Gerencie as Fases dos Exames de Acesso Para dar Inicio as Incrições para os Exames.</p>
            </div>

            <Suspense fallback={<DataTableSkeleton />}>
               <AdmitionExameFaseTableServer />
            </Suspense>
         </div>
      </section>
   )
}
