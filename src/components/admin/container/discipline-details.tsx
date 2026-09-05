
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { showYearLevel } from '@/lib/helper'
import { TDiscipline } from '@/types/global'
import { BookDown, BookX, GraduationCap, Hash, Users } from 'lucide-react'
import Image from 'next/image'

type TProps = {
   data: TDiscipline
}

const DisciplineDetails = ({ data }: TProps) => {
   const { name, suspendGrade, courses, faculty } = data;

   const hasSection = Boolean(faculty?.section)

   return (
      <div className="space-y-6">
         {/* Cabeçalho: docente / disciplina */}
         <Card>
            <CardContent className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:items-start">
               <div className="flex shrink-0 flex-col items-center gap-3">
                  <Image
                     src="/figure-1.png"
                     className="size-24 rounded-full border object-cover"
                     width={96}
                     height={96}
                     alt='Book inlustration'
                  />
                  {faculty && (
                     <p className="text-center text-sm font-medium leading-tight">
                        {faculty.firstName} {faculty.lastName}
                     </p>
                  )}
               </div>

               <div className="w-full space-y-4">
                  <h2 className="text-2xl font-semibold">{name}</h2>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                     <div>
                        <p className="mb-1 text-xs text-muted-foreground">
                           Turma
                        </p>
                        {hasSection ? (
                           <div className="flex items-center gap-2 rounded-md border p-2">
                              <Hash className="size-4 text-orange-500" />
                              <b className="text-sm">{faculty?.section}</b>
                           </div>
                        ) : (
                           <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-2 text-red-600 dark:border-red-900 dark:bg-red-950/30">
                              <BookX className="size-4 shrink-0" />
                              <b className="text-sm">
                                 Disciplina ainda não foi atribuída a nenhuma turma
                              </b>
                           </div>
                        )}
                     </div>

                     <div>
                        <p className="mb-1 text-xs text-muted-foreground">
                           Nota de dispensa
                        </p>
                        <div className="flex items-center gap-2 rounded-md border p-2">
                           <BookDown className="size-4 text-fuchsia-500" />
                           <b className="text-sm">
                              {suspendGrade || "Não atribuída"}
                           </b>
                        </div>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Cursos */}
         <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
               <GraduationCap className="size-5 text-muted-foreground" />
               Cursos pertencentes
               {courses.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                     {courses.length}
                  </Badge>
               )}
            </h2>

            {courses.length > 0 ? (
               <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {courses.map((course) => (
                     <Card key={course.id} className="shadow-none">
                        <CardContent className="flex items-start gap-3 p-4">
                           <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                              <Users className="size-4 text-muted-foreground" />
                           </div>
                           <div className="min-w-0">
                              <p className="truncate font-medium">
                                 {course.courseTitle}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 {showYearLevel(course.yearLevel)}
                              </p>
                              {/* <p className="text-sm text-muted-foreground">
                                 {course.semester} - {course.year}
                              </p> */}
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            ) : (
               <p className="text-sm text-muted-foreground">
                  Essa disciplina ainda não foi atribuída a nenhum curso.
               </p>
            )}
         </div>
      </div>
   )
}

export default DisciplineDetails;
