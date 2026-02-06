import { CloseBage, CompleteBage, ProgressBage } from "@/components/shared/bages"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/helper"
import { TOfferedCourse } from "@/types/global"
import { BookA, Building, Album, BadgeAlert, CalendarCheck, CalendarOff, BookKeyIcon } from "lucide-react"

type TProps = {
   data: TOfferedCourse
}
const OfferedCourseDtails = ({ data }: TProps) => {
   // console.log(data.course.title);

   const { OfferedCourseDiscipline, academicDepartment, course, semesterRegistration } = data;
   const semester = semesterRegistration.academicSemester;
   const registration = semesterRegistration;
   return (
      <div className="space-y-6">
         <h2 className="text-2xl font-semibold">Cadeiras Semestrais</h2>
         <div className="space-y-5">
            <ul className="space-y-6">
               <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-500">
                     <Building />
                     <span>Departamento</span>
                  </div>
                  <b>{academicDepartment.title}</b>
               </li>
               <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-500">
                     <BookA />
                     <span>Curso</span>
                  </div>
                  <b>{course.title}</b>
               </li>
               <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-500">
                     <Album />
                     <span>Semestre</span>
                  </div>
                  <b>{semester.title} - {semester.year}</b>
               </li>
            </ul>
            <Separator />
            <h2 className="text-2xl font-semibold">Registro Semestral</h2>
            <ul className="space-y-6">
               <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-500">
                     <BadgeAlert />
                     <span>Estado</span>
                  </div>
                  {registration.status === 'UPCOMING'
                     ? <ProgressBage title="Brevemente" />
                     : registration.status === 'ONGOING'
                        ? <CompleteBage title="Decorrendo" />
                        : <CloseBage title="Ecerrado" />}
               </li>
               <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-500">
                     <CalendarCheck />
                     <span>Inicio dos registro</span>
                  </div>
                  <b>{formatDate(registration.startDate)}</b>
               </li>
               <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-500">
                     <CalendarOff />
                     <span>Encerramento dos registro</span>
                  </div>
                  <b>{formatDate(registration.endDate)}</b>
               </li>
            </ul>
            <Separator />
            <h2 className="text-2xl font-semibold">Desciplinas</h2>
            <ul className="space-y-5">
               {OfferedCourseDiscipline.length > 0 ? OfferedCourseDiscipline.map((course) => (
                  <li key={course.id} className="flex items-center gap-2">
                     <BookKeyIcon className="text-neutral-500" />
                     <b>{course.discipline.name}</b>
                  </li>
               )) : <p>Sem Desciplinas</p>}
            </ul>
         </div>
      </div>
   )
}

export default OfferedCourseDtails
