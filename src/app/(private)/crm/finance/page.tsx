import Breadcrumb from '@/components/shared/breadcrumb'
import { Metadata } from 'next'
import React, { Suspense } from 'react'
import { ROUTES } from '@/constants/routes'
import { TuitionDashboard } from '@/components/admin/wrapper/tuition-dashboard-wrapper'
import TuitionDashboardSkeleton from '@/components/skeleton/tuition-dashboard-skeleton'

export const metadata: Metadata = {
   title: 'Finanças - Todos Pagamentos de propina'
}
export default function FinancePage() {
   return (
      <section className='col-span-12'>
         <Breadcrumb
            name="Finanças"
            pageName="Finanças"
            pageUrl={`${ROUTES.DASHBOARD}/finance`}
            root={`${ROUTES.DASHBOARD}`} />
         <div className="mt-12 space-y-7">

            <Suspense fallback={<TuitionDashboardSkeleton />}>
               <TuitionDashboard />
            </Suspense>
         </div>
      </section>
   )
}
