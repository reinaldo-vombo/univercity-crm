"use client";

import { DataTable } from '@/components/shared/tabeles/data-table';
import { AnswerSheetListItem, TCourse, TSemester, TStudent } from '@/types/global';
import { ExameStatementSheetColumns } from './columns';

type TProps = {
   answers: AnswerSheetListItem[]
   student: TStudent[]
   semester: TSemester[]
   course: TCourse[]
}

export function AnswerSheetTable({ answers, course, semester, student }: TProps) {
   const columns = ExameStatementSheetColumns({ students: student, course, semester })
   return <DataTable
      side="bottom"
      className="sm:max-w-full"
      modalTitle="Criar Enuciado"
      columns={columns}
      data={answers}
      filterColumn="person"
   />;
}
