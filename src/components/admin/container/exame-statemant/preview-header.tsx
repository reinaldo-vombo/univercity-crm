import { clientEnv } from "@/config/env/client";
import { TCourse, TDepartemant, TDiscipline } from "@/types/global";
import Image from "next/image";
type Props = {
   departments: TDepartemant[]
   course: TCourse[]
   disciplines: TDiscipline[]
}

export function PreviewHeader({ data, info }: { data: any, info: Props }) {

   const course = info.course.find((d) => d.id === data.courseId)
   const discipline = info.disciplines.find((d) => d.id === data.disciplineId)
   const department = info.departments.find((d) => d.id === data.academicDepartmentId)

   return (
      <div className="text-center border-b-2 text-black border-slate-800 pb-4 mb-6">
         <div className="flex justify-center">
            <Image
               src='/logo.svg'
               className="size-[40px]"
               width={40}
               height={40}
               style={{ width: 50, height: 50 }}
               alt={`Logotipo da ${clientEnv.NEXT_PUBLIC_UNIVERCITY_NAME}`}
            />
         </div>
         <p className="text-[13px] font-bold uppercase tracking-wide text-black">
            <span className="italic normal-case">
               {clientEnv.NEXT_PUBLIC_UNIVERCITY_NAME}
            </span>
         </p>
         <p className="text-[11px] mt-0.5">
            {data.context === "ADMISSION" ? "Exame de Admissão" : "Exame de Curso"}
            {data.type ? ` · ${data.type}` : ""}
         </p>
         <p className="text-[11px] mt-0.5">
            {department?.title || 'Departamento Ciência E Tecnologia'}
         </p>
         <div className="text-[11px] mt-4 text-left">
            <span>NOME DO ESTUDANTE:______________________________________________________________________________________</span>
         </div>
         <div className="flex justify-between text-[11px] mt-4 text-left">
            <span>DISCIPLINA: {discipline?.name || 'Sistemas Operativos'} </span>
            <span>PROFESSOR: Reinaldo Vombo</span>
         </div>
         <div className="flex justify-between text-[11px] mt-4 text-left">
            <span className="uppercase">CURSO: {course?.title || 'Ciência da Computação'} </span>
            <span className="uppercase">turma: lcc2m</span>
            <span className="uppercase">variante:{data.variant || 'A'}</span>
         </div>
      </div>
   );
}