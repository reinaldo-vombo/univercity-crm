import { Suspense } from "react";
import ActivityLogsWrapper from "./wrapper/cards-wrapper";
import Link from "next/link";
import { ROUTES } from "@/constants/mock-data";
import ListItemsSkeleton from "../skeleton/list-items";
import FilterActivictys from "./container/filter-activictys";
import { Separator } from "../ui/separator";

const ActivityLogsDetails = () => {

   return (
      <div className="bg-card rounded-lg p-4">
         <span className="font-semibold">Últimas Actividades</span>
         <div className="bg-card rounded-md p-2">
            <FilterActivictys />
            <Suspense fallback={<ListItemsSkeleton />}>
               <ActivityLogsWrapper />
            </Suspense>
            <div className="mt-3.5 flex flex-col items-center justify-center space-y-4">
               <Separator />
               <Link
                  href={`${ROUTES.DASHBOARD}/admin/activitys`}
                  className="text-primary"
                  prefetch={false}>Mais historicos</Link>
            </div>
         </div>
      </div>
   )
}

export default ActivityLogsDetails;
