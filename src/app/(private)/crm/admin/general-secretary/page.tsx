import GeneralSecretaryWrapper from '@/components/admin/wrapper/general-secretary-wrapper'
import Breadcrumb from '@/components/shared/breadcrumb'
import DataTabelCards from '@/components/skeleton/data-tabel-cards'
import { ROUTES } from '@/constants/routes'
import { ArrowRight } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'


export const metadata: Metadata = {
   title: 'Secretaria Geral'
}
export default function GeneralSecretary() {
   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Secretaria Geral"
            pageName="Secretaria Geral"
            pageUrl={`${ROUTES.DASHBOARD}/admin/general-secretary`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div>
            <div className='flex items-center gap-3'>
               <Image
                  src='/logo.svg'
                  className="dark:invert"
                  width={200}
                  height={200}
                  alt='logo' />
               <div>
                  <h1 className="text-xl font-semibold">Secretaria Geral</h1>
                  <p className="text-sm text-gray-500 dark:text-white">
                     Gestão central de processos académicos e administrativos dos estudantes.
                  </p>
               </div>
            </div>
            <h2 className="text-2xl font-bold">Pedidos dos Alunos</h2>
            <p className="text-gray-600 mt-1 max-w-2xl dark:text-white">
               Nesta secção, podes visualizar, acompanhar e gerenciar todos os pedidos
               submetidos pelos estudantes, incluindo declarações, certificados,
               revisões académicas e outros serviços administrativos. Utilize os filtros
               e ferramentas disponíveis para facilitar a análise e o processamento de
               cada solicitação.
            </p>
            <div className="flex items-center mt-5">
               <Link href='/crm/admin/general-secretary/services' className='flex'>Serviços Academicos <ArrowRight /></Link>
            </div>
         </div>

         <Suspense fallback={<DataTabelCards />}>
            <GeneralSecretaryWrapper />
         </Suspense>
      </section>
   )
}
