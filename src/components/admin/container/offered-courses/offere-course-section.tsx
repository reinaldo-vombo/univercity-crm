import { Separator } from '@/components/ui/separator';
import { TOfferedCourseSection } from '@/types/global';
import { BookA, Space, Users } from 'lucide-react';
import Image from 'next/image';
type TProps = {
   data: TOfferedCourseSection
}

const OffereCourseSectionDetais = ({ data }: TProps) => {
   const { maxCapacity, currentlyEnrolledStudent, offeredCourse, title, } = data;
   const course = offeredCourse.OfferedCourseDiscipline
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
                     <b className="text-neutral-500">Estudates matriculados:</b>
                     <div className='rounded-md mt-3 border p-2 flex gap-2 items-center'>
                        <Users className='text-neutral-500 size-4' /><b>{currentlyEnrolledStudent || 0}</b>
                     </div>
                  </li>
               </ul>
               <ul className="space-y-4">
                  <b className="text-neutral-500">Vagas disponiveis</b>
                  <div className='rounded-md mt-3 border p-2 flex gap-2 items-center'>
                     <Space className='text-neutral-500 size-4' /><b>{maxCapacity}</b>
                  </div>
               </ul>
            </div>
         </div>
         <Separator />
         <div className="space-y-4 mt-4">
            <h2 className="text-2xl font-semibold text-neutral-500">Disciplinas Academicas</h2>
            <ul className="space-y-4">
               {course.length > 0 ? course.map((academic) => (
                  <li key={academic.discipline.id} className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <BookA className="text-neutral-500" />
                        <b>{academic.discipline.name}</b>
                     </div>
                  </li>
               )) : (<p>Sem Disciplinas</p>)}
            </ul>
         </div>
      </div>
   )
}

export default OffereCourseSectionDetais;
