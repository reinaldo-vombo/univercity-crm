import Avatar from "@/components/shared/avatar";
import Ping from "@/components/shared/ping";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/helper";
import { TStudent } from "@/types/global"; type TProps = {
   data: TStudent
}

const StudentDetails = ({ data }: TProps) => {
   const { firstName, middleName, lastName, contactNo, email, gender, profileImage, isActive, studentType, studentId, yearLevel, isWorker, createdAt } = data;
   const fullName = `${firstName} ${middleName} ${lastName}`;
   return (
      <div className="space-y-4">
         <div className="space-y-3 grid place-content-center place-items-center">
            <Avatar name={fullName} className="size-24" photo={profileImage || ''} />
            <h2 className="font-bold text-2xl">{fullName}</h2>
            <div className="flex items-center gap-4">
               <div className={`${isActive ? 'text-green-500' : 'text-amber-500'} flex items-center gap-2`}>
                  <b>{isActive ? 'Activo' : 'Inactivo'}</b>
                  <Ping />
               </div>
               <p>#{studentId}</p>
            </div>
         </div>
         <div className="col-span-6">
            <ul className="space-y-5">
               <li className="flex items-center gap-3">
                  <span className="text-neutral-500">Tipo de estudante:</span>
                  <b>{studentType}</b>
               </li>
               <li className="flex items-center gap-3">
                  <span className="text-neutral-500">Ano curricular:</span>
                  <b>{yearLevel}</b>
               </li>
               <li className="flex items-center gap-3">
                  <span className="text-neutral-500">Genero:</span>
                  <b>{gender}</b>
               </li>
               <li className="flex items-center gap-3">
                  <span className="text-neutral-500">Email</span>
                  <b>{email}</b>
               </li>
               <li className="flex items-center gap-3">
                  <span className="text-neutral-500">Telefone</span>
                  <b>{contactNo}</b>
               </li>
               <li className="flex items-center gap-3">
                  <span className="text-neutral-500">Trabalhador</span>
                  <b>{isWorker ? 'Sim' : 'Não'}</b>
               </li>
            </ul>
         </div>
         <Separator />
         <p className="text-center">Data de cadastro {formatDate(createdAt)}</p>
      </div>
   )
}

export default StudentDetails;
