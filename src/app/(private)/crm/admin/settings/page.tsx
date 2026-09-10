
import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/routes"
import { Metadata } from "next";
import ServerWrapper from "./server-wrapper";
import { Suspense } from "react";
import ToggleTabsSkeleton from "@/components/skeleton/toggle-tabs";

export const metadata: Metadata = {
   title: 'Cofigurações'
}

export default function SettingsPages() {
   return (
      <section className='col-span-12'>
         <Breadcrumb
            name="Configurações"
            pageName="Admin"
            pageUrl={`${ROUTES.SETTINGS}`}
            root={`${ROUTES.SETTINGS}`} />

         <div className="mt-12">
            <Suspense fallback={<ToggleTabsSkeleton />}>
               <ServerWrapper />
            </Suspense>
         </div>

      </section>
   )
}
