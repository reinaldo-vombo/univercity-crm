import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/routes"
import { Suspense } from "react";
import { RoomTableServer } from "./table-wrapper";
import DataTableSkeleton from "@/components/skeleton/data-table";
import { Metadata } from "next";
//diciplinas
export const metadata: Metadata = {
   title: 'Salas'
}

export default function RoomsPage() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Salas"
            pageName="Salas"
            pageUrl={`${ROUTES.DASHBOARD}/admin/rooms`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <RoomTableServer />
            </Suspense>
         </div>
      </section>
   )
}
