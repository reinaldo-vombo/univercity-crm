import { TCourse } from "@/types/global"
import { Building, Hash, Moon, Sun, SunMoon } from "lucide-react";
import Image from "next/image";

type TProps = {
   data: TCourse
}

const CourseDetails = ({ data }: TProps) => {
   const { title, code, academicDepartment, durationInYears } = data;
   return (
      <div>
         <div className="border rounded-lg p-4 mb-6 flex items-center">
            <div>
               <Image
                  src='/figure-1.png'
                  className="rounded-full"
                  width={100}
                  height={100}
                  alt={title} />
            </div>
            <div>
               <h2 className="text-2xl font-semibold">{title}</h2>
               <ul>
                  <li>Codigo:
                     <div className='rounded-md border p-2 flex gap-2 items-center'>
                        <Hash className='text-orange-500 size-4' /><b>{code}</b>
                     </div>
                  </li>
               </ul>
            </div>
         </div>
         <ul className="space-y-4">
            <li>Anos de graduação:
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <Hash className='text-indigo-500 size-4' /><b>{durationInYears}</b>
               </div>
            </li>
            <li>Departamento:
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <Building className='text-green-500 size-4' /><b>{academicDepartment.title}</b>
               </div>
            </li>
            <li>Turnos:
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <Sun className='text-yellow-500 size-4' />
                  <SunMoon className='text-orange-500 size-4' />
                  <Moon className='text-blue-500 size-4' />
               </div>
            </li>
         </ul>
      </div>
   )
}

export default CourseDetails
