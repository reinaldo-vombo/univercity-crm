import { Suspense } from "react";
import { Button } from "../ui/button";
import ActivityLogsWrapper from "./wrapper/cards-wrapper";
import Link from "next/link";
import { ROUTES } from "@/constants/mock-data";
import ListItemsSkeleton from "../skeleton/list-items";


const filtersButtons = [
   { id: '1', lable: 'Hoje', value: 'today' },
   { id: '1', lable: 'Ontem', value: 'westerday' },
   { id: '1', lable: 'Essa semana', value: 'this week' },
]
const ActivityLogsDetails = () => {
   return (
      <div className="bg-card rounded-lg p-4">
         <span className="font-semibold">Últimas Atualizações</span>
         <div className="bg-card rounded-md p-2">
            <div className="flex items-center mb-4 gap-4">
               {filtersButtons.map((button) => (
                  <Button type="button" key={button.id}>{button.lable}</Button>
               ))}
            </div>
            <Suspense fallback={<ListItemsSkeleton />}>
               <ActivityLogsWrapper />
            </Suspense>
            <div className="mt-3.5 flex items-center justify-center">
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
