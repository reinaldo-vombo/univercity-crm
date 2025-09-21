import InvoiceTable from "@/components/admin/container/student/invoice-table";
import MessageSender from "@/components/admin/container/student/message-sender";
// import UpdatedStudentFrom from "@/components/forms/admin/update/updated-student";
import Avatar from "@/components/shared/avatar";
import Breadcrumb from "@/components/shared/breadcrumb";
import Modal from "@/components/shared/Modal";
import SheetModal from "@/components/shared/sheet-modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants/mock-data";
import { formatCurrency } from "@/lib/helper";
import { ArrowLeft, Mail, MessageCircle, Pen } from "lucide-react";

const student = {
   id: '123456789',
   studentId: '20210987',
   email: 'reiginalde.bg@gmail.com',
   curse: 'Eletronica',
   isActive: true,
   contactNo: 923456789,
   firstName: 'Reginalde',
   lastName: 'Baggle',
}
export default function SigleStudentPage() {
   if (!student) return 'not found student'
   return (
      <section className="col-span-12">
         <div className="flex gap-3 mb-12">
            <Button variant={'link'}><ArrowLeft /></Button>
            <h2 className="text-3xl font-bold">Detalhes do Estudante</h2>
         </div>
         <Breadcrumb
            root={ROUTES.DASHBOARD}
            pageUrl={`${ROUTES.DASHBOARD}/admin/student/${student.studentId}`}
            pageName="Estudantes" name={student.firstName}
         />
         <div className="grid grid-cols-12 gap-2 mt-12">
            <div className="col-span-4">
               <div className="relative">
                  <div className="bg-purple-700 rounded-lg h-40" />
                  <Avatar name="Reginalde Baggle" className="border-white border-4 size-40 absolute left-4 -bottom-10" />
               </div>
               <div className="mt-11">
                  <h2 className="text-3xl font-bold mb-7">Reginalde Baggle</h2>
                  <ul className="space-y-4">
                     <li className={`${student.isActive ? 'text-green-500' : 'text-amber-500'}`}><b>{student.isActive ? 'Activo' : 'Inactivo'}</b></li>
                     <li>#: <b>{student.studentId}</b></li>
                     <li>Ano de graduação: <b>3º</b></li>
                     <li>Trabalhador: <b>Não</b></li>
                     <li>Semestre: <b>1º</b></li>
                     <li>Email: <b>{student.email}</b></li>
                     <li>Telefone: <b>(+244) {student.contactNo}</b></li>
                  </ul>
               </div>
               <div className="flex gap-3 my-4">
                  <Modal
                     trigger={<div className="flex gap-2 items-center bg-primary p-2 rounded-md text-white"><MessageCircle /> Enviar menssagem</div>}
                     title="Caixa de menssagem"
                     description="Selecione o canal de menssagem"><MessageSender /></Modal>
                  <Modal
                     trigger={<div className="flex gap-2 items-center bg-primary p-2 rounded-md text-white"><Mail /> Enviar email</div>}
                     title="Caixa de email"
                     description="Selecione o canal de menssagem">Email</Modal>
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
               <div className="border rounded-2xl bg-primary text-primary-foreground p-4">
                  <h2 className="text-3xl font-bold mb-7">Curso & Status de Pagamento</h2>
                  <ul className="space-y-3">
                     <li>Curso</li>
                     <li>Número do curso: LCC</li>
                     <li>Ano de duração: 4</li>
                     <li>Periodo: Mãnha</li>
                     <li>Data de cadastro: 10/08/2025</li>
                     <li>Data de limite de pagamento: 10</li>
                  </ul>
                  <div className="grid grid-cols-7 mt-4">
                     <div className="col-span-2 flex gap-3">
                        <div>
                           <p>Pagameto mensal</p>
                           <h3 className="text-xl font-semibold">{formatCurrency(40000)}</h3>
                        </div>
                        <Separator orientation="vertical" />
                     </div>
                     <div className="col-span-2 flex gap-3">
                        <div>
                           <p>+ Amortização</p>
                           <h3 className="text-xl font-semibold">{formatCurrency(4000)}</h3>
                        </div>
                        <Separator orientation="vertical" />
                     </div>
                     <div className="col-span-2 flex gap-3">
                        <div>
                           <p>- Disconto</p>
                           <h3 className="text-xl font-semibold">{formatCurrency(3000)}</h3>
                        </div>
                        <Separator orientation="vertical" />
                     </div>
                  </div>
                  <h2 className="text-4xl font-bold mt-2">Total {formatCurrency(45000)}</h2>
               </div>
               <Separator />
            </div>
            <div className="col-span-8">
               {/* <Separator orientation="vertical" /> */}
               <InvoiceTable />
            </div>
         </div>
         <Separator />
         <div>
            <h2>Documentos</h2>
            <div className="flex gap-2">
               <div className="border rounded-2xl"></div>
            </div>
         </div>
      </section>
   )
}
