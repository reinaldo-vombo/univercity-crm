import BudgetCards from "@/components/layouts/cards/budget";
import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/mock-data";


export default function BugetsPage() {
   return (
      <section className="col-span-12">
         <Breadcrumb
            root={ROUTES.DASHBOARD}
            name="Orçametos"
            pageUrl={`${ROUTES.DASHBOARD}/finance`}
            pageName="Orçamentos"
         />
         <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
               <BudgetCards />
               <div className="px-4 lg:px-6">

               </div>
            </div>
         </div>
         orcamentos
      </section>
   )
}
