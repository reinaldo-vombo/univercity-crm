import Breadcrumb from '@/components/sheard/breadcrumb'
import { ROUTES } from '@/constants/mock-data'
import React, { Suspense } from 'react'
import SheetModal from '@/components/sheard/sheet-modal'
import { Plus } from 'lucide-react'
import CreateCurse from '@/components/forms/admin/post/create-faculty'
import { CurseTableServer } from './table-wrapper'

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
            <Suspense fallback={<div className="text-muted-foreground">Loading table...</div>}>
               <CurseTableServer />
            </Suspense>
         </div>
      </section>
   )
}
