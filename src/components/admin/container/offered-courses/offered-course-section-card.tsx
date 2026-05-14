import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/helper";
import { TOfferedCourseSection } from "@/types/global";
import { BookOpen, Users, Clock, Layers } from "lucide-react";
export function OfferedCourseSectionCard({ section }: { section: TOfferedCourseSection }) {
   const enrollmentPercentage = Math.round(
      (section.currentlyEnrolledStudent / section.maxCapacity) * 100
   );

   const getEnrollmentColor = () => {
      if (enrollmentPercentage >= 90) return "bg-red-500";
      if (enrollmentPercentage >= 70) return "bg-amber-500";
      return "bg-emerald-500";
   };

   const getEnrollmentBadge = () => {
      if (enrollmentPercentage >= 90)
         return <Badge variant="destructive">Quase cheio</Badge>;
      if (enrollmentPercentage >= 70)
         return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Em preenchimento</Badge>;
      return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Disponível</Badge>;
   };

   const shiftLabel: Record<number, string> = {
      1: "Manhã",
      2: "Tarde",
      3: "Noite",
   };

   return (
      <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
         {/* Top accent bar */}
         <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

         <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
               <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                     <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                        {section.offeredCourse.semesterRegistration.academicSemester.title}
                     </span>
                     {getEnrollmentBadge()}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 leading-snug truncate">
                     {section.offeredCourse.course.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">{section.title}</p>
               </div>

               {/* Price */}
               <div className="flex-shrink-0 text-right">
                  {section.price ? (
                     <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl px-3 py-2 text-center">
                        <p className="text-xs opacity-80">Preço</p>
                        <p className="text-lg font-bold leading-none">
                           {formatCurrency(section.price.amount)}
                        </p>
                     </div>
                  ) : (
                     <div className="bg-slate-100 text-slate-400 rounded-xl px-3 py-2 text-center">
                        <p className="text-xs">Preço</p>
                        <p className="text-sm font-semibold">N/D</p>
                     </div>
                  )}
               </div>
            </div>

            {/* Disciplines */}
            {section.offeredCourse.OfferedCourseDiscipline.length > 0 && (
               <div className="mb-4">
                  <div className="flex items-center gap-1.5 mb-2">
                     <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                     <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                        Disciplinas
                     </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                     {section.offeredCourse.OfferedCourseDiscipline.map(({ discipline }) => (
                        <span
                           key={discipline.id}
                           className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-medium"
                        >
                           {discipline.name}
                        </span>
                     ))}
                  </div>
               </div>
            )}

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3 mb-4">
               <div className="flex items-center gap-2.5 bg-slate-50 rounded-xl p-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                     <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                     <p className="text-xs text-slate-500">Turno</p>
                     <p className="text-sm font-semibold text-slate-700">
                        {shiftLabel[section.shiftId] ?? `Turno ${section.shiftId}`}
                     </p>
                  </div>
               </div>

               <div className="flex items-center gap-2.5 bg-slate-50 rounded-xl p-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                     <Layers className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                     <p className="text-xs text-slate-500">Capacidade</p>
                     <p className="text-sm font-semibold text-slate-700">
                        {section.currentlyEnrolledStudent}/{section.maxCapacity}
                     </p>
                  </div>
               </div>
            </div>

            {/* Enrollment progress */}
            <div>
               <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                     <Users className="w-3.5 h-3.5 text-slate-400" />
                     <span className="text-xs text-slate-500">Ocupação</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-700">{enrollmentPercentage}%</span>
               </div>
               <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                     className={`h-full rounded-full transition-all duration-500 ${getEnrollmentColor()}`}
                     style={{ width: `${Math.min(enrollmentPercentage, 100)}%` }}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}