import ActivityLogsPreview from '@/components/admin/container/activity-logs-preview'
import { SectionCards } from '@/components/admin/container/section-card'
import RevenueBarChart from '@/components/shared/chart/bar-chart'
import { Button } from '@/components/ui/button'
import { getDashboardData } from '@/constants/data'
import { getAllUserActionHistory } from '@/services/data/history-logs'
import { ChartBar, Download } from 'lucide-react'

export default async function DashbordWrapper() {
   const [analitics, audiLogs] = await Promise.all([
      getDashboardData(),
      getAllUserActionHistory()
   ]) // aguarda aqui — Suspense captura
   return (
      <>
         <div className="@container/main flex flex-1 flex-col gap-2 ">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
               <SectionCards data={analitics} />
            </div>
         </div>
         <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8">
               <div className="rounded-lg bg-card space-y-5 p-4">
                  <div className="flex items-center justify-between">
                     <div className="space-x-3 flex font-bold text-2xl">
                        <ChartBar /> <span>Pagamentos mensal</span>
                     </div>
                     <Button className="flex items-center gap-2">
                        <Download />
                        Export
                     </Button>
                  </div>
                  <RevenueBarChart revenues={analitics} />
               </div>
            </div>
            <div className="col-span-4">
               <ActivityLogsPreview data={audiLogs} />
            </div>
         </div>
      </>
   )
}
