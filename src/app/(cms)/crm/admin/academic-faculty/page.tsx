import Breadcrumb from '@/components/sheard/breadcrumb'
import { ROUTES } from '@/constants/mock-data'
import React, { Suspense } from 'react'
import SheetModal from '@/components/sheard/sheet-modal'
import { Plus } from 'lucide-react'
import CreateCurse from '@/components/forms/admin/post/create-academic-faculty'
import { CurseTableServer } from './table-wrapper'
import DataTableSkeleton from '@/components/skeleton/data-table'

export default function AcademicFacultyPage() {

   return (
      <section className="col-span-12">
         <div className='flex items-center justify-between'>
            <Breadcrumb
               name="Cursos"
               pageName="Cursos"
               pageUrl={`${ROUTES.DASHBOARD}/admin/curses`}
               root={`${ROUTES.DASHBOARD}/admin`} />
            <SheetModal triggerStyle="border h-[37px] rounded-md"
               side="right"
               trigger={<Plus />}
               title="Cria curso"><CreateCurse /></SheetModal>
         </div>
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <CurseTableServer />
            </Suspense>
         </div>
      </section>
   )
}
