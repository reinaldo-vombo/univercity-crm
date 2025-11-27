import { TCourse } from "@/types/global"
import { BookA, Building, DollarSign, Hash, Moon, Sun, SunMoon } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { formatCurrency, showYearLevel } from "@/lib/helper";

type TProps = {
   data: TCourse
}

const CourseDetails = ({ data }: TProps) => {
   console.log(data);

   const { title, code, price, shift, academicDepartment, durationInYears, courseDisciplines, faculties, } = data;
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
               <ul className="space-y-2">
                  <li>Codigo:
                     <div className='rounded-md border p-2 flex gap-2 items-center'>
                        <Hash className='text-orange-500 size-4' /><b>{code}</b>
                     </div>
                  </li>
                  <li>Mensalidade:
                     <div className='rounded-md border p-2 flex gap-2 items-center'>
                        <DollarSign className='text-green-500 size-4' /><b>{formatCurrency(price?.amount || 0)}</b>
                     </div>
                  </li>
                  <li>Turno:
                     <div className='rounded-md border p-2 flex gap-2 items-center'>
                        <div className="flex items-center gap-2">
                           {shift.name === "Manhã" ?
                              <Sun className="text-yellow-300 size-4" />
                              :
                              shift.name === "Tarde" ?
                                 <SunMoon className="text-amber-500" />
                                 : <Moon className="text-blue-500 size-4" />}
                           <b>{shift.name}</b>
                        </div>
                     </div>
                  </li>
               </ul>
            </div>
         </div>
         <ul className="space-y-4">
            <li>Anos de graduação:
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <Hash className='text-indigo-500 size-4' /><b>{durationInYears} Anos</b>
               </div>
            </li>
            <li>Departamento:
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <Building className='text-green-500 size-4' /><b>{academicDepartment.title}</b>
               </div>
            </li>
            <li>Professores:
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
            <li>Desciplinas:
               <div className='rounded-md border space-y-3 p-2'>
                  {courseDisciplines && courseDisciplines.map((item) => (
                     <ul key={item.id} className="flex items-center gap-3">
                        <BookA className="text-indigo-600" />
                        <li className="font-semibold">{item.discipline.name} - {showYearLevel(item.yearLevel)}</li>
                     </ul>
                  ))}
               </div>
            </li>
         </ul>
      </div>
   )
}

export default CourseDetails;
