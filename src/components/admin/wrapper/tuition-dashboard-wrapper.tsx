// components/tuition/tuition-dashboard.tsx

import { MonthlyBarChart } from "@/components/shared/chart/monthly-bar-chart"
import { StatusDonutChart } from "@/components/shared/chart/status-donut-chart"
import { CompositionChart } from "@/components/shared/chart/composition-chart"
import { getTuitionData } from "@/constants/data"
import { PaymentTable } from "@/app/(private)/crm/finance/client-table"

export async function TuitionDashboard() {
   const data = await getTuitionData()
   return (
      <div className="flex flex-col gap-6 px-4 lg:px-6">

         {/* linha 1: bar chart (2/3) + donut (1/3) */}
         <div className="grid grid-cols-2 gap-6 @3xl/main:grid-cols-3">
            <div className="@3xl/main:col-span-2">
               <MonthlyBarChart payload={data} />
            </div>
            <StatusDonutChart payload={data} />
         </div>

         {/* linha 2: composição (1/2) + tabela (1/2) */}
         <div className="grid grid-cols-1 gap-6 @3xl/main:grid-cols-2">
            <CompositionChart payload={data} />
            <PaymentTable data={data} />
         </div>

      </div>
   )
}