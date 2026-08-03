import Avatar from "@/components/shared/avatar";
import Breadcrumb from "@/components/shared/breadcrumb";
import SheetModal from "@/components/shared/sheet-modal";
import { ROUTES } from "@/constants/routes"
import { formatCurrency, showYearLevel } from "@/lib/helper";
import { getSigleMockStudents, studentCoursesService } from "@/constants/data/student";
import { CheckCircle2, GraduationCap, Mail, Pen, Phone, TrendingUp, XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// {
//    params: Promise<{ id: string }>
// }
const PagePreview = async ({ }: {
   params: Promise<{ id: string }>
}) => {

   const [student, info] = await Promise.all([
      getSigleMockStudents(),
      studentCoursesService(),
   ]);

   const fullName = `${student.firstName} ${student.middleName} ${student.lastName}`;
   const course = info.courses[0];
   const monthlyPayment = course.section.price.amount;
   const amortization = 4000;
   const total = monthlyPayment + amortization;

   const courseStatusConfig: Record<string, { label: string; className: string }> = {
      ONGOING: { label: 'Em Curso', className: 'bg-blue-500/10 text-blue-500 border border-blue-500/20' },
      APPROVED: { label: 'Aprovado', className: 'bg-green-500/10 text-green-500 border border-green-500/20' },
      FAILED: { label: 'Reprovado', className: 'bg-red-500/10 text-red-500 border border-red-500/20' },
      RESIT: { label: 'Recurso', className: 'bg-orange-500/10 text-orange-500 border border-orange-500/20' },
      EXEMPT: { label: 'Dispensado', className: 'bg-purple-500/10 text-purple-500 border border-purple-500/20' },
   };

   return (
      <div>
         <Breadcrumb
            root={ROUTES.DASHBOARD}
            pageUrl={`${ROUTES.DASHBOARD}/admin/student/${student.studentId}`}
            pageName="Estudante"
            name={fullName}
         />

         <div className="grid grid-cols-12 gap-5 mt-12 mb-10">

            {/* Coluna esquerda: perfil */}
            <div className="col-span-12 lg:col-span-3 space-y-4">

               <div className="relative">
                  <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-t-2xl h-32" />
                  <div className="border rounded-b-2xl px-4 pb-5 pt-14">
                     <Avatar
                        name={fullName}
                        photo={student.profileImage || ''}
                        className="border-white border-4 size-28 absolute left-4 top-16"
                     />

                     <div className="flex items-start justify-between">
                        <div>
                           <h2 className="text-xl font-bold leading-tight">{fullName}</h2>
                           <p className="text-xs text-neutral-500 mt-1">#{student.studentId}</p>
                        </div>
                        <SheetModal
                           trigger={
                              <button className="flex items-center justify-center size-8 rounded-full border hover:bg-neutral-800 transition-colors shrink-0">
                                 <Pen className="size-3.5 text-green-500" />
                              </button>
                           }
                           side="right"
                           className="sm:max-w-lg"
                           title="Atualização do estudante"
                           description="Formulário de atualização do estudante"
                        >
                           {/* <UpdatedStudentFrom academicSemester={academicSemester} courses={courses} defaultValue={student} /> */}
                           hello
                        </SheetModal>
                     </div>

                     <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mt-3 ${student.isActive
                              ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                              : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                           }`}
                     >
                        <span className={`size-1.5 rounded-full ${student.isActive ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
                        {student.isActive ? 'Ativo' : 'Inativo'}
                     </span>
                  </div>
               </div>

               {/* Informações pessoais */}
               <div className="border rounded-2xl p-5 space-y-3.5">
                  <p className="text-xs uppercase tracking-wide text-neutral-500 font-medium mb-1">Informações pessoais</p>
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-neutral-500">Género</span>
                     <b>{student.gender === 'M' ? 'Masculino' : 'Feminino'}</b>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-neutral-500">Tipo de aluno</span>
                     <b>{student.studentType}</b>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-neutral-500">Ano de graduação</span>
                     <b>{showYearLevel(student.yearLevel)}</b>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-neutral-500">Trabalhador</span>
                     <b>{student.isWorker ? 'Sim' : 'Não'}</b>
                  </div>
                  <Separator />
                  <div className="space-y-1">
                     <p className="text-xs text-neutral-500 flex items-center gap-1.5"><Mail className="size-3" /> Email</p>
                     <p className="text-sm font-medium truncate">{student.email}</p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-xs text-neutral-500 flex items-center gap-1.5"><Phone className="size-3" /> Telefone</p>
                     <p className="text-sm font-medium">(+244) {student.contactNo}</p>
                  </div>
               </div>

               {/* Curso e financeiro */}
               <div className="border rounded-2xl bg-card p-5 space-y-4">
                  <div className="flex items-center gap-2">
                     <GraduationCap className="size-4 text-neutral-500" />
                     <p className="text-xs uppercase tracking-wide text-neutral-500 font-medium">Informações do curso</p>
                  </div>

                  <ul className="space-y-2.5 text-sm">
                     <li className="flex items-center justify-between gap-2">
                        <span className="text-neutral-500 shrink-0">Curso</span>
                        <b className="text-right truncate">{course.course.title}</b>
                     </li>
                     <li className="flex items-center justify-between gap-2">
                        <span className="text-neutral-500 shrink-0">Unidade Académica</span>
                        <b className="text-right truncate">{info.student.faculty}</b>
                     </li>
                     <li className="flex items-center justify-between gap-2">
                        <span className="text-neutral-500 shrink-0">Departamento</span>
                        <b className="text-right truncate">{info.student.department}</b>
                     </li>
                     <li className="flex items-center justify-between">
                        <span className="text-neutral-500">Turma</span>
                        <b>{course.section.title}</b>
                     </li>
                     <li className="flex items-center justify-between">
                        <span className="text-neutral-500">Período</span>
                        <b>{course.section.shift}</b>
                     </li>
                     <li className="flex items-center justify-between">
                        <span className="text-neutral-500">Semestre</span>
                        <b>{info.semester.title} · {info.semester.year}</b>
                     </li>
                  </ul>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <p className="text-xs text-neutral-500">Pagamento mensal</p>
                        <h3 className="text-lg font-semibold mt-0.5">{formatCurrency(monthlyPayment)}</h3>
                     </div>
                     <div>
                        <p className="text-xs text-neutral-500">Amortização</p>
                        <h3 className="text-lg font-semibold mt-0.5">{formatCurrency(amortization)}</h3>
                     </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                     <b className="text-sm">Total</b>
                     <b className="text-xl">{formatCurrency(total)}</b>
                  </div>
               </div>
            </div>

            {/* Coluna direita: académico */}
            <div className="col-span-12 lg:col-span-9 space-y-5">

               {/* Resumo académico */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="rounded-xl border p-5 space-y-1">
                     <p className="text-sm text-neutral-500">Disciplinas</p>
                     <p className="text-2xl font-bold">{info.summary.totalCourses}</p>
                  </div>
                  <div className="rounded-xl border p-5 space-y-1">
                     <div className="flex items-center justify-between">
                        <p className="text-sm text-neutral-500">Aprovadas</p>
                        <CheckCircle2 className="size-4 text-green-500" />
                     </div>
                     <p className="text-2xl font-bold text-green-500">{info.summary.approved}</p>
                  </div>
                  <div className="rounded-xl border p-5 space-y-1">
                     <div className="flex items-center justify-between">
                        <p className="text-sm text-neutral-500">Reprovadas</p>
                        <XCircle className="size-4 text-red-500" />
                     </div>
                     <p className="text-2xl font-bold text-red-500">{info.summary.failed}</p>
                  </div>
                  <div className="rounded-xl border p-5 space-y-1">
                     <div className="flex items-center justify-between">
                        <p className="text-sm text-neutral-500">Média do Semestre</p>
                        <TrendingUp className="size-4 text-blue-500" />
                     </div>
                     <p className="text-2xl font-bold">{info.summary.semesterAverage.toFixed(1)}</p>
                  </div>
               </div>

               {/* Lista de disciplinas */}
               <div className="rounded-xl border overflow-hidden">
                  <div className="flex items-center justify-between p-5 border-b">
                     <div>
                        <b>Disciplinas</b>
                        <p className="text-xs text-neutral-500 mt-0.5">{info.semester.title} · {info.semester.year}</p>
                     </div>
                  </div>

                  <div className="divide-y">
                     {info.courses.map((c, idx) => (
                        <div key={idx} className="p-5 space-y-4">
                           <div className="flex items-center justify-between gap-3">
                              <div>
                                 <b className="text-sm">{c.course.title}</b>
                                 <p className="text-xs text-neutral-500 mt-0.5">
                                    Turma {c.section.title} · {c.section.shift}
                                 </p>
                              </div>
                              <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${courseStatusConfig[c.status]?.className ?? 'bg-neutral-500/10 text-neutral-400 border border-neutral-500/20'}`}>
                                 {courseStatusConfig[c.status]?.label ?? c.status}
                              </span>
                           </div>

                           {c.disciplines?.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                 {c.disciplines.map((d, i) => (
                                    <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-neutral-900 border text-neutral-400">
                                       {d.name} · nota mín. {d.suspendGrade}
                                    </span>
                                 ))}
                              </div>
                           )}

                           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              <div className="rounded-lg bg-neutral-950/40 border p-3">
                                 <p className="text-xs text-neutral-500">1º Teste</p>
                                 <b className="text-sm">{c.marks.firstTest.toFixed(1)}</b>
                              </div>
                              <div className="rounded-lg bg-neutral-950/40 border p-3">
                                 <p className="text-xs text-neutral-500">2º Teste</p>
                                 <b className="text-sm">{c.marks.secondTest.toFixed(1)}</b>
                              </div>
                              <div className="rounded-lg bg-neutral-950/40 border p-3">
                                 <p className="text-xs text-neutral-500">Média AC</p>
                                 <b className="text-sm">{c.marks.acAverage.toFixed(1)}</b>
                              </div>
                              <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-3">
                                 <p className="text-xs text-neutral-500">Nota Final</p>
                                 <b className="text-sm text-blue-500">{c.marks.totalMarks.toFixed(1)}</b>
                              </div>
                           </div>

                           {c.markStatus && (
                              <p className="text-xs text-neutral-500">
                                 Estado da nota: <span className="text-neutral-300 font-medium">{c.markStatus}</span>
                              </p>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PagePreview;
