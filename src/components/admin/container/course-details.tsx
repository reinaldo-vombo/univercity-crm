import { TCourse } from "@/types/global"
import { Building, Hash, LetterText } from "lucide-react";

type TProps = {
   data: TCourse
}

const CourseDetails = ({ data }: TProps) => {
   const { title, code, academicDepartment, durationInYears, } = data;
   return (
      <div>
         <ul className="space-y-4">
            <li>Nome:
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <LetterText className='text-red-500 size-4' /><b>{title}</b>
               </div>
            </li>
            <li>Codigo:
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <Hash className='text-orange-500 size-4' /><b>{code}</b>
               </div>
            </li>
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
            <li>Turno:
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <Building className='text-green-500 size-4' /><b>Manha</b>
               </div>
            </li>
         </ul>
      </div>
   )
}

export default CourseDetails
