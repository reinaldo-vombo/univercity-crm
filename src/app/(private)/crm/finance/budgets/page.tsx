import BudgetCards from "@/components/layouts/cards/budget";
import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/mock-data";
import { formatCurrency } from "@/lib/helper";
import { Suspense } from "react";
import { PaymentTableServer } from "./table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";


export default function BugetsPage() {
   return (
      <section className="col-span-12">
         <Breadcrumb
            root={ROUTES.DASHBOARD}
            name="Orçametos"
            pageUrl={`${ROUTES.DASHBOARD}/finance`}
            pageName="Orçamentos"
         />
         <div className="mt-12">
            <div className="space-y-3">
               <h2 className="text-2xl">Bem vindo de volta, Reginalde!</h2>
               <p>Todas as informações geral de pagamentos estão nessa pagina</p>
            </div>
            <div className="rounded-2xl p-4 bg-green-900 space-y-4 text-white">
               <p>Orcamento total</p>
               <h2 className="text-3xl font-bold">{formatCurrency(500000)}</h2>
               <p>Seu orcamento cresceu <b className="text-green-500">2,904</b></p>
            </div>
            <div className="@container/main flex flex-1 flex-col gap-2">
               <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <BudgetCards />
               </div>
            </div>
            <Suspense fallback={<DataTableSkeleton />}>
               <PaymentTableServer />
            </Suspense>
         </div>
      </section>
   )
}
