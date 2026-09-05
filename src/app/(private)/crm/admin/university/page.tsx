import Breadcrumb from '@/components/shared/breadcrumb'
import { ROUTES } from '@/constants/routes'
import { Metadata } from 'next'
import Image from 'next/image'
import RulesWrapper from './rules-wrapper'
import { serverEnv } from '@/config/env/server'
import { Suspense } from 'react'
import TuitionDashboardSkeleton from '@/components/skeleton/tuition-dashboard-skeleton'

export const metadata: Metadata = {
   title: 'Regras da Universidade'
}

export default function UniversityConfigPage() {
   const universityName = serverEnv.UNIVERCITY_NAME
   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Universidade"
            pageName="Universidade"
            pageUrl={`${ROUTES.DASHBOARD}/admin/university`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <div className='rounded-md card p-4 flex items-center gap-2'>
               <Image
                  src='/logo.svg'
                  className='dark:invert'
                  width={400} height={400}
                  alt={universityName}
               />
               <div className='space-y-3'>
                  <h1 className='text-2xl font-bold'>{universityName}</h1>
                  <h2 className='capitalize'>Configurações institucionais que definem as regras académicas, financeiras
                     e operacionais aplicadas a todos os alunos, docentes e processos da
                     universidade. Alterações aqui efectuadas têm impacto imediato em todo o
                     sistema — reveja cada parâmetro com atenção antes de guardar.</h2>
               </div>
            </div>
            <div>
               <Suspense fallback={<TuitionDashboardSkeleton />}>
                  <RulesWrapper />
               </Suspense>
            </div>
         </div>
      </section>
   )
}
