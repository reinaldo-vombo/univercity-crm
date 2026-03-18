import Breadcrumb from '@/components/shared/breadcrumb'
import { ROUTES } from '@/constants/routes'
import { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import RulesWrapper from './rules-wrapper'
import ServiceWrapper from './service-wrapper'
import { TabsNav } from '@/components/shared/toggle-tabs'

export const metadata: Metadata = {
   title: 'Regras da Universidade'
}
export default function UniversityConfigPage() {
   const tabs = [
      {
         id: '1',
         lable: 'Regras da Instituição',
         value: 'rules',
         tabContent: <Suspense fallback={<p>Loading...</p>}><RulesWrapper /></Suspense>,
         description: 'Gerencia as Regras da Instituição'
      },
      {
         id: '2',
         lable: 'Serviços Academicos',
         value: 'service',
         tabContent: <Suspense fallback={<p>Loading...</p>}><ServiceWrapper /></Suspense>,
         description: 'Gerencia os Serviços Academicos'
      },
   ]
   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Universidade"
            pageName="Universidade"
            pageUrl={`${ROUTES.DASHBOARD}/admin/university`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <div className='rounded-md card p-4 flex items-center gap-2'>
               <Image src='/logo.svg' width={400} height={400} alt='Enrollix - Instituto Superio' />
               <div>
                  <h1>Enrollix - Instituto Superio</h1>
                  <h2 className='capitalize text-2xl'>Está Está Pagina é Dedicado as Configurações ou Regras da Universidade</h2>
               </div>
            </div>
            <div>
               <TabsNav defaultValue={tabs[0].value} tabList={tabs} />
            </div>
         </div>
      </section>
   )
}
