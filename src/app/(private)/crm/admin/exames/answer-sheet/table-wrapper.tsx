
import { getAllExameStatementsSheet } from '@/services/data/statements';
import { AnswerSheetTable } from './client-table';
import { getAllCurses } from '@/services/data/couses';
import { getAllSemester } from '@/services/data/academic';
import { getAllStudent } from '@/services/data/student';

export async function ServerWrapper() {
   const [answers, semester, curses, students] = await Promise.all([
      getAllExameStatementsSheet(),
      getAllSemester(),
      getAllCurses(),
      getAllStudent(),
   ])

   return <AnswerSheetTable
      course={curses}
      answers={answers}
      semester={semester}
      student={students}
   />
}


