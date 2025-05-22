import Breadcrumb from '@/components/sheard/breadcrumb'
import { ROUTES } from '@/constants/mock-data'
import React from 'react'
import { CursesTable } from './client-table'
import { getAllCurses } from '@/lib/helper/db/querys'
import SheetModal from '@/components/sheard/sheet-modal'
import { Plus } from 'lucide-react'
import CreateCurse from '@/components/forms/admin/create-curse'

export default async function AcademicFacultyPage() {
   const curses = await getAllCurses();
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
            <CursesTable data={curses} />
         </div>
      </section>
   )
}
