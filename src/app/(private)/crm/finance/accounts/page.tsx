import Breadcrumb from '@/components/shared/breadcrumb'
import { Metadata } from 'next'
import React, { Suspense } from 'react'
import { AccountsServer } from './card-wrapper'
import { ROUTES } from '@/constants/routes'
import CreditCards from '@/components/skeleton/credit-cards'

export const metadata: Metadata = {
   title: 'Contas Bancarias'
}
export default function FinancePage() {
   return (
      <section className='col-span-12'>
         <Breadcrumb
            name="Contas Bancarias"
            pageName="Contas Bancarias"
            pageUrl={`${ROUTES.DASHBOARD}/finance/accounts`}
            root={`${ROUTES.DASHBOARD}`} />
         <div className="mt-12 space-y-7">

            <Suspense fallback={<CreditCards />}>
               <AccountsServer />
            </Suspense>
         </div>
      </section>
   )
}
