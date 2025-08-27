
import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/mock-data";
import { Suspense } from "react";
import ServerWrapper from "./server-wrapper";
import ToggleTabs from "@/components/skeleton/toggle-tabs";


export default function SettingsPages() {

   return (
      <section className='col-span-12'>
         <Breadcrumb
            name="Configurações"
            pageName="Configurações"
            pageUrl={`${ROUTES.SETTINGS}`}
            root={`${ROUTES.SETTINGS}`} />
         <Suspense fallback={<ToggleTabs />}>
            <ServerWrapper />
         </Suspense>

      </section>
   )
}
