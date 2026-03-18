import React from 'react'
import StatusCardSkeleton from './satus-card';
import BarChartSkeleton from './bar-chart';
import { Skeleton } from '../ui/skeleton';
import { ChartBar } from 'lucide-react';
import ListItemsSkeleton from './list-items';

const DashbordSkeleton = () => {
   return (
      <div>
         <div className="@container/main flex flex-1 flex-col gap-2 ">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
               <StatusCardSkeleton />
            </div>
         </div>
         <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8">
               <div className="rounded-lg bg-card space-y-5 p-4">
                  <div className="flex items-center justify-between">
                     <div className="space-x-3 flex font-bold text-2xl">
                        <ChartBar /> <span>Pagamentos mensal</span>
                     </div>
                     <Skeleton className="rounded-md size-10" />
                  </div>
                  <BarChartSkeleton />
               </div>
            </div>
            <div className="col-span-4">
               <ListItemsSkeleton />
            </div>
         </div>
      </div>
   )
}

export default DashbordSkeleton;
