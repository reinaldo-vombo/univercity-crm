import Avatar from "@/components/shared/avatar";
import Breadcrumb from "@/components/shared/breadcrumb";
import Modal from "@/components/shared/Modal";
import Ping from "@/components/shared/ping";
import SheetModal from "@/components/shared/sheet-modal";
import { TabsNav } from "@/components/shared/toggle-tabs";
import MessageSender from "@/components/container/messages/message-sender";
import { ROUTES } from "@/constants/routes"
import { formatCurrency, showYearLevel } from "@/lib/helper";
import { getSigleMockStudents, getStudentCourseSchedules, studentCoursesService } from "@/constants/data/student";
import { MessageCircle, Pen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import DocumentsPreview from "./documents-preview";
import { Suspense } from "react";
import MarkSheetWrapper from "../../wrapper/markSheet-wrapper";
import SchedulePreview from "./shedule-preview";
import { TSeachParams } from "@/types/global";
import DataTabelCards from "@/components/skeleton/data-tabel-cards";

const PagePreview = async ({ searchParams }: TSeachParams) => {
   const [student, info, schedule, { year, semester }] = await Promise.all([
      getSigleMockStudents(),
      studentCoursesService(),
      getStudentCourseSchedules(),
      searchParams
   ])

   const currentSemesters: any = semester;
   const currentYear: any = year;
   const tabs = [
      {
         id: '1',
         lable: 'Documentos',
         value: 'documentos',
         tabContent: <DocumentsPreview />,
         description: 'Documentos do aluno'
      },
      {
         id: '3',
         lable: 'Hórarios academicos',
         value: 'Hórarios',
         tabContent: <SchedulePreview data={schedule} />,
         description: 'Hórarios Academicos'
      },
      {
         id: '4',
         lable: 'Notas Academicas',
         value: 'notas',
         tabContent: <Suspense fallback={<DataTabelCards />} key={`${currentYear}-${currentSemesters}`}>
            <MarkSheetWrapper studentId={student.studentId} semester={currentSemesters || '1º Semestre'} year={currentYear} />
         </Suspense>,
         description: 'Historico de notas semestrais'
      },
      {
         id: '5',
         lable: 'Pedidos',
         value: 'pedidos',
         tabContent: <p>Pedidos</p>,
         description: 'Pedidos'
      },
      {
         id: '6',
         lable: 'Permissões',
         value: 'pedidos',
         tabContent: <p>Pedidos</p>,
         description: 'Gerencie as permissões do aluno'
      },
   ]
   const fullName = `${student.firstName} ${student.middleName} ${student.lastName}`
   const course = info.courses[0]
   return (
      <div>
         <Breadcrumb
            root={ROUTES.DASHBOARD}
            pageUrl={`${ROUTES.DASHBOARD}/admin/student/${student.studentId}`}
            pageName="Estudante" name={`${student.firstName} ${student.middleName} ${student.lastName}`}
         />
         <div className="grid grid-cols-12 gap-2 mt-12 mb-10">
            <div className="col-span-3">
               <div className="relative">
                  <div className="bg-purple-700 rounded-lg h-40" />
                  <Avatar name={fullName} photo={student.profileImage || ''} className="border-white border-4 size-40 absolute left-4 -bottom-10" />
               </div>
               <div className="mt-11">
                  <h2 className="text-3xl font-bold mb-7">{fullName}</h2>
                  <ul className="space-y-4">
                     <li className={`${student.isActive ? 'text-green-500' : 'text-amber-500'} flex items-center gap-2`}>
                        <b>{student.isActive ? 'Activo' : 'Inactivo'}</b>
                        <Ping />
                     </li>
                     <li>#: <b>{student.studentId}</b></li>
                     <li>Genero: <b>{student.gender}</b></li>
                     <li>Tipo de aluno: <b>{student.studentType}</b></li>
                     <li>Ano de graduação: <b>{showYearLevel(student.yearLevel)}</b></li>
                     <li>Trabalhador: <b>{student.isActive ? 'Sim' : 'Não'}</b></li>
                     <li>Email: <b>{student.email}</b></li>
                     <li>Telefone: <b>(+244) {student.contactNo}</b></li>
                  </ul>
               </div>
               <div className="flex gap-3 my-4">
                  <Modal
                     trigger={<div className="flex gap-2 items-center bg-primary p-2 rounded-md text-white"><MessageCircle /> Enviar menssagem</div>}
                     title="Caixa de menssagem"
                     description="Selecione o canal de menssagem"><MessageSender /></Modal>

                  <SheetModal
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     className="sm:max-w-lg"
                     title="Atualização do estudante"
                     description='Formulario de atualização do estudante'>
                     {/* <UpdatedStudentFrom academicSemester={academicSemester} courses={courses} defaultValue={student} /> */}
                     hello
                  </SheetModal>
               </div>
               <div className="border rounded-2xl bg-secondary  p-4 mb-4">
                  <h2 className="text-3xl font-bold mb-7">Informações do curso</h2>
                  <ul className="space-y-3">
                     <li><span className="text-neutral-500">Curso:</span> {course.course.title}</li>
                     <li><span className="text-neutral-500">Departamento:</span> {info.student.department}</li>
                     <li><span className="text-neutral-500">Unidade Académica:</span> {info.student.faculty}</li>
                     <li><span className="text-neutral-500">Turma:</span> {course.section.title}</li>
                     <li><span className="text-neutral-500">Ano de duração:</span> 4</li>
                     <li><span className="text-neutral-500">Periodo:</span> {course.section.shift}</li>
                     <li><span className="text-neutral-500">Data de cadastro:</span> 10/08/2025</li>
                     <li><span className="text-neutral-500">Data de limite de pagamento:</span> dia 10</li>
                  </ul>
                  <div className="grid grid-cols-12 gap-5 mt-4">
                     <div className="col-span-6 flex gap-3">
                        <div>
                           <p>Pagameto mensal</p>
                           <h3 className="text-xl font-semibold">{formatCurrency(course.section.price.amount)}</h3>
                        </div>
                        <Separator orientation="vertical" />
                     </div>
                     <div className="col-span-6 flex gap-3">
                        <div>
                           <p>+ Amortização</p>
                           <h3 className="text-xl font-semibold">{formatCurrency(4000)}</h3>
                        </div>
                        <Separator orientation="vertical" />
                     </div>
                  </div>
                  <Separator orientation="vertical" />
                  <h2 className="text-2xl font-bold mt-2">Total {formatCurrency(45000)}</h2>
               </div>
            </div>
            <div className="col-span-9">
               <TabsNav defaultValue={tabs[0].value} tabList={tabs} />
            </div>
         </div>
      </div>
   )
}

export default PagePreview;
