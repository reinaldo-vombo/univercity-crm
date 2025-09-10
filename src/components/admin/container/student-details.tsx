import Avatar from "@/components/shared/avatar";
import Card from "@/components/shared/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/helper";
import { TStudent } from "@/types/global";
import { BriefcaseBusinessIcon, CheckCheck, EqualNot, Mail, Phone, Sunrise } from "lucide-react";

type TProps = {
   data: TStudent
}

const StudentDetails = ({ data }: TProps) => {
   const { firstName, middleName, lastName, contactNo, email, gender, profileImage, shift, isActive, studentType, studentId, yearLevel, isWoker, createdAt } = data;
   const fullName = `${firstName} ${middleName} ${lastName}`;
   return (
      <div >
         <Card>
            <div className="grid grid-cols-12 gap-3">
               <div className="col-span-6 space-y-3 bg-slate-300 rounded-md">
                  <Avatar name={fullName} photo={profileImage || ''} />
                  <p>{studentId}</p>
                  <div>
                     <h2 className="font-bold text-2xl">{fullName}</h2>
                     <Badge className={`${isActive ? 'bg-green-300' : 'bg-red-300'} text-green-500`}>
                        <CheckCheck /> {isActive ? 'Activo' : 'Inativo'}
                     </Badge>
                  </div>
                  <span>{studentType}</span>
                  <span>{yearLevel}</span>
               </div>
               <div className="col-span-6">
                  <ul>
                     <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <EqualNot />
                           <span>Genero</span>
                        </div>
                        <b>{gender}</b>
                     </li>
                     <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <Mail />
                           <span>Email</span>
                        </div>
                        <b>{email}</b>
                     </li>
                     <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <Phone />
                           <span>Telefone</span>
                        </div>
                        <b>{contactNo}</b>
                     </li>
                     <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <BriefcaseBusinessIcon />
                           <span>Trabalhador</span>
                        </div>
                        <b>{isWoker ? 'Sim' : 'Náo'}</b>
                     </li>
                     <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <Sunrise />
                           <span>Turno</span>
                        </div>
                        <b>{shift === 'MORNING' ? 'Mãnham' : 'Noite'}</b>
                     </li>
                  </ul>
               </div>
            </div>
         </Card>
         <div className="grid grid-cols-12">
            <div className="col-span-3 border rounded-l-md p-3 space-y-3">
               <p className="text-slate-300">Ano de Registo</p>
               <b>{createdAt.getFullYear()}</b>
            </div>
            <div className="col-span-3 border p-3">
               <p className="text-slate-300">Total de Pagamento</p>
               <b>$ {formatCurrency(100000)}</b>
            </div>
            <div className="col-span-3 border p-3">
               <p className="text-slate-300">Pendentes</p>
               <b>$ {formatCurrency(100000)}</b>
            </div>
            <div className="col-span-3 border rounded-r-md p-3">
               <p className="text-slate-300">Creditos</p>
               <b>$ {formatCurrency(10000)}</b>
            </div>
         </div>

         {/**table here */}
      </div>
   )
}

export default StudentDetails;
