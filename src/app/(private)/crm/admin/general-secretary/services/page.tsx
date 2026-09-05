import { ServiceWrapper } from '@/components/admin/wrapper/service-wrapper'
import Breadcrumb from '@/components/shared/breadcrumb'
import { ROUTES } from '@/constants/routes'
import { Metadata } from 'next'
import React, { Suspense } from 'react'

export const metadata: Metadata = {
   title: 'Secretaria Geral - Serviços Academicos'
}
export default function ServicePage() {
   return (
      <section className='col-span-12'>
         <Breadcrumb
            name="Serviços Académicos"
            pageName="Serviços Académicos"
            pageUrl={`${ROUTES.DASHBOARD}/admin/general-secretary/services`}
            root={`${ROUTES.DASHBOARD}/admin/general-secretary`} />
         <div className='mt-12'>
            <h1 className="text-xl font-semibold">Serviços academicos</h1>
            <p className="text-sm text-gray-500 dark:text-white">
               Plataforma de gestão e acompanhamento dos processos e serviços académicos institucionais.
            </p>
         </div>
         <div className="mt-12">
            <Suspense fallback={<p>loading</p>}>
               <ServiceWrapper />
            </Suspense>
         </div>
      </section>
   )
}
