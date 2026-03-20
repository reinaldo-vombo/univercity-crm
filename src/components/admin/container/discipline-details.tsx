
import { showYearLevel } from '@/lib/helper'
import { TDiscipline } from '@/types/global'
import { BookDown, BookX, Hash } from 'lucide-react'
import Image from 'next/image'

type TProps = {
   data: TDiscipline
}

const DisciplineDetails = ({ data }: TProps) => {
   const { name, suspendGrade, courses, faculty } = data;

   return (
      <div>
         <div className="border rounded-lg p-4 mb-6 flex items-center justify-between">
            <div>
               {faculty ? (
                  <>
                     <Image
                        src={faculty.profileImage || '/figure-1.png'}
                        className="rounded-full"
                        width={200}
                        height={200}
                        alt={`${faculty.firstName} ${faculty.lastName}`} />
                     <p className='mt-4 text-center text-2xl'>{`${faculty.firstName} ${faculty.lastName}`}</p>
                  </>
               ) : <Image
                  src='/figure-1.png'
                  className="rounded-full"
                  width={200}
                  height={200}
                  alt={name} />}
            </div>
            <div className="space-y-2">
               <h2 className="text-2xl font-semibold">{name}</h2>
               <ul className="space-y-2">
                  <li>Turma:
                     {faculty?.section && faculty?.section ? (
                        <div className='rounded-md border p-2 flex gap-2 items-center'>
                           <Hash className='text-orange-500 size-4' /><b>{faculty?.section}</b>
                        </div>
                     ) : (

                        <div className='rounded-md border p-2 text-red-500 flex gap-2 items-center'>
                           <BookX className='size-4' /><b>Disciplina ainda não foi atribuida a nenhuma turma</b>
                        </div>
                     )}
                  </li>
                  <li>Nota de dispenção:
                     <div className='rounded-md border p-2 flex gap-2 items-center'>
                        <BookDown className='text-fuchsia-500 size-4' /><b>{suspendGrade || 'Não atriudo'}</b>
                     </div>
                  </li>
               </ul>
            </div>
         </div>
         <div className='space-y-4'>
            <h2 className='text-2xl'>Cursos Pertecentes</h2>
            {courses.length > 0 ? courses.map((course) => (
               <ul key={course.id} className='space-y-3'>
                  <li>Nome: <b>{course.courseTitle}</b></li>
                  {/* <li>Semestre: <b>{course.semester} - {course.year}</b></li> */}

                  <li>Ano Curricular: <b>{showYearLevel(course.yearLevel)}</b></li>
               </ul>
            )) : (<p>Essa Disciplina ainda não foi atribuida a nenhum curso</p>)}
         </div>
      </div>
   )
}

export default DisciplineDetails;
