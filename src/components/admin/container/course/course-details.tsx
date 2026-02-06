import { TCourse } from "@/types/global"
import { BookA, Building, DollarSign, Hash, Moon, Sun, SunDim, } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { formatCurrency, showYearLevel } from "@/lib/helper";
import { Separator } from "@/components/ui/separator";

type TProps = {
   data: TCourse
}

const icons = [<Sun className="text-yellow-200" key={1} />, <SunDim className="text-amber-500" key={1} />, <Moon className="text-indigo-500" key={1} />]
const CourseDetails = ({ data }: TProps) => {

   const { title, price, academicDepartment, courseDisciplines, durationInYears, CourseShift, faculties, } = data;
   return (
      <div>
         <div className="border rounded-lg p-4 mb-6 flex items-center justify-between">
            <div>
               <Image
                  src='/figure-1.png'
                  className="rounded-full"
                  width={300}
                  height={300}
                  alt={title} />
            </div>
            <div>
               <h2 className="text-2xl font-semibold">{title}</h2>
               <ul className="mb-3">
                  <li>
                     <b className="text-neutral-500">Mensalidade:</b>
                     <div className='rounded-md mt-3 border p-2 flex gap-2 items-center'>
                        <DollarSign className='text-green-500 size-4' /><b>{formatCurrency(price?.amount || 0)}</b>
                     </div>
                  </li>
               </ul>
               <ul className="space-y-4">
                  <b className="text-neutral-500">Turnos</b>
                  {CourseShift.length > 0 ? CourseShift.map((sesson, i) => (
                     <li key={sesson.shift.id} className="flex items-center gap-2">
                        {icons[i]}
                        {sesson.shift.name}
                     </li>
                  )) : (<p>Turnos Não Atribuidos</p>)}
               </ul>
            </div>
         </div>
         <ul className="space-y-4 mb-4">
            <li>
               <span className='text-neutral-500 size-4'>Anos de graduação:</span>
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <Hash className='text-neutral-500 size-4' /><b>{durationInYears} Anos</b>
               </div>
            </li>
            <li>
               <span className='text-neutral-500 size-4'>Departamento:</span>
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <Building className='text-neutral-500 size-4' /><b>{academicDepartment.title}</b>
               </div>
            </li>
            <li>
               <span className="text-neutral-500">Professores:</span>
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <ul>
                     <div className='flex -space-x-2'>
                        {faculties.map((avatar) => (
                           <Tooltip key={avatar.faculty.id}>
                              <TooltipTrigger asChild>
                                 <Avatar className='ring-background ring-2 transition-all duration-300 ease-in-out hover:z-1 hover:-translate-y-1 hover:shadow-md'>
                                    <AvatarImage src={avatar.faculty.profileImage || '/avatar-1.jpg'} alt={avatar.faculty.firstName} />
                                    <AvatarFallback className='text-xs'>CN</AvatarFallback>
                                 </Avatar>
                              </TooltipTrigger>
                              <TooltipContent>{avatar.faculty.firstName}</TooltipContent>
                           </Tooltip>
                        ))}
                     </div>
                  </ul>
               </div>
            </li>
         </ul>
         <Separator />
         <div className="space-y-4 mt-4">
            <h2 className="text-2xl font-semibold text-neutral-500">Disciplinas Academicas</h2>
            <ul className="space-y-4">
               {courseDisciplines.length > 0 ? courseDisciplines.map((academic) => (
                  <li key={academic.id} className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <BookA className="text-neutral-500" />
                        <b>{academic.discipline.name}</b>
                     </div>
                     <b>{showYearLevel(academic.yearLevel)}</b>
                  </li>
               )) : (<p>Sem Disciplinas Atribuidas</p>)}
            </ul>
         </div>
      </div>
   )
}

export default CourseDetails;
