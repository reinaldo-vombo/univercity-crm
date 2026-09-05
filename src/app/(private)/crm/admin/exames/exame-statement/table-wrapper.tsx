
import { getAllExameStatements } from '@/services/data/statements';
import { ExameStatementTable } from './client-table';
import { getAllDepartments } from '@/services/data/department';
import { getAllCurses } from '@/services/data/couses';
import { getAllDiscipline } from '@/services/data/disciplie';
import { getAllSections } from '@/services/data/offered-course';

export async function ServerWrapper() {
   const [statements, departments, curses, disciplines, section] = await Promise.all([
      getAllExameStatements(),
      getAllDepartments(),
      getAllCurses(),
      getAllDiscipline(),
      getAllSections()
   ])

   return <ExameStatementTable
      statements={statements}
      course={curses}
      section={section}
      departments={departments}
      disciplines={disciplines}
   />
}


