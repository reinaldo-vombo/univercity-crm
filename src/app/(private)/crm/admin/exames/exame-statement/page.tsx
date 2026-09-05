
import { ROUTES } from "@/constants/routes";
import Breadcrumb from "@/components/shared/breadcrumb";
import { ServerWrapper } from "./table-wrapper";
import { Suspense } from "react";
import DataTableSkeleton from "@/components/skeleton/data-table";


export default function ExameStatemantPage() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Enunciados"
            pageName="Exames Acadêmicos"
            pageUrl={`${ROUTES.DASHBOARD}/admin/exame-statemant`}
            root={`${ROUTES.DASHBOARD}/admin`}
         />
         <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
               <h1 className="text-3xl font-bold">
                  Enunciados
               </h1>
               <p className="mt-1 max-w-xl text-sm">
                  Consulta, edita e organiza os enunciados usados nas avaliações.
                  Cada enunciado pode ser reutilizado em vários exames, mantendo as
                  alternativas e a correção sempre consistentes.
               </p>
            </div>


         </div>
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <ServerWrapper />
            </Suspense>
         </div>
      </section>
   );
}