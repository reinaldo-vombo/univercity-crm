import Breadcrumb from "@/components/shared/breadcrumb";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { ROUTES } from "@/constants/routes";
import { Suspense } from "react";
import { ServerWrapper } from "./table-wrapper";

export default function AnswerSheetPage() {
   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Exames"
            pageName="Provas"
            pageUrl={`${ROUTES.DASHBOARD}/admin/exame/answer-sheet`}
            root={`${ROUTES.DASHBOARD}/admin/exame`}
         />
         <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
               <h1 className="text-3xl font-bold">
                  Exames Realizados
               </h1>
               <p className="mt-1 max-w-xl text-sm">
                  Consulte e acompanhe os exames e provas já realizados. Visualize os detalhes
                  de cada avaliação, os resultados e o histórico das provas aplicadas.
               </p>
            </div>


         </div>
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <ServerWrapper />
            </Suspense>
         </div>
      </section>
   )
}
