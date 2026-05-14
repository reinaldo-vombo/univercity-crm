
import { TOfferedCourseSection } from '@/types/global';
import { GraduationCap } from 'lucide-react';


import { OfferedCourseSectionCard } from './offered-course-section-card';
type TProps = {
   data: TOfferedCourseSection
}

const OffereCourseSectionDetais = ({ data }: TProps) => {

   return (
      <div className="p-6">
         <div className="flex items-center gap-2 mb-6">
            <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center">
               <GraduationCap className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
               <h2 className="text-xl font-bold text-slate-800">Secções Oferecidas</h2>
               <p className="text-sm text-slate-500"> secção disponíveis</p>
            </div>
         </div>

         <div>
            <OfferedCourseSectionCard section={data} />
         </div>
      </div>
   )
}

export default OffereCourseSectionDetais;
