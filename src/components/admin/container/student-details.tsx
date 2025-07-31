import Avatar from "@/components/shared/avatar";
import { Separator } from "@/components/ui/separator";
import { TStudent } from "@/types/global";
import Image from "next/image";

type TProps = {
   data: TStudent
}

const StudentDetails = ({ data }: TProps) => {
   const { firstName, middleName, lastName, contactNo, email, gender, profileImage, shift, isActive, studentType, studentId, yearLevel, isWoker, biFile, gradeDeclarationFile } = data;
   const name = `${firstName} ${middleName} ${lastName}`;
   return (
      <div>
         <div className="flex flex-col items-center justify-center gap-3">
            <Avatar name={name} photo={profileImage || ''} />
            <h2>{firstName} {middleName} {lastName}</h2>
            <Separator />
         </div>
         <div className="space-y-4">
            <span>Informações:</span>
            <ul className="flex items-center justify-between">
               <li>Número de estudante: <b>#{studentId}</b></li>
               <li>Status: <b>{isActive ? 'Activo' : 'Não activo'}</b></li>
               <li>Nivel de graduação: <b>{yearLevel}</b></li>
               <li>tipo de aluno: <b>{studentType}</b></li>
            </ul>
            <Separator />
            <ul className="flex items-center justify-between">
               <li>Email: <b>{email}</b></li>
               <li>Telefone: (+244)<b>{contactNo}</b></li>
            </ul>
            <Separator />
            <ul className="flex items-center justify-between">
               <li>Género: <b>{gender}</b></li>
               <li>turno: <b>{shift}</b></li>
               <li>Trabalhador: <b>{isWoker ? 'Sim' : 'Não'}</b></li>
            </ul>
         </div>
         <div>
            <span>Documentos</span>
            <div>
               <Image
                  src={biFile}
                  width={400}
                  height={400}
                  alt="Bilhete de indetificação"
               />
            </div>
            <div>
               <Image
                  src={gradeDeclarationFile}
                  width={400}
                  height={400}
                  alt="Declaração de notas"
               />
            </div>
         </div>
      </div>
   )
}

export default StudentDetails;
