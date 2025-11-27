
import ServerWrapper from "./server-wrapper";
import { Suspense } from "react";
import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/mock-data";
import CalendarSkeleton from "@/components/skeleton/calendar";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: 'Caledario'
}

export default function EventsPage() {
   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Calendario"
            pageName="Calendario"
            pageUrl={`${ROUTES.DASHBOARD}/calendar`}
            root={`${ROUTES.DASHBOARD}`} />

         <p className="mt-4">Gerencia as datas dos eventos a decorrer na instituição, mantendo funcionarios e alunos atualizados sobre futuras ocorrencia</p>
         <div className="mt-12">
            <Suspense fallback={<CalendarSkeleton />}>
               <ServerWrapper />
            </Suspense>
         </div>
      </section>
   )
}
