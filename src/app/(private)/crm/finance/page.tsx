import Breadcrumb from '@/components/shared/breadcrumb'
import DataTableSkeleton from '@/components/skeleton/data-table'
import { Metadata } from 'next'
import React, { Suspense } from 'react'
import { PaymentTableServer } from './table-wrapper'
import { ROUTES } from '@/constants/routes'
import BudgetCards from '@/components/layouts/cards/budget'

export const metadata: Metadata = {
   title: 'Finanças'
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
            <div>
               <BudgetCards />
            </div>
            <Suspense fallback={<DataTableSkeleton />}>
               <PaymentTableServer />
            </Suspense>
         </div>
      </section>
   )
}
