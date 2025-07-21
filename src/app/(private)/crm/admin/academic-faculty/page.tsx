import Breadcrumb from '@/components/shared/breadcrumb'
import { ROUTES } from '@/constants/mock-data'
import React, { Suspense } from 'react'
import { CurseTableServer } from './table-wrapper'
import DataTableSkeleton from '@/components/skeleton/data-table'

export default function AcademicFacultyPage() {

   return (
      <section className="col-span-12">
         <Breadcrumb
            name="Unidade Acadêmica"
            pageName="Unidade Acadêmica"
            pageUrl={`${ROUTES.DASHBOARD}/admin/academic-faculty`}
            root={`${ROUTES.DASHBOARD}/admin`} />
         <div className="mt-12">
            <Suspense fallback={<DataTableSkeleton />}>
               <CurseTableServer />
            </Suspense>
         </div>
      </section>
   )
}
