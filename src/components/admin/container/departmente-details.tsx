import Avatar from "@/components/shared/avatar";
import { TDepartemant, } from "@/types/global"

type TProps = {
   data: TDepartemant
}
const DepartmenteDetails = ({ data }: TProps) => {
   const { academicFaculty, title, departmentHead, _count } = data
   const cursesCount = _count.courses
   const facultyCount = _count.faculties
   const studentCount = _count.students

   return (
      <div className="mt-6 space-y-7">
         <div className="rounded-lg bg-primary-foreground border p-4 flex flex-col gap-4 items-center justify-between">
            {departmentHead ? (
               <>
                  <Avatar
                     name={departmentHead?.name}
                     className="size-52"
                     photo={departmentHead?.avatar || undefined} />
                  <h2 className="text-2xl">{departmentHead.name}</h2>
                  <span>Director(a) Geral Do Curso</span>
               </>
            ) : <p>Nenhum Director Selecionado</p>}
         </div>
         <ul className="space-y-4">
            <li>Titulo: <b>{title}</b></li>
            <li>Unidade Acadêmica: <b>{academicFaculty.title}</b></li>
            <li>Número de Cursos: <b>{cursesCount || 0}</b></li>
            <li>Número de professores: <b>{facultyCount || 0}</b></li>
            <li>Número de Alunos: <b>{studentCount || 0}</b></li>
            <li>Orçamento Total: <b>200.000$</b></li>
         </ul>
      </div>
   )
}

export default DepartmenteDetails
